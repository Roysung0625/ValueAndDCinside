const { Builder, By } = require("selenium-webdriver");
const wordProcessing = require("./wordProcessing");

const dateRegex = /\d{2}:\d{2}/;

module.exports = {
  async scrapingKospiGall() {
    let page = 1;
    let breakReady = false;
    const driver = await new Builder().forBrowser("chrome").build();
  
    try {
      Searching: while (true) {
        const url = `https://gall.dcinside.com/mgallery/board/lists/?id=kospi&page=${page}`;
        driver.get(url);
        console.log(url);
        page++;
        const elementsList = await driver.findElements(
          By.className("ub-content us-post"),
        );
        //console.log(elementsList);
        for (const obj of elementsList) {
          // console.log(typeof obj);
          // console.log(obj);
          // const title = await obj.getText();
          // console.log(typeof title + title);
          const type = await obj
            .findElement(By.className("gall_subject"))
            .getText();
          console.log("type : " + type);
          if (type === "공지" | type === "베스트") {
            continue;
          }
          const title = await obj.findElement(By.className("gall_tit")).getText();
          const time = await obj.findElement(By.className("gall_date")).getText();
          const id = await obj.findElement(By.className("gall_num")).getText();
  
          if (!time.match(dateRegex)){
            console.log(breakReady);
            if (breakReady) {
              break Searching;
            } else {
              breakReady = true;
            }
          }else if(breakReady){
            breakReady = false;
          }

          const slicedTitle = title.split(" ");
          wordProcessing.wordCutting(id, slicedTitle);

          console.log(`id : ${id}\ntitle : ${title}\ntime: ${time}\n`);
        }
      }
    } catch (err) {
      console.log(err);
    } finally{
      driver.close();
    }
  }
};
