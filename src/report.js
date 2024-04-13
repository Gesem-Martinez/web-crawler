function printReport(pages){
  const keys = Object.keys(pages);
  console.log("Starting results report...");
  const sortedCounts = sortPages(pages);

  for(let count of sortedCounts){
    console.log(`Found ${count[1]} internal links to ${count[0]}`);
  }
}

function sortPages(pages){
  let countArr = [];
  for (let page in pages){
    countArr.push([page, pages[page]]);
  }

  countArr.sort((a, b) => a[1] - b[1]);
  return countArr;
}

module.exports = {
  printReport
}
