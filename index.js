const puppeteer = require("puppeteer-extra");
const fs = require("fs/promises");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log("Running tests..");
  const page = await browser.newPage();
  await page.goto("https://football.shanefarmer.co.uk/");

  //   await page.type("#text-input-what", "Junior Software Developer");
  //   await page.type("#text-input-where", "Warrington, Cheshire");

  //   await Promise.all([
  //     page.click("#jobsearch > div > div.css-169igj0.eu4oa1w0 > button"),
  //     page.click("#onetrust-reject-all-handler"),
  //     page.waitForNavigation(),
  //   ]);


  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#nameList > li")).map(
      (x) => x.textContent
    );
  });

  const reserveNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#reservesList > li")).map(
      (x) => x.textContent
    );
  });

  await fs.writeFile("newjobs.txt", names.join("\r\n") + '\r\n\rRESERVES\r' + reserveNames.join('\r\n'));

  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
});
