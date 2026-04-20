#!/usr/bin/env node
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXAMPLES_DIR = join(__dirname, '..', 'examples');

mkdirSync(EXAMPLES_DIR, { recursive: true });

// Clear existing files
for (const f of readdirSync(EXAMPLES_DIR)) {
  rmSync(join(EXAMPLES_DIR, f));
}

const files: string[] = [
  'Лекція №1  (вступ).docx',
  'ЗРАЗОК  - Лекція №2..docx',
  'Презентація №1 (слайди).pptx',
  'ЗРАЗОК_ПРЕЗЕНТАЦІЯ №2..pptx',
  'Звіт_про_роботу №1.pdf',
  'ЗВІТ №2..pdf',
  'Таблиця даних №1.xlsx',
  'Зразок_таблиці (2025).xlsx',
  'нотатки №1.txt',
  'Нотатки  про_практику №2..txt',
  'Трек №1 (оригінал).mp3',
  'зразок-аудіо №2..mp3',
  'Відео №1 (запис).mp4',
  'ВІДЕО УРОК №2..mp4',
  'Документ №1.md',
  'ЗРАЗОК-нотатки №2..md',
  'скрипт №1 (setup).sh',
  'Зразок_скрипту №2..sh',
];

for (const f of files) {
  writeFileSync(join(EXAMPLES_DIR, f), '');
}

const dir = EXAMPLES_DIR.replace(process.env['HOME'] ?? '', '~');
console.log(`Created ${files.length} sample files in ${dir}`);
for (const f of files) console.log(`  ${f}`);
