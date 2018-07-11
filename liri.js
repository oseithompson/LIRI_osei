// Add the code required to import the keys.js file and store it in a variable.
require("dotenv").config();
var inquirer = require('inquirer');
var spotify = require("node-spotify-api");
var request = require("request");
var twitter = require("twitter")

var keys = require("./keys");
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

// Make it so liri.js can take in one of the following commands:
// * `spotify-this-song`
// console.log(process.argv[2]);

switch(process.argv[2]) {
    case "movie-this": 
        console.log(process.argv[2]);
        movieThis(process.argv[3]);
        // console.log("hello");
        break;

    case "spotify-this-song":
        console.log(process.argv[2]);
        spotifyThis(process.argv[3]);
        break;

    case "my-tweets":
        console.log(process.argv[1]);
        twitterThis(process.argv[2]);
        break;
    }

function movieThis(movie) {

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        // Then run a request to the OMDB API with the movie specified
        request(queryURL, function(error, response, body) {
            console.log(error);
            // console.log(response);
            // console.log(body);
        // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(body));
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

        var movieObj = JSON.parse(body);

        console.log("---------  Movie Information  ---------\n");
        console.log("Movie Title: " + movieObj.Title);
        console.log("Release Date: " + movieObj.Year);
        console.log("Roten Tomatoes Rating: " + movieObj.Ratings[1].Value);
        console.log("This movie was filmed in " + movieObj.Country);
        console.log("Actors: "+ movieObj.Actors);
        console.log("Language: "+ movieObj.Language);
        console.log("Movie Plot: " + movieObj.Plot);

        console.log("\n--------------------------------------");
        }
    });
}

function spotifyThis(song) {

     spotify.search({ type: 'track', query: song, limit: 1 })

        .then(function(response) {
            console.log("\nThe Artist is: " + response.tracks.items[0].album.artists[0].name);
            console.log("\nThe Name of the Song is: " + response.tracks.items[0].name);
            console.log("\nPreview link on Spotify: " + response.tracks.items[0].external_urls.spotify);
            console.log("\nThe Album is called: " + response.tracks.items[0].album.name + "\n");
          })
          .catch(function(err) {
            console.log(err);
          });

        /*
        if (err) {
        return console.log('Error occurred: ' + err);
        }
        console.log(data); 

        var songObj = JSON.parse(data);

        console.log(songObj.track);
    });
       */
}

function twitterThis() {
    
        var params = {screen_name: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
        console.log(tweets);
        }
    });
}