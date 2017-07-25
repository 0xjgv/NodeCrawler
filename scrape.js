const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request("https://www.reddit.com", (error, response, body) => {
  if (error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  const $ = cheerio.load(body);
  const results = [];
  $('div#siteTable > div.link').each(function(index) {
    const that = $(this); 
    const targets = [
      'p.title > a.title', 
      'div.score.unvoted', 
      'a.author'
    ];
    let [title, score, user] = targets.map(target => 
       that.find(target).text().trim()
    );
    console.log(`
    Title: ${title}
    Score: ${score}
    User: ${user}
    `);
    fs.appendFileSync(
      'reddit.txt', 
      title + '\n' + score + '\n' + user + '\n'  
    );
  });
});