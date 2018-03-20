require("dotenv").config();
var keys = require("../keys.js");
var express = require('express');
var router = express.Router();
var igdb = require('igdb-api-node').default;
var igdbClient = igdb(keys.igdb.api_key);


function createSearchTerm(param){
    var termArray = param.split('-');

    var termString = "";
    for(var i = 0; i < termArray.length; i++){
        termString = termString + termArray[i] + " ";
    }

    return termString;
}


router.get("/", function(req, res){

    res.render('index');

});

router.get("/api/:game", function(req, res){

    console.log('getting Route');
    console.log(req.params.game);
    console.log(createSearchTerm(req.params.game));
    igdbClient.games({
        search: createSearchTerm(req.params.game),
        limit: 1
    },
        [
            'name',
            'rating',
            'summary',
            'storyline',
            'aggregated_rating'
        ]).then(function (result) {
            console.log(result);

            res.json(result.body[0]);
        });
});

router.get("/api/:franchise", function(req, res){

    igdbClient.franchise({
        search: createSearchTerm(req.params.franchise),
        limit: 1
    },
    [
        'name',
        'games'
    ]).then(function(result){
        console.log(result);
        res.json(result.body[0]);
    })
});

router.get("/api/:character", function(req, res){
    igdbClient.character({
        search: createSearchTerm(req.params.character),
        limit: 1
    },
    [
        'name',
        'akas',
        'species',
        'games'
    ]).then(function(result){
        res.json(result.body[0]);
    });
});

router.get("/api/:platform", function(req,res){
    igdbClient.platform({
        search: createSearchTerm(req.params.platform),
        limit: 5
    },
    [
        'name',
        'logo',
        'summary',
        'generation',
    ]).then(function(result){
        res.json(result.body);
    });
});

router.get("/api/:id", function(req, res){
    igdbClient.external_review_source({
        ids: [
            req.params.id
        ],
        limit: 10
        },
        [
            'url',
        ]).then(function(res){
            res.json(result.body);
        });
});

router.get("/games/:id", function(req, res){

    igdbClient.games({
        ids: [
            req.params.id
        ]},
        [
            'name',
            'rating',
            'summary',
            'storyline',
            'franchise',
            'rating',
            'rating_count',
            'aggregated_rating',
            'aggregated_rating_count',
            'total_rating',
            'total_rating_count',
            'developers',
            'game_engines',
            'time_to_beat',
            'platforms',
            'cover'
        ]).then(function (result) {
            console.log(result);

            var hbsObject = {
                game: result.body[0]
            };

            console.log(hbsObject);

            res.render("game", hbsObject);
        });

});


module.exports = router;