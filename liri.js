var myKeys = ; //get from keys.js

var nodeArgs = process.argv;

if (nodeArgs[2] == 'my-tweets'){
//show last 20 tweets

} else if (nodeArgs[2] == 'spotify-this-song'){
//arg3 '<song name here>'
//show info - Artist, song name, preview link, album name
//if no song, default to 'the sign' by Ace of Base

} else if (nodeArgs[2] == 'movie-this'){
//arg3 '<movie name here>'
//Title, Year, IMDB Rating, Country of origin, Lang, Plot, Actors, Rotten%, Rotten URL
//if no movie, Mr Nobody

} else if (nodeArgs[2] == 'do-what-it-says'){
  //use fs node package, use text inside random.txt and use to call a LIRI command
  //command now is spotify-this-song

} else {
  console.log("No such command!");
  console.log("Try:");
  console.log(my-tweets);
  console.log(spotify-this-song);
  console.log(movie-this);
  console.log(do-what-it-says);
}
