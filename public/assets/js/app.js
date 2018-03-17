$(document).ready(function(){

    function createURL(searchString){

        var url = "";

        var string = searchString.split(" ")

        for(var i = 0; i < string.length; i++){

            url = url + string[i];

            if((i+1) !== string.length){
                url = url + "-";
            }

        }

        return url;
    }

    function searchGame(searchTerm) {

        var gameURL = createURL(searchTerm);

        $.ajax({
            method: "GET",
            url: "/api/" + gameURL
        }).then(function (res) {

            window.location = "/games/" + res.id;

        });

    }

    function searchFranchise(searchTerm){

        var franchiseURL = createURL(searchTerm);

        $.ajax({
            method: "GET",
            url: "/api/" + franchiseURL
        }).then(function(res){
            window.location = "/franchise/" + res.id
        });
    }

    function searchCharacter(searchTerm) {

        var characterURL = createURL(searchTerm);

        $.ajax({
            method: "GET",
            url: "/api/" + characterURL
        }).then(function (res) {
            window.location = "/character/" + res.id
        });
    }


    $("#index-submit").on("submit", function(event){
        
        event.preventDefault();

        var searchTerm = $("#index-input").val().trim();

        searchGame(searchTerm);

    });

})