const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const favicon = require('serve-favicon')


app.use(favicon(__dirname + '/favicon.ico'));




app.get('/', function(request, response) {
    response.sendFile("/index.html", {"root": "."});
})

io.on('connection', function(socket) {
    const user = Date.now();

    // socket.broadcast.emit('message', 'User '+user+' connected');
    socket.on('message.sent', msg => {
        
        io.emit('message', `${user}: ${msg}`);
    })
    
    io.emit('message', 'User '+user+' connected');
    console.log('user connected', user)
}) 

http.listen(3000, function() {
    console.log('server started');
})