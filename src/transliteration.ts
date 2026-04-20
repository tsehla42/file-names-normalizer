export type TransliterationDirection = 'forward' | 'reverse';

export interface TransliterateOptions {
  direction: TransliterationDirection;
}

export function transliterateForward(input: string): string {
  return input
    .replace(/зг/g, 'zgh')
    .replace(/Зг/g, 'Zgh')
    .replace(/ЗГ/g, 'ZGH')
    .replace(/щ/g, 'shch')
    .replace(/Щ/g, 'Shch')
    .replace(/(^|[-_\s])є/g, '$1ye')
    .replace(/є/g, 'ie')
    .replace(/(^|[-_\s])Є/g, '$1Ye')
    .replace(/Є/g, 'Ie')
    .replace(/(^|[-_\s])ї/g, '$1yi')
    .replace(/ї/g, 'i')
    .replace(/(^|[-_\s])Ї/g, '$1Yi')
    .replace(/Ї/g, 'I')
    .replace(/(^|[-_\s])й/g, '$1y')
    .replace(/й/g, 'i')
    .replace(/(^|[-_\s])Й/g, '$1Y')
    .replace(/Й/g, 'I')
    .replace(/(^|[-_\s])ю/g, '$1yu')
    .replace(/ю/g, 'iu')
    .replace(/(^|[-_\s])Ю/g, '$1Yu')
    .replace(/Ю/g, 'Iu')
    .replace(/(^|[-_\s])я/g, '$1ya')
    .replace(/я/g, 'ia')
    .replace(/(^|[-_\s])Я/g, '$1Ya')
    .replace(/Я/g, 'Ia')
    .replace(/а/g, 'a')
    .replace(/б/g, 'b')
    .replace(/в/g, 'v')
    .replace(/г/g, 'h')
    .replace(/ґ/g, 'g')
    .replace(/д/g, 'd')
    .replace(/е/g, 'e')
    .replace(/ж/g, 'zh')
    .replace(/з/g, 'z')
    .replace(/и/g, 'y')
    .replace(/і/g, 'i')
    .replace(/к/g, 'k')
    .replace(/л/g, 'l')
    .replace(/м/g, 'm')
    .replace(/н/g, 'n')
    .replace(/о/g, 'o')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/с/g, 's')
    .replace(/т/g, 't')
    .replace(/у/g, 'u')
    .replace(/ф/g, 'f')
    .replace(/х/g, 'kh')
    .replace(/ц/g, 'ts')
    .replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh')
    .replace(/ь/g, '')
    .replace(/Ь/g, '')
    .replace(/А/g, 'A')
    .replace(/Б/g, 'B')
    .replace(/В/g, 'V')
    .replace(/Г/g, 'H')
    .replace(/Ґ/g, 'G')
    .replace(/Д/g, 'D')
    .replace(/Е/g, 'E')
    .replace(/Ж/g, 'Zh')
    .replace(/З/g, 'Z')
    .replace(/И/g, 'Y')
    .replace(/І/g, 'I')
    .replace(/К/g, 'K')
    .replace(/Л/g, 'L')
    .replace(/М/g, 'M')
    .replace(/Н/g, 'N')
    .replace(/О/g, 'O')
    .replace(/П/g, 'P')
    .replace(/Р/g, 'R')
    .replace(/С/g, 'S')
    .replace(/Т/g, 'T')
    .replace(/У/g, 'U')
    .replace(/Ф/g, 'F')
    .replace(/Х/g, 'Kh')
    .replace(/Ц/g, 'Ts')
    .replace(/Ч/g, 'Ch')
    .replace(/Ш/g, 'Sh')
    .replace(/'/g, '')
    .replace(/\u2019/g, '');
}

const REVERSE_PATTERN = /shch|Shch|SHCH|zgh|Zgh|ZGH|zh|Zh|ZH|kh|Kh|KH|ts|Ts|TS|ch|Ch|CH|sh|Sh|SH|kyi|ya|Ya|YA|ye|Ye|YE|yi|Yi|YI|yu|Yu|YU|ii(?![aeiou])|ia|Ia|IA|ie|Ie|IE|iu|Iu|IU|[a-zA-Z]/g;

const REVERSE_MAP: Record<string, string> = {
  shch: 'щ', Shch: 'Щ', SHCH: 'Щ',
  zgh: 'зг', Zgh: 'Зг', ZGH: 'ЗГ',
  zh: 'ж', Zh: 'Ж', ZH: 'Ж',
  kh: 'х', Kh: 'Х', KH: 'Х',
  ts: 'ц', Ts: 'Ц', TS: 'Ц',
  ch: 'ч', Ch: 'Ч', CH: 'Ч',
  sh: 'ш', Sh: 'Ш', SH: 'Ш',
  // Special case: -kyi (from -ський → -skyi forward) partially restores ь before к.
  // Round-trip is lossy: final й is irrecoverable since ь→"" and й→i in forward.
  kyi: 'ьки',
  ya: 'я', Ya: 'Я', YA: 'Я',
  ye: 'є', Ye: 'Є', YE: 'Є',
  yi: 'ї', Yi: 'Ї', YI: 'Ї',
  yu: 'ю', Yu: 'Ю', YU: 'Ю',
  ii: 'ій',
  ia: 'я', Ia: 'Я', IA: 'Я',
  ie: 'є', Ie: 'Є', IE: 'Є',
  iu: 'ю', Iu: 'Ю', IU: 'Ю',
  a: 'а', A: 'А',
  b: 'б', B: 'Б',
  v: 'в', V: 'В',
  h: 'г', H: 'Г',
  g: 'ґ', G: 'Ґ',
  d: 'д', D: 'Д',
  e: 'е', E: 'Е',
  z: 'з', Z: 'З',
  y: 'и', Y: 'И',
  i: 'і', I: 'І',
  k: 'к', K: 'К',
  l: 'л', L: 'Л',
  m: 'м', M: 'М',
  n: 'н', N: 'Н',
  o: 'о', O: 'О',
  p: 'п', P: 'П',
  r: 'р', R: 'Р',
  s: 'с', S: 'С',
  t: 'т', T: 'Т',
  u: 'у', U: 'У',
  f: 'ф', F: 'Ф',
};

export function transliterateReverse(input: string): string {
  return input.replace(REVERSE_PATTERN, (match) => REVERSE_MAP[match] ?? match);
}

export function transliterate(input: string, options: TransliterateOptions): string {
  if (options.direction === 'forward') return transliterateForward(input);
  return transliterateReverse(input);
}
