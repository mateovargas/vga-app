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


    $("#index-submit").on("submit", function(event){
        
        event.preventDefault();

        var searchTerm = $("#index-input").val().trim();
        var gameURL = createURL(searchTerm);

        $.ajax({
            method: "GET",
            url: "/api/" + gameURL
        }).then(function(res){

            window.location = "/" + res.id;
            
        });
    });
})