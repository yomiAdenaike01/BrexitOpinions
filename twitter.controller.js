var keyStore = require("./keys"),
Twitter = require("twitter");

module.exports = (app, io) => {
  //Init twitter lib
var client = new Twitter({
    consumer_key: keyStore.keys.CONSUMER_KEY,
    consumer_secret: keyStore.keys.CONSUMER_KEY_SECRET,
    access_token_key: keyStore.keys.ACCESS_TOKEN,
    access_token_secret: keyStore.keys.ACCESS_TOKEN_SECRET
  });


io.sockets.on("connection",(socket)=>{
    console.log("Connection Established!");
})

//Init disconnect
io.sockets.on("disconnect",(socket)=>{console.log("Hello")});
/**
 * Stream tweets with the brexit filter
 */
client.stream('statuses/filter', {track: 'brexit'},function(stream){
    //Display the tweets every second
    stream.on('data', function(tweets) {
        console.log("Sending stream");
        io.sockets.emit("stream",tweets)
    });
    stream.on('end',res=>{
        io.sockets.emit("stream:destroy");
    })
    stream.on('error', function(error) {
        console.log(error);
    });
   
    twitterStream = stream;
});

}