#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync, renameSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { normalize } from './normalizer.js';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
) as { version: string };

const program = new Command();

program
  .name('nn')
  .description('Normalize file names: clean separators, strip special chars, optionally transliterate Ukrainian ↔ Latin')
  .version(pkg.version, '-V, --version')
  .argument('<files...>', 'Files to normalize')
  .option('-n, --dry-run', 'Preview normalized names without renaming')
  .option('-t, --transliterate', 'Transliterate Ukrainian → Latin')
  .option('-T, --no-transliterate', 'Explicitly disable transliteration')
  .option('-r, --reverse', 'Reverse transliteration: Latin → Ukrainian')
  .option('-l, --lowercase', 'Force output to lowercase')
  .option('-u, --uppercase', 'Force output to UPPERCASE')
  .option('-s, --sentence-case', 'Capitalize first letter of each word')
  .option('--sep <char>', 'Custom word separator', '-')
  .option('-U, --underscore', 'Use underscore as separator (alias for --sep _)')
  .action((files: string[], opts) => {
    const separator = opts.underscore ? '_' : opts.sep;
    const normalizeOptions = {
      separator,
      transliterate: opts.transliterate === true,
      reverse: opts.reverse === true,
      lowercase: opts.lowercase === true,
      uppercase: opts.uppercase === true,
      sentenceCase: opts.sentenceCase === true,
    };

    let hasError = false;

    for (const file of files) {
      const absolutePath = resolve(file);

      if (!existsSync(absolutePath)) {
        process.stderr.write(`Error: File not found: ${file}\n`);
        hasError = true;
        continue;
      }

      const dir = dirname(absolutePath);
      const name = basename(absolutePath);
      const newName = normalize(name, normalizeOptions);

      if (newName === name) {
        process.stdout.write(`${name}\n`);
        continue;
      }

      const newPath = join(dir, newName);

      if (existsSync(newPath)) {
        process.stderr.write(`Error: Target already exists, skipping: ${newName}\n`);
        hasError = true;
        continue;
      }

      process.stdout.write(`${name} → ${newName}\n`);

      if (!opts.dryRun) {
        try {
          renameSync(absolutePath, newPath);
        } catch (err) {
          process.stderr.write(`Error: Could not rename ${name}: ${(err as Error).message}\n`);
          hasError = true;
        }
      }
    }

    if (hasError) process.exit(1);
  });

if (process.argv.length <= 2) {
  program.help();
}

program.parse();
