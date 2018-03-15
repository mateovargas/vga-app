var express = require('express');
var router = express.Router();
var cryptoRandomString = require('crypto-random-string');
var igdb = require('igdb-api-node').default;
var igdbClient = igdb('7253b0c0598ee124ad0824a44f9c7d08');
var sequelize = require('sequelize');
var Op = sequelize.Op;


function createSearchTerm(param){
    var termArray = param.split('-');

    var termString = "";
    for(var i = 0; i < termArray.length; i++){
        termString = termString + " " + termArray[i];
    }

    return termString;
}


router.get("/", function(req, res){


});

router.get("/:game", function(req, res){

    console.log(req.params.game);


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

            var hbsObject = {
                game: result.body[0]
            };

            res.render("game", hbsObject);
        });
});

module.exports = router;