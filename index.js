const express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    data = require("./semantic.json"),
    port = process.env.PORT || 8080
    io = require("socket.io").listen(server);
    require("./twitter.controller")(app,io);

app.use(express.static(__dirname+'/public'));

app.get("/",(req,res)=>{
  res.render("index");
});

server.listen(port,()=>{
    console.log("Listening on port "+port);
});

//Sending the text file
app.get("/text",(req,res)=>{
  res.send(JSON.stringify(data));
});
  
