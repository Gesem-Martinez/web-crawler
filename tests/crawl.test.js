const { normalizeURL, getURLsFromHTML } = require("../src/crawl");

// Tests for normalizeURL()
test("normalizes hostname", () => {
  expect(normalizeURL("http://www.example.com/")).toBe("www.example.com");
});

test("normalize hostname and path", () => {
  expect(normalizeURL("http://www.example.com/path/")).toBe(
    "www.example.com/path",
  );
});

test("normalize hostname and path", () => {
  expect(normalizeURL("http://www.example.com/path/to/file/")).toBe(
    "www.example.com/path/to/file",
  );
});

test("normalize port", () => {
  expect(normalizeURL("http://www.example.com/path/to/file/")).toBe(
    "www.example.com/path/to/file",
  );
});

test("ignore port", () => {
  expect(normalizeURL("http://www.example.com:80/path/to/file/")).toBe(
    "www.example.com/path/to/file",
  );
});

// Tests for getURLsFromHTML()
const baseURL = 'https://example.com'

test("add absolute URL", () => {
  expect(
    getURLsFromHTML(
      '<a href="https://example.com/absolute/path/">Absolute</a>',
      baseURL,
    ),
  ).toStrictEqual(["https://example.com/absolute/path/"]);
});

test("convert relative URL to absolute", () => {
  expect(
    getURLsFromHTML(
      '<a href="/relative/path/">Relative</a>',
      baseURL,
    ),
  ).toStrictEqual(["https://example.com/relative/path/"]);
});

test("return array of URL strings", () => {
  expect(
    getURLsFromHTML(
      '<a href="http://external.com">External</a><a href="/internal/">Internal</a>',
      baseURL,
    ),
  ).toStrictEqual(["http://external.com/", "https://example.com/internal/"]);
});

test("should handle protocol-relative URLs", () => {
  expect(
    getURLsFromHTML(
      '<a href="//protocol-relative.com">Protocol Relative</a>',
      baseURL,
    ),
  ).toStrictEqual(["http://protocol-relative.com"]);
});

test("should ignore HTML string without URLs", () => {
  expect(
    getURLsFromHTML(
      '<div>Sample text</div>',
      baseURL,
    ),
  ).toStrictEqual([]);
});
