const normalizeURL = require('../src/crawl');

test('normalizes hostname', () => {
  expect(normalizeURL('http://www.example.com/')).toBe('www.example.com')
});

test('normalize hostname and path', () => {
  expect(normalizeURL('http://www.example.com/path/')).toBe('www.example.com/path')
});

test('normalize hostname and path', () => {
  expect(normalizeURL('http://www.example.com/path/to/file/')).toBe('www.example.com/path/to/file')
});

test('normalize port', () => {
  expect(normalizeURL('http://www.example.com/path/to/file/')).toBe('www.example.com/path/to/file')
});

test('ignore port', () => {
  expect(normalizeURL('http://www.example.com:80/path/to/file/')).toBe('www.example.com/path/to/file')
});
