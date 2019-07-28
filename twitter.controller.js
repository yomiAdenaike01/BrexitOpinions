var keyStore = require("./keys"),
Twitter = require("twitter");

//Create stream and arary to control the speed of the stream
let twitterStream, tweetsArray = [];
module.exports = (app, io) => {
  //Init twitter lib
var client = new Twitter({
    consumer_key: keyStore.keys.CONSUMER_KEY,
    consumer_secret: keyStore.keys.CONSUMER_KEY_SECRET,
    access_token_key: keyStore.keys.ACCESS_TOKEN,
    access_token_secret: keyStore.keys.ACCESS_TOKEN_SECRET
  });

let mainSocket;
io.sockets.on("connection",(socket)=>{
    mainSocket = socket;
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
        console.log("Sending Streams");
        tweetsArray.push(tweets);
    });
    stream.on('end',res=>{
        io.sockets.emit("stream:destroy");
    })
    stream.on('error', function(error) {
        console.log(error);
    });
   
    twitterStream = stream;
});

//Handle request to close the stream
app.post("/pause",(req,res)=>{
    io.sockets.emit("stream:destroy");
});

app.post("/resume",(req,res)=>{
    io.sockets.emit("stream:resume");
 
})
/**
 * Send the tweets every second
 */
setInterval(()=>{
    if(tweetsArray.length != 0){
        var tweet = tweetsArray.shift();
        if(tweet){
            io.sockets.emit("stream",tweet);
        }
    }
  },1000)
}