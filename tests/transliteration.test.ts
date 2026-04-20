import { describe, it, expect } from 'vitest';
import { transliterateForward, transliterateReverse } from '../src/transliteration.js';

describe('transliterateForward', () => {
  it('а → a, А → A', () => {
    expect(transliterateForward('а')).toBe('a');
    expect(transliterateForward('А')).toBe('A');
  });

  it('б → b, Б → B', () => {
    expect(transliterateForward('б')).toBe('b');
    expect(transliterateForward('Б')).toBe('B');
  });

  it('в → v, В → V', () => {
    expect(transliterateForward('в')).toBe('v');
    expect(transliterateForward('В')).toBe('V');
  });

  it('г → h, Г → H', () => {
    expect(transliterateForward('г')).toBe('h');
    expect(transliterateForward('Г')).toBe('H');
  });

  it('ґ → g, Ґ → G', () => {
    expect(transliterateForward('ґ')).toBe('g');
    expect(transliterateForward('Ґ')).toBe('G');
  });

  it('д → d, Д → D', () => {
    expect(transliterateForward('д')).toBe('d');
    expect(transliterateForward('Д')).toBe('D');
  });

  it('е → e, Е → E', () => {
    expect(transliterateForward('е')).toBe('e');
    expect(transliterateForward('Е')).toBe('E');
  });

  it('є word-initial → ye, mid-word → ie', () => {
    expect(transliterateForward('єна')).toBe('yena');
    expect(transliterateForward('гаєвич')).toBe('haievych');
  });

  it('Є word-initial → Ye, mid-word → Ie', () => {
    expect(transliterateForward('Єнакієве')).toBe('Yenakiieve');
    expect(transliterateForward('Гаєвич')).toBe('Haievych');
  });

  it('ж → zh, Ж → Zh', () => {
    expect(transliterateForward('ж')).toBe('zh');
    expect(transliterateForward('Ж')).toBe('Zh');
  });

  it('з → z, З → Z', () => {
    expect(transliterateForward('з')).toBe('z');
    expect(transliterateForward('З')).toBe('Z');
  });

  it('и → y, И → Y', () => {
    expect(transliterateForward('и')).toBe('y');
    expect(transliterateForward('И')).toBe('Y');
  });

  it('і → i, І → I', () => {
    expect(transliterateForward('і')).toBe('i');
    expect(transliterateForward('І')).toBe('I');
  });

  it('ї word-initial → yi, mid-word → i', () => {
    expect(transliterateForward('їжак')).toBe('yizhak');
    expect(transliterateForward('мар\'їне')).toBe('marine');
  });

  it('Ї word-initial → Yi, mid-word → I', () => {
    expect(transliterateForward('Їжакевич')).toBe('Yizhakevych');
  });

  it('й word-initial → y, mid-word → i', () => {
    expect(transliterateForward('йосип')).toBe('yosyp');
    expect(transliterateForward('олексій')).toBe('oleksii');
  });

  it('к → k, К → K', () => {
    expect(transliterateForward('к')).toBe('k');
    expect(transliterateForward('К')).toBe('K');
  });

  it('л → l, Л → L', () => {
    expect(transliterateForward('л')).toBe('l');
    expect(transliterateForward('Л')).toBe('L');
  });

  it('м → m, М → M', () => {
    expect(transliterateForward('м')).toBe('m');
    expect(transliterateForward('М')).toBe('M');
  });

  it('н → n, Н → N', () => {
    expect(transliterateForward('н')).toBe('n');
    expect(transliterateForward('Н')).toBe('N');
  });

  it('о → o, О → O', () => {
    expect(transliterateForward('о')).toBe('o');
    expect(transliterateForward('О')).toBe('O');
  });

  it('п → p, П → P', () => {
    expect(transliterateForward('п')).toBe('p');
    expect(transliterateForward('П')).toBe('P');
  });

  it('р → r, Р → R', () => {
    expect(transliterateForward('р')).toBe('r');
    expect(transliterateForward('Р')).toBe('R');
  });

  it('с → s, С → S', () => {
    expect(transliterateForward('с')).toBe('s');
    expect(transliterateForward('С')).toBe('S');
  });

  it('т → t, Т → T', () => {
    expect(transliterateForward('т')).toBe('t');
    expect(transliterateForward('Т')).toBe('T');
  });

  it('у → u, У → U', () => {
    expect(transliterateForward('у')).toBe('u');
    expect(transliterateForward('У')).toBe('U');
  });

  it('ф → f, Ф → F', () => {
    expect(transliterateForward('ф')).toBe('f');
    expect(transliterateForward('Ф')).toBe('F');
  });

  it('х → kh, Х → Kh', () => {
    expect(transliterateForward('х')).toBe('kh');
    expect(transliterateForward('Х')).toBe('Kh');
  });

  it('ц → ts, Ц → Ts', () => {
    expect(transliterateForward('ц')).toBe('ts');
    expect(transliterateForward('Ц')).toBe('Ts');
  });

  it('ч → ch, Ч → Ch', () => {
    expect(transliterateForward('ч')).toBe('ch');
    expect(transliterateForward('Ч')).toBe('Ch');
  });

  it('ш → sh, Ш → Sh', () => {
    expect(transliterateForward('ш')).toBe('sh');
    expect(transliterateForward('Ш')).toBe('Sh');
  });

  it('щ → shch (not sch), Щ → Shch', () => {
    expect(transliterateForward('щ')).toBe('shch');
    expect(transliterateForward('Щ')).toBe('Shch');
  });

  it('ь → empty string', () => {
    expect(transliterateForward('ь')).toBe('');
    expect(transliterateForward('Ь')).toBe('');
  });

  it('ю word-initial → yu, mid-word → iu', () => {
    expect(transliterateForward('юрій')).toBe('yurii');
    expect(transliterateForward('корюківка')).toBe('koriukivka');
  });

  it('я word-initial → ya, mid-word → ia', () => {
    expect(transliterateForward('яготин')).toBe('yahotyn');
    expect(transliterateForward('костянтин')).toBe('kostiantyn');
  });

  it("apostrophe → empty (soft sign rule)", () => {
    expect(transliterateForward("знам'янка")).toBe('znamianka');
  });

  it('зг → zgh (combinatorial exception)', () => {
    expect(transliterateForward('Згурський')).toBe('Zghurskyi');
  });

  it('word-initial after hyphen (Київ-Єнакієве)', () => {
    expect(transliterateForward('Київ-Єнакієве')).toBe('Kyiv-Yenakiieve');
  });

  it('word-initial after underscore', () => {
    expect(transliterateForward('київ_єна')).toBe('kyiv_yena');
  });

  it('full name example: Шевченко → Shevchenko', () => {
    expect(transliterateForward('Шевченко')).toBe('Shevchenko');
  });

  it('Феодосія → Feodosiia (not Feodosia)', () => {
    expect(transliterateForward('Феодосія')).toBe('Feodosiia');
  });

  it('passes through non-Ukrainian characters unchanged', () => {
    expect(transliterateForward('hello-world')).toBe('hello-world');
    expect(transliterateForward('123')).toBe('123');
  });
});

