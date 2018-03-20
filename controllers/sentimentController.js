require("dotenv").config();
const keys = require("../keys.js");
require("dotenv").config();
const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const twitter = new Twitter(keys.twitter);

function createSearchTerm(param) {
    const termArray = param.split('-');

    let termString = "";
    for (var i = 0; i < termArray.length; i++) {
        termString = termString + termArray[i] + " ";
    }

    return termString;
}

app.get("/api/twitter/:game", function(req, res){
    twitter.get('search/tweets', {q: req.params.game}, function(error, tweets, response){
        console.log(tweets);
        res.json(tweets);
    });
});