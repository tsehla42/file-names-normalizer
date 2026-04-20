---
name: normalize-file-names project agent
description: >-
  Specialized agent mode for normalize-file-names development.
  Enforces TDD discipline, clean commits, comprehensive testing,
  and documentation of Ukrainian transliteration features.
---

# Agent Customizations for normalize-file-names

## Project Overview

**normalize-file-names** (`nn`) is a TypeScript CLI + library for normalizing file names with optional Ukrainian↔Latin transliteration per Cabinet of Ministers Resolution No. 55 (2010).

- **Architecture**: Modular src/ → dist/, ESM (NodeNext), full type safety
- **Core modules**: `transliteration.ts` (forward/reverse), `normalizer.ts` (pipeline), `cli.ts` (commander.js), `index.ts` (API)
- **Tests**: 93 total (63 transliteration + 30 normalizer), ~100% coverage, TDD-first approach
- **Environments**: Node 18+, works via npm (programmatic), CLI (shell), subprocesses (Python/shell/Node)

---

## Testing & Development Discipline

### Rule: TDD for all changes

When implementing features or fixes:
1. **Write tests first** — specify behavior in vitest before code
2. **Run `npm test`** — verify all 93 tests pass after changes
3. **Check build** — run `npm run build` to ensure clean TypeScript (strict mode)
4. **Example file check** — run `npm run demo` to verify CLI on realistic Ukrainian names

### Why

- 93 tests catch regressions immediately
- Strict TypeScript prevents silent bugs
- Demo validates end-to-end UX with messy real-world filenames

### Allowed refactorings without new tests

- Renaming internal variables/functions (with vscode rename)
- Reorganizing code structure (if tests still pass)
- Documentation-only changes

---

## Git & Commit Discipline

### Rule: Clean, semantic commits

