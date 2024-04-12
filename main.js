const { argv } = require("node:process");
const { crawlPage } = require("./src/crawl");


function main(){

  if(argv.length < 3 || argv.length > 3){
    console.log("ERROR: Invalid number of args");
    return;
  } else if(argv.length == 3){
    const baseURL = argv[2];
    console.log(`Initiating crawler at ${baseURL}`);
    crawlPage(baseURL);
  }

}

main();
