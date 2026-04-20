import { transliterateForward, transliterateReverse } from './transliteration.js';

export interface NormalizeOptions {
  separator?: string;
  transliterate?: boolean;
  reverse?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  sentenceCase?: boolean;
}

function applyCase(text: string, sep: string, options: NormalizeOptions): string {
  if (options.lowercase) return text.toLowerCase();
  if (options.uppercase) return text.toUpperCase();
  if (options.sentenceCase) {
    return text
      .split(sep)
      .map((word) => word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word)
      .join(sep);
  }
  return text;
}

export function normalizeBasename(basename: string, options: NormalizeOptions): string {
  const sep = options.separator ?? '-';
  // Escape sep for use in regex if it's a special char
  const escapedSep = sep.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');

  let result = basename;

  // Step 1: Replace runs of [-_\s] with the target separator
  result = result.replace(/[-_\s]+/g, sep);

  // Step 2: Strip illegal characters (keep: letters (any script), digits, dots, separator)
  result = result.replace(new RegExp(`[^\\p{L}\\d.${escapedSep}]`, 'gu'), '');

  // Step 3: Collapse consecutive separators
  result = result.replace(new RegExp(`${escapedSep}+`, 'g'), sep);

  // Step 4: Strip leading/trailing separators and dots
  result = result.replace(new RegExp(`^[${escapedSep}.]+|[${escapedSep}.]+$`, 'g'), '');

  // Step 5: Transliterate
  if (options.transliterate) result = transliterateForward(result);
  else if (options.reverse) result = transliterateReverse(result);

  // Step 6: Apply case
  result = applyCase(result, sep, options);

  return result;
}

export function normalize(filename: string, options: NormalizeOptions = {}): string {
  const lastDot = filename.lastIndexOf('.');
  // No extension if no dot, or dot is the first character (hidden file with no ext)
  const hasExtension = lastDot > 0;

  const stem = hasExtension ? filename.slice(0, lastDot) : filename;
  const ext = hasExtension ? filename.slice(lastDot) : '';

  const normalizedStem = normalizeBasename(stem, options);
  return normalizedStem + ext;
}