- Each commit should make one logical change (one feature, one fix, one doc update)
- **Commit message format:**
  ```
  type: description (lower case, no period)
  
  Optional detailed explanation.
  ```
  Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`
- **Before pushing**: verify `npm test` + `npm run build` both succeed
- **After merging**: run `npm run demo` to smoke-test the merged state

### History preservation

- The project was squashed to a single clean root commit `eb70919` to remove all interim changes
- Going forward, keep history linear and clean; avoid merge commits where possible

---

## Documentation & Examples

### Rule: No PII in examples

- ❌ Do NOT use real university file names, student IDs, personal acronyms (e.g., ФПНЕ)
- ✅ DO use generic Ukrainian words: `Лекція`, `Таблиця`, `Документ`, `Тест` (generic nouns)
- Reason: Examples are public; protect privacy

### Test data

- Use `ТЕСТ`/`TEST` (generic "test") instead of ФПНЕ/FNPE
- Use `Шевченко` (famous author) for transliteration examples
- Provide diverse file types in examples: docx, pptx, pdf, xlsx, txt, mp3, mp4, md, sh (2 of each)

### Generate examples

- Run `npm run fill-examples` to (re)create example files
- These are empty placeholders for CLI testing
- Examples folder is ephemeral; safe to delete/regenerate

---

## Transliteration & Internationalization

### Rule: Law-compliant Ukrainian transliteration

All transliteration changes **must** comply with **Cabinet of Ministers of Ukraine Resolution No. 55 (2010), amended 2016**:

- Forward mapping (Ukrainian→Latin): fixed, complete alphabet per law
- Reverse mapping (Latin→Ukrainian): greedy longest-match heuristic
- Special rules:
  - `зг` → `zgh` (before `г` → `gh` mapping)
  - `щ` → `shch` (not `sch`)
  - Word-initial detection: `(^|[-_\s])`
  - `-ський` suffix heuristic: greedy `kyi` → `ьки`
  - `ii` lookahead for `→ій` ending

### Testing transliteration

- 63 tests cover every letter, word-initial rules, edge cases, reverse priority, round-trips
- If adding new Cyrillic support: write tests first, verify against the law, add comments explaining the rule

---

## Code Style & TypeScript

### Rule: Strict mode only

- `"strict": true` in tsconfig.json — no escaping type safety
- No `any` types unless absolutely unavoidable; justify with comment
- Use type exports: `export type NormalizeOptions = { ... }`

### Code organization

- **src/transliteration.ts**: Pure functions, no side effects; `transliterateForward`, `transliterateReverse`, `transliterate` dispatcher
- **src/normalizer.ts**: 6-step pipeline in `normalizeBasename`, extension handling in `normalize`
- **src/cli.ts**: commander.js setup, file I/O, argument parsing
- **src/index.ts**: Public API re-exports only
- **tests/\*.test.ts**: Unit tests with descriptive names

### Imports

- ESM (`import ... from '...'`), always include `.js` extension in relative imports
- Node modules: use `node:fs`, `node:path`, `node:url` prefixes
- Types: `import type { X } from '...'`

---

## Scripts & Package Management

### Available npm scripts

```bash
npm run build        # Compile src/ → dist/ (TypeScript check)
npm run dev         # Watch mode for development
npm test            # Run all vitest suites
npm test:watch      # Watch mode for tests
npm run fill-examples  # (Re)generate example files
npm run demo        # Build + fill examples + dry-run CLI on them
```

### Dependencies

- **runtime**: `commander@^14` (CLI parsing)
- **dev**: `@types/node`, `typescript`, `vitest`, `tsx` (for running .ts scripts)

---

## CLI Behavior

### Default behavior

- If **no arguments**, show help (`--help`) and exit 0
- If **file not found**, error to stderr, continue with next file, exit 1 at end if any failed
- If **file already normalized**, print name unchanged (no rename, no error)
- If **normalized name exists** (collision), error to stderr, skip, continue, exit 1 at end
- If **rename succeeds**, print `old → new` to stdout

### Flags

All flags are optional:

- `-n, --dry-run`: Preview only, do not rename
- `-t, --transliterate`: Enable UK→Latin transliteration
- `-T, --no-transliterate`: Explicitly disable (for aliases)
- `-r, --reverse`: Latin→Ukrainian transliteration
- `-l, --lowercase`: Force lowercase output
- `-u, --uppercase`: Force UPPERCASE
- `-s, --sentence-case`: Capitalize Each Word
- `--sep <char>`: Custom separator (default `-`)
- `-U, --underscore`: Use `_` as separator (alias for `--sep _`)
- `-V, --version`: Show version
- `-h, --help`: Show help

---

## Programmatic API

### Exports from `normalize-file-names`

```ts
import {
  normalize,
  normalizeBasename,
  type NormalizeOptions,
  transliterate,
  transliterateForward,
  transliterateReverse,
  type TransliterateOptions,
  type TransliterationDirection,
} from 'normalize-file-names';
```

- **No breaking changes** without major version bump
- **Type-stable**: TypeScript users should not need to update on minor/patch versions

---

## Release & Publishing

### Version bumping

- Patch (0.1.**X**): Bug fixes, test improvements, documentation
- Minor (0.**X**.0): New features (new transliteration, new normalization options), new CLI flags
- Major (**X**.0.0): Breaking changes (API signature changes, removed options)

### Before publishing to npm

1. Verify `npm test` passes (all 93 tests)
2. Verify `npm run build` succeeds (strict TypeScript)
3. Verify `npm run demo` shows expected output (smoke test)
4. Update CHANGELOG.md with changes
5. Update version in package.json
6. Tag: `git tag v0.1.x && git push origin v0.1.x`

---

## Common Agent Tasks & Patterns

### Adding a new transliteration rule

1. **Write test** in `tests/transliteration.test.ts` with the new rule
2. **Implement** forward + reverse mappings in `src/transliteration.ts`
3. **Add comment** citing the law or heuristic
4. **Run `npm test`** — verify new test + all 93 existing tests pass
5. **Commit**: `feat: add <rule> to transliteration`

### Adding a new CLI flag

1. **Write test** in `tests/normalizer.test.ts` (or update existing) for the new behavior
2. **Add option** to commander in `src/cli.ts`
3. **Update README.md** examples with the new flag
4. **Run `npm run demo`** to verify
5. **Commit**: `feat: add --<flag> CLI option`

### Fixing a bug

1. **Write test** that reproduces the bug (should fail)
2. **Fix code** to make test pass
3. **Verify** all 93 tests still pass
4. **Commit**: `fix: <description of bug>`

### Refactoring

1. **Identify** what's changing (e.g., moving logic, renaming)
2. **Verify** tests before refactoring (baseline should pass)
3. **Refactor** code without changing tests
4. **Verify** tests still pass
5. **Commit**: `refactor: <description>`

---

## Environment Compatibility

### Supported environments

- **Node.js**: 18+ (ESM support, native ES2022 modules)
- **Package managers**: npm, yarn, pnpm (all support ESM)
- **Shell**: bash, zsh, fish (via npm global install or `nn` alias)
- **Python**: via `subprocess.run(['nn', ...])` 
- **JavaScript/TypeScript**: `import { normalize } from 'normalize-file-names'`

### Script compatibility

- **fill-examples**: Written in TypeScript, runs via `tsx` (works on Node 18+)
- No bash-only scripts; all automation is portable

---

## Questions for Agent Customization

If working on this project, reference this file and ask:

1. **Is this change covered by tests?** (If not, write tests first)
2. **Does this follow the transliteration law?** (For any i18n changes)
3. **Are examples free of PII?** (Generic Ukrainian words only)
4. **Does `npm test && npm run build` pass?** (Non-negotiable)
5. **Is the commit message semantic?** (feat/fix/refactor/docs/chore/test)

---

## References

- **Law**: [Cabinet of Ministers of Ukraine Resolution No. 55](https://zakon.rada.gov.ua/laws/show/55-2010-п#Text)
- **Commander.js**: https://github.com/tj/commander.js
- **Vitest**: https://vitest.dev/
- **TypeScript Strict Mode**: https://www.typescriptlang.org/tsconfig#strict