describe('transliterateReverse', () => {
  it('shch → щ before sh → ш (priority)', () => {
    expect(transliterateReverse('shcherbukhy')).toBe('щербухи');
  });

  it('zgh → зг (exception)', () => {
    expect(transliterateReverse('Zghurskyi')).toBe('Згурськи');
  });

  it('zh → ж', () => {
    expect(transliterateReverse('Zhytomyr')).toBe('Житомир');
  });

  it('kh → х', () => {
    expect(transliterateReverse('Kharkiv')).toBe('Харків');
  });

  it('ts → ц', () => {
    expect(transliterateReverse('Tserkva')).toBe('Церква');
  });

  it('ch → ч', () => {
    expect(transliterateReverse('Chernivtsi')).toBe('Чернівці');
  });

  it('sh → ш (when not shch)', () => {
    expect(transliterateReverse('Shostka')).toBe('Шостка');
  });

  it('ya → я', () => {
    expect(transliterateReverse('Yaroshenko')).toBe('Ярошенко');
  });

  it('ye → є', () => {
    expect(transliterateReverse('Yenakiieve')).toBe('Єнакієве');
  });

  it('yi → ї', () => {
    expect(transliterateReverse('yizhak')).toBe('їжак');
    expect(transliterateReverse('Yizhakevych')).toBe('Їжакевич');
  });

  it('yu → ю', () => {
    expect(transliterateReverse('Yurii')).toBe('Юрій');
  });

  it('ia → я', () => {
    expect(transliterateReverse('Kostiantyn')).toBe('Костянтин');
  });

  it('ie → є', () => {
    expect(transliterateReverse('Haievych')).toBe('Гаєвич');
  });

  it('iu → ю', () => {
    expect(transliterateReverse('Koriukivka')).toBe('Корюківка');
  });

  it('single letters: a→а, b→б, v→в, h→г, g→ґ, d→д, e→е', () => {
    expect(transliterateReverse('a')).toBe('а');
    expect(transliterateReverse('b')).toBe('б');
    expect(transliterateReverse('v')).toBe('в');
    expect(transliterateReverse('h')).toBe('г');
    expect(transliterateReverse('g')).toBe('ґ');
    expect(transliterateReverse('d')).toBe('д');
    expect(transliterateReverse('e')).toBe('е');
  });

  it('single letters: z→з, y→и, i→і, k→к, l→л, m→м, n→н', () => {
    expect(transliterateReverse('z')).toBe('з');
    expect(transliterateReverse('y')).toBe('и');
    expect(transliterateReverse('i')).toBe('і');
    expect(transliterateReverse('k')).toBe('к');
    expect(transliterateReverse('l')).toBe('л');
    expect(transliterateReverse('m')).toBe('м');
    expect(transliterateReverse('n')).toBe('н');
  });

  it('single letters: o→о, p→п, r→р, s→с, t→т, u→у, f→ф', () => {
    expect(transliterateReverse('o')).toBe('о');
    expect(transliterateReverse('p')).toBe('п');
    expect(transliterateReverse('r')).toBe('р');
    expect(transliterateReverse('s')).toBe('с');
    expect(transliterateReverse('t')).toBe('т');
    expect(transliterateReverse('u')).toBe('у');
    expect(transliterateReverse('f')).toBe('ф');
  });

  it('uppercase A→А, B→Б, V→В, H→Г, G→Ґ, D→Д, E→Е', () => {
    expect(transliterateReverse('A')).toBe('А');
    expect(transliterateReverse('B')).toBe('Б');
    expect(transliterateReverse('V')).toBe('В');
    expect(transliterateReverse('H')).toBe('Г');
    expect(transliterateReverse('G')).toBe('Ґ');
    expect(transliterateReverse('D')).toBe('Д');
    expect(transliterateReverse('E')).toBe('Е');
  });

  it('uppercase Z→З, Y→И, I→І, K→К, L→Л, M→М, N→Н', () => {
    expect(transliterateReverse('Z')).toBe('З');
    expect(transliterateReverse('Y')).toBe('И');
    expect(transliterateReverse('I')).toBe('І');
    expect(transliterateReverse('K')).toBe('К');
    expect(transliterateReverse('L')).toBe('Л');
    expect(transliterateReverse('M')).toBe('М');
    expect(transliterateReverse('N')).toBe('Н');
  });

  it('uppercase O→О, P→П, R→Р, S→С, T→Т, U→У, F→Ф', () => {
    expect(transliterateReverse('O')).toBe('О');
    expect(transliterateReverse('P')).toBe('П');
    expect(transliterateReverse('R')).toBe('Р');
    expect(transliterateReverse('S')).toBe('С');
    expect(transliterateReverse('T')).toBe('Т');
    expect(transliterateReverse('U')).toBe('У');
    expect(transliterateReverse('F')).toBe('Ф');
  });

  it('passes through non-Latin characters unchanged (hyphens, digits)', () => {
    expect(transliterateReverse('ФПНЕ-lk-5')).toBe('ФПНЕ-лк-5');
  });
});
