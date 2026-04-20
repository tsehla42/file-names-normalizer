import { describe, it, expect } from 'vitest';
import { normalize } from '../src/normalizer.js';

describe('normalize — separator cleaning', () => {
  it('replaces spaces with hyphens', () => {
    expect(normalize('foo bar.docx')).toBe('foo-bar.docx');
  });

  it('replaces underscores with hyphens', () => {
    expect(normalize('foo_bar.docx')).toBe('foo-bar.docx');
  });

  it('collapses multiple separators', () => {
    expect(normalize('foo---bar.docx')).toBe('foo-bar.docx');
  });

  it('collapses mixed separator runs', () => {
    expect(normalize('foo - bar.docx')).toBe('foo-bar.docx');
  });

  it('strips leading separator', () => {
    expect(normalize('-foo.docx')).toBe('foo.docx');
  });

  it('strips trailing separator', () => {
    expect(normalize('foo-.docx')).toBe('foo.docx');
  });

  it('custom separator: underscore', () => {
    expect(normalize('foo bar.docx', { separator: '_' })).toBe('foo_bar.docx');
  });
});

describe('normalize — special character stripping', () => {
  it('strips №', () => {
    expect(normalize('лк №1.docx')).toBe('лк-1.docx');
  });

  it('strips «»', () => {
    expect(normalize('«Матеріалознавство».docx')).toBe('Матеріалознавство.docx');
  });

  it('strips parentheses', () => {
    expect(normalize('foo (bar).docx')).toBe('foo-bar.docx');
  });

  it('strips exclamation marks', () => {
    expect(normalize('foo!bar.docx')).toBe('foobar.docx');
  });

  it('keeps dots inside basename', () => {
    expect(normalize('foo.bar.docx')).toBe('foo.bar.docx');
  });
});

describe('normalize — trailing/leading cleanup', () => {
  it('removes trailing dot before extension', () => {
    expect(normalize('ТЕСТ лк №1..docx')).toBe('ТЕСТ-лк-1.docx');
  });

  it('removes trailing space before extension', () => {
    expect(normalize('foo .docx')).toBe('foo.docx');
  });

  it('removes leading dots from basename', () => {
    expect(normalize('.foo.docx')).toBe('foo.docx');
  });
});

describe('normalize — extension handling', () => {
  it('preserves extension unchanged', () => {
    expect(normalize('foo bar.DOCX')).toBe('foo-bar.DOCX');
  });

  it('does not transliterate extension', () => {
    expect(normalize('ТЕСТ.docx', { transliterate: true })).toBe('TEST.docx');
  });

  it('file with no extension', () => {
    expect(normalize('ТЕСТ лк 1')).toBe('ТЕСТ-лк-1');
  });
});

describe('normalize — transliteration', () => {
  it('transliterates when option is true', () => {
    expect(normalize('ТЕСТ лк №1..docx', { transliterate: true })).toBe('TEST-lk-1.docx');
  });

  it('does not transliterate by default', () => {
    expect(normalize('ТЕСТ лк №1..docx')).toBe('ТЕСТ-лк-1.docx');
  });

  it('reverse transliterates when reverse is true', () => {
    expect(normalize('TEST-lk-5.docx', { reverse: true })).toBe('ТЕСТ-лк-5.docx');
  });
});

describe('normalize — case options', () => {
  it('lowercase option', () => {
    expect(normalize('FOO BAR.docx', { lowercase: true })).toBe('foo-bar.docx');
  });

  it('uppercase option', () => {
    expect(normalize('foo bar.docx', { uppercase: true })).toBe('FOO-BAR.docx');
  });

  it('sentenceCase option', () => {
    expect(normalize('foo bar baz.docx', { sentenceCase: true })).toBe('Foo-Bar-Baz.docx');
  });

  it('lowercase + transliterate', () => {
    expect(normalize('ТЕСТ лк №1..docx', { transliterate: true, lowercase: true })).toBe('test-lk-1.docx');
  });

  it('uppercase + transliterate', () => {
    expect(normalize('ТЕСТ лк №1..docx', { transliterate: true, uppercase: true })).toBe('TEST-LK-1.docx');
  });

  it('sentenceCase + transliterate', () => {
    expect(normalize('ТЕСТ лк №1..docx', { transliterate: true, sentenceCase: true })).toBe('Test-Lk-1.docx');
  });
});

describe('normalize — full examples from spec', () => {
  it('Висловлювання - комунікація.docx', () => {
    expect(normalize('Висловлювання - комунікація.docx')).toBe('Висловлювання-комунікація.docx');
  });

  it('long Ukrainian filename with underscores and brackets', () => {
    expect(normalize('Питання_для_підготовки_«Матеріалознавство.docx'))
      .toBe('Питання-для-підготовки-Матеріалознавство.docx');
  });

  it('underscore separator option', () => {
    expect(normalize('ТЕСТ лк №1..docx', { transliterate: true, separator: '_' })).toBe('TEST_lk_1.docx');
  });
});
