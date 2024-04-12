const { argv } = require("node:process");
const { crawlPage } = require("./src/crawl");


async function main(){

  if(argv.length < 5 || argv.length > 5){
    console.log("ERROR: Invalid number of args");
    return;
  } else if(argv.length == 5){
    const baseURL = String(argv[2]);
    const currURL = String(argv[3]);
    const pages = {};
    console.log(`Initiating crawler at ${baseURL}`);

    const result = await crawlPage(baseURL, currURL, pages);
    console.log("RESULTADO:");
    for(let key in result){
      console.log(`${key}: ${result[key]}`);
    }
  }

}

main();
