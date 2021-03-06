
var express = require("express");

// this creates a router as a module
var router = express.Router();

var request = require("request");

var cheerio = require("cheerio");

var db = require("../models");

console.log("articleController file loaded");

// Using Handlebars to render the main index.html
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
});


// route to scrape new articles
router.get("/scrape", function(req, res){
  request("https://www.nytimes.com/section/technology", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    let results = [];


    $("div.story-body").each(function(i, element) {

      let headline = $(element).find("h2").text();

      let summary = $(element).find("p").text();

      let url = $(element).find("a").attr("href");

      results.push({
        headline:headline,
        summary: summary,
        url: url
      });
      // console.log(results);
    });


    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results[0]);
    for(let i=0; i<results.length;i++){
    db.Article
    .create(
        results[i]
      )
    .then(function(db){
        res.json(db);
      }).catch(function(err){
        res.json(err);
      });
    }
  });
});

  // route to save articles
  router.post("/articles/:id", function(req, res){
    console.log("article POST route is working!!");
    console.log("req.body: ", req.body);
    db.Note
    .create(req.body)
    .then(function(dbNote){
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(db){
      console.log("added article ID", req.params.id);
      res.json(db);
    }).catch(function(err){
      res.json(err);
    });
  });

  // using handlebars to render savedarticle page
router.get("/savedArticles", function(req, res) {
  db.Article
  .find({})
  .populate("note")
  .then(function(db){
    console.log("populated data", db);
    res.render("savedArticles", {articles: db});
  })
  .catch(function(err){
    res.json(err);
  });
});

// remove article
router.delete("/article/:id", function(req, res){
  db.Note.remove({
    _id: req.params.id
  }).then(function(db){
    console.log("note was deleted");
    res.json(db);
  }).catch(function(err){
    res.json(err);
  });
});


module.exports = router;
