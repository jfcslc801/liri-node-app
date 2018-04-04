require("dotenv").config();
var keys = require("./keys.js")

// console.log(keys);

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');




var getMyTweets = function () {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'realdonaldtrump' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log("@realdonaldtrump: " + tweets[i].text);
                console.log(tweets[i].created_at);
                console.log(' ');
                
                

                //adds text to log.txt
                fs.appendFile('log.txt', + "@realdonaldtrump: " + tweets[i].text);
                fs.appendFile('log.txt', tweets[i].created_at);                
                fs.appendFile('log.txt', ' ');
                
            }
        }
    });
}


// -----------------------------------------------node-spotify-api 

var artistName = function (artist) {
    return artist.name;
}

var spotifySearch = function (songInput) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: songInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('Artist: ' + songs[i].artists.map(artistName));
            console.log('Song: ' + songs[i].name);
            console.log('Preview link: ' + songs[i].preview_url);
            console.log('Album: ' + songs[i].album.name);
            console.log('--------------------------------------------------------------------');


            //adds text to log.txt
            fs.appendFile('log.txt', songs[i].artists.map(artistName));
            fs.appendFile('log.txt', songs[i].name);
            fs.appendFile('log.txt', songs[i].preview_url);
            fs.appendFile('log.txt', songs[i].album.name);
            fs.appendFile('log.txt', "-----------------------");

        }
    });
}
//------------------------------------------------Request - Simplified

var getMovie = function (movieName) {
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        var jsonData = JSON.parse(body);

        console.log("Title: " + jsonData.Title);
        console.log("Release Year: " + jsonData.Year);
        console.log("IMdB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
        console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);


        fs.appendFile('log.txt', "Title: " + jsonData.Title);
        fs.appendFile('log.txt', "Release Year: " + jsonData.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + jsonData.imdbRating);
        fs.appendFile('log.txt', "Country: " + jsonData.Country);
        fs.appendFile('log.txt', "Language: " + jsonData.Language);
        fs.appendFile('log.txt', "Plot: " + jsonData.Plot);
        fs.appendFile('log.txt', "Actors: " + jsonData.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + jsonData.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + jsonData.tomatoURL);

    });

}

//---------------------------------------------------------------

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log(data);
        var dataArray = data.split(',');

        if (dataArray.length == 2) {
            pick(dataArray[0], dataArray[1]);
        } else if (dataArray.length == 1) {
            pick(dataArray[0])
        }
    });
}



var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            spotifySearch(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('liri does not know that');

    }
}

var runThis = function (argOne, ArgTwo) {
    pick(argOne, ArgTwo)
};

runThis(process.argv[2], process.argv[3]);
