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

    //-----------------------------------------------------------------------------

    case `spotify-this-song`:
        let song = process.argv[3];
        findSong(song);
        break;

    //-----------------------------------------------------------------------------
    case `movie-this`:
        let movie = process.argv[3];
        findMovie(movie);
        break;

    //-----------------------------------------------------------------------------
    case `do-what-it-says`:

        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");
            var operator = dataArr[0];
            var parameter = dataArr[1];
            switch (operator) {
                case "spotify-this-song":
                    spotifyThis(parameter);
                    break;
                case "movie-this":
                    movieThis(parameter);
                    break;
            }
        });
        break;
}
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------

function findSong(song) {
    var URL = "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE" + song;
    spotify.request(URL).then(function (response) {

        var jsonData = response.data;

        var showData = [
            "Artist: " + jsonData.artist,
            "Song: " + jsonData.song,
            "Preview Link: " + jsonData.link,
            "Album: " + jsonData.album
        ].join("\n\n");
        console.log(showData);
    })
}

//-----------------------------------------------------------------------------

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

