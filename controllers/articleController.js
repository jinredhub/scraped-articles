
var express = require("express");

// this creates a router as a module
var router = express.Router();

var request = require("request");

var cheerio = require("cheerio");

var db = require("../models");


// Use Handlebars to render the main index.html
router.get("/", function(req, res) {
  db.Article
  .find({})
  .then(function(db){
    console.log(db);
    res.render("index", {articles: db});
  })
  .catch(function(err){
    res.json(err);
  });

  // connection.query("SELECT * FROM plans;", function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }
  //   res.render("index", { plans: data });
  // });
});

// route to scrape new articles
router.get("/scrape", function(req, res){
  request("https://www.nytimes.com/section/technology", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    let results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("div.story-body").each(function(i, element) {

      // Save the text of the element in a "title" variable
      let headline = $(element).find("h2").text();

      let summary = $(element).find("p").text();

      let url = $(element).find("a").attr("href");

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      // var link = $(element).children().attr("href");
      // let url = $(element).children().attr("href");

      // // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        headline:headline,
        summary: summary,
        url: url
      });
      // console.log(results);
    });


    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  });

});

module.exports = router;
