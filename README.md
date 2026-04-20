# normalize-file-names (`nn`)

Normalize file names for shell and programmatic use. Cleans up separators,
strips special characters, and optionally transliterates Ukrainian ↔ Latin
(per [Cabinet of Ministers Resolution No. 55, 2010, Про впорядкування транслітерації українського алфавіту латиницею](https://zakon.rada.gov.ua/laws/show/55-2010-п#Text)).

## Install

```bash
npm install -g normalize-file-names
```

## Usage

```bash
nn [options] <file> [files...]
```

### Options

| Flag | Description |
|---|---|
| `-n, --dry-run` | Preview without renaming |
| `-t, --transliterate` | Ukrainian → Latin |
| `-T, --no-transliterate` | Disable transliteration (for aliases) |
| `-r, --reverse` | Latin → Ukrainian |
| `-l, --lowercase` | Force lowercase |
| `-u, --uppercase` | Force UPPERCASE |
| `-s, --sentence-case` | Capitalize Each Word |
| `--sep <char>` | Custom separator (default: `-`) |
| `-U, --underscore` | Use `_` as separator |

### Examples

```bash
# Basic cleanup: remove extra spaces, normalize separators
nn 'Документ №1.md'
# → Документ-1.md (renamed in-place)

# Transliterate to Latin
nn -t 'Нотатки  про_практику №2..txt'
# → Notatky-pro-praktyku-2.txt

# Transliterate + lowercase
nn -t -l 'ЗРАЗОК-нотатки №2..md'
# → zrazok-notatky-2.md

# Reverse transliteration (Latin → Ukrainian)
nn -r 'zrazok-notatky-2.md'
# → зразок-нотатки-2.md

# Use underscore as separator
nn -U 'Звіт_про_роботу №1.pdf'
# → Zvit_pro_robotu-1.pdf

# Dry-run preview without renaming
nn -n -t 'Лекція №1  (вступ).docx'
# Preview: Lekcija-1-vstup.docx

# Batch process multiple files
nn -t -l *.md *.txt
# Transliterate and lowercase all markdown and text files
```

## Programmatic API

```ts
import { normalize, transliterate } from 'normalize-file-names';

normalize('ТЕСТ лк №1..docx', { transliterate: true, lowercase: true });
// → 'test-lk-1.docx'

transliterate('Шевченко', { direction: 'forward' });
// → 'Shevchenko'

transliterate('Shevchenko', { direction: 'reverse' });
// → 'Шевченко'
```

## Subprocess usage

### Shell/Bash

```bash
# Single file with transliteration
result=$(nn -t -n 'Документ №1.md')
echo "$result"  # Dokument-1.md

# Batch rename with transliteration
for file in *.md; do
    nn -t -l "$file"
done

# Dry-run to preview changes
nn -n -t -l 'ЗРАЗОК-нотатки №2..md'
```

### JavaScript/Node.js

```javascript
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Basic usage
const { stdout } = await execAsync("nn -n -t 'Документ №1.md'");
console.log(stdout.trim());  // dokument-1.md

// With options
async function normalizeFile(filename, options = {}) {
    const args = [
        options.transliterate && '-t',
        options.lowercase && '-l',
        options.uppercase && '-u',
        options.dryRun && '-n',
        `'${filename}'`
    ].filter(Boolean).join(' ');
    
    const { stdout } = await execAsync(`nn ${args}`);
    return stdout.trim();
}

// Example: normalize multiple files
async function normalizeFiles(files) {
    const results = await Promise.all(
        files.map(file => 
            normalizeFile(file, { transliterate: true, lowercase: true })
        )
    );
    return results;
}

const normalized = await normalizeFiles([
    'Нотатки  про_практику №2..txt',
    'ЗРАЗОК-нотатки №2..md'
]);
console.log(normalized);
// ['notatky-pro-praktyku-2.txt', 'zrazok-notatky-2.md']
```

### Python

```python
import subprocess

# Single file
result = subprocess.run(
    ['nn', '-t', '-n', 'Документ №1.md'],
    capture_output=True, text=True
)
print(result.stdout.strip())  # dokument-1.md

# Batch processing
files = ['Нотатки №1.txt', 'ЗРАЗОК-нотатки №2..md']
for filename in files:
    subprocess.run(['nn', '-t', '-l', filename])
```

## Notes on reverse transliteration

Reverse (Latin → Ukrainian) is best-effort and uses greedy longest-match.
Ambiguous inputs (e.g. `ia` could be `і+а` or `я`) are resolved heuristically.

## License

GPL-3.0
