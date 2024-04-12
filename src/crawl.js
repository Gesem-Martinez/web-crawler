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
  const result = []
  const dom = new JSDOM(htmlStr);
  // Get the anchor elemnts
  const arrAnchors = dom.window.document.querySelectorAll('a');

  if (arrAnchors.length == 0) {
    return result;
  }

  // Extract the URLs from the anchors
  let arrRefs = []
  for(let i = 0; i < arrAnchors.length; i++){
    arrRefs.push(String(arrAnchors[i].href))
  }

  for(let i = 0; i < arrRefs.length; i++){
    let currRef = arrRefs[i];
    let refChars = currRef.split("");

    if(refChars[0] == "/" && refChars[1] == "/"){
      result.push(`http:${currRef}`);
    } else if(!currRef.includes(baseURL) && !currRef.includes("http://")){
      result.push(`${baseURL}${currRef}`);
    } else {
      result.push(currRef);
    }
  }
  return result;
}

async function crawlPage(pageRoot){
  try{

    let response = await fetch(pageRoot);

    if(response.status >= 400){
      console.log("Error fetching the page");
      return;
    }

    if(!response.headers.get("Content-Type").includes("text/html")){
      console.log(response.headers.get("Content-Type"));
      console.log("Error: Content type not text/html");
      return;
    }

    console.log("Exito");
    console.log(await response.text());

  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { 
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
