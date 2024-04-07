const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function normalizeURL(url){
  result = "";
  parsedURL = new URL(url);
  
  if (parsedURL !== null) {
    result = parsedURL.host + parsedURL.pathname;
  }

  if (result[result.length - 1] === '/'){
    newStr = result.slice(0, result.length - 1);
    result = newStr;
  }


  return result;
}

function getURLsFromHTML(htmlStr, baseURL){
  const dom = new JSDOM(htmlStr);
  const arrURLs = dom.window.document.querySelectorAll('a');

}

module.exports = { 
  normalizeURL,
  getURLsFromHTML
};
