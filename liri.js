var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
var fs = require('fs');

var myKeys = require('./keys.js'); //get from keys.js

var nodeArgs = process.argv;

var appFunction = nodeArgs[2];

runLogic(appFunction);

function runLogic(appFunction){
	if (appFunction == 'my-tweets'){
	//show last 20 tweets & when they were created in terminal/bash window
		var client = new twitter({
		  consumer_key: myKeys.twitterKeys.consumer_key,
		  consumer_secret: myKeys.twitterKeys.consumer_secret,
		  access_token_key: myKeys.twitterKeys.access_token_key,
		  access_token_secret: myKeys.twitterKeys.access_token_secret,
		});

		client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
			if (tweets.statuses.length < 20){
				var long = tweets.statuses.length - 1;
			}

			for(var i=0; i<=long; i++){
				console.log("=======TWEET "+i+"=============");
				console.log("Posted: "+tweets.statuses[i].created_at);
				console.log(tweets.statuses[i].text);
				console.log("============================")
			}
		});

	} else if (appFunction == 'spotify-this-song'){

		if(!nodeArgs[3]){
			nodeArgs[3] = 'The Sign Ace of Base'
		}

		spotify.search({type:'track', query: nodeArgs[3]}, function(err, data){
			if (err) {
				console.log('Error occured: ' + err);
				return;
			} else {
				//console.log(data.tracks.items[0]);
				console.log("ARTIST: "+ data.tracks.items[0].artists[0].name);
				console.log("NAME: "+ data.tracks.items[0].name);
				console.log("Preview Link: "+ data.tracks.items[0].preview_url);
				console.log("ALBUM NAME: "+ data.tracks.items[0].album.name);
			}
		});

	} else if (appFunction == 'movie-this'){

		if(!nodeArgs[3]){
			nodeArgs[3] = 'Mr. Nobody'
		}

		request('http://www.omdbapi.com/?t='+nodeArgs[3], function(error, response, body){
			if(error){
				console.log('error:', error);
				console.log('statusCode:', response && response.statusCode);
			}
			var data = JSON.parse(body);
			//console.log(data);
			console.log(data.Title);
			console.log(data.Year);
			console.log(data.imdbRating);
			console.log(data.Country);
			console.log(data.Language);
			console.log(data.Plot);
			console.log(data.Actors);
			console.log(data.Ratings[1].Value);
			console.log(data.Website);
		})

	} else if (appFunction == 'do-what-it-says'){
	  //use fs node package, use text inside random.txt and use to call a LIRI command
	  //command now is spotify-this-song
	  fs.readFile("random.txt", "utf8", function(err, data){
	  	var dataArr = data.split(",");
	  	var arg = dataArr[0];
	  	nodeArgs[3] = dataArr[1];
	  	runLogic(arg);
	  });


	} else {
	  console.log("No such command!");
	  console.log("Try:");
	  console.log("my-tweets");
	  console.log("spotify-this-song");
	  console.log("movie-this");
	  console.log("do-what-it-says");
	}
}
/*XTRA CREDITS
-In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
-Make sure you append each command you run to the log.txt file.
-Do not overwrite your file each time you run a command. 
*/
