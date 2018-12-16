require("dotenv").config();

var axios = require("axios");

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

switch (command) {

    case 'concert-this':
        let band = process.argv[3];
        findShow(band);
        break;

    case `spotify-this-song`:
        const song = process.argv[3];
        spotify.search({ type: 'track', query: song },
            function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("Artist: " + data.tracks.items.song.artists);
            })
        break;


    case `movie-this`:
        let movie = process.argv[3];
        findMovie(movie);
        break;


    case `do-what-it-says`:
        break;

}

function findShow(band) {
    var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {
        response.data.map(jsonData => {
            console.log(jsonData)
            var showData = [
                "Name: " + jsonData.data.venue.name,
                "Country: " + jsonData.data.venue.country,
                "City: " + jsonData.data.venue.city,
                "Date: " + jsonData.datetime
            ].join("\n\n");
            console.log(showData);
        })
    })
}


function findMovie(movie) {
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    axios.get(URL).then(function (response) {
        
        var jsonData = response.data;
        console.log(jsonData);

        var showData = [
            "Movie: " + jsonData.data.Title,
            "Year: " + jsonData.data.Year,
            "IMDB Rating: " + jsonData.data.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.data.city,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
        ].join("\n\n");
        console.log(showData);
    });
};

