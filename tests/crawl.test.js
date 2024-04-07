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

test("convert relative URL to absolute", () => {
  expect(
    getURLsFromHTML(
      '<a href="/relative/path/">Relative</a>',
      baseURL,
    ),
  ).toBe(["http://example.com/relative/path/"]);
});

test("return array of URL strings", () => {
  expect(
    getURLsFromHTML(
      '<a href="http://external.com">External</a><a href="/internal/">Internal</a>',
      baseURL,
    ),
  ).toBe(["http://external.com", "http://example.com/internal/"]);
});

test("should handle protocol-relative URLs", () => {
  expect(
    getURLsFromHTML(
      '<a href="//protocol-relative.com">Protocol Relative</a>',
      baseURL,
    ),
  ).toBe(["http://protocol-relative.com"]);
});

test("should ignore HTML string without URLs", () => {
  expect(
    getURLsFromHTML(
      '<div>Sample text</div>',
      baseURL,
    ),
  ).toBe([]);
});
