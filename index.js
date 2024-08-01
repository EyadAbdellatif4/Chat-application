var express = require("express");
var app = express();
var http = require('http').Server(app); // Create an HTTP server
var io = require('socket.io')(http); // Attach socket.io to the HTTP server
var port = process.env.PORT || 3000;

// Set view of '/' end point
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

// Use our public/chat.js file as listener
app.use(express.static(__dirname + '/public'));

// Set port and start listening
http.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});

// Set up socket connection
io.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    socket.on('send', function (data) {
        io.emit('message', data);
    });
});
