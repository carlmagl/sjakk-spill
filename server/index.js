const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { disconnect } = require("process");

const app = express();
app.use(router);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

io.on('connection', (socket) =>{
    console.log("We have a new connection");

    socket.on('move-made', (tiles) => {
        console.log(tiles)
        socket.emit('move-made', tiles);
        socket.broadcast.emit ('move-made', tiles);

    })

    socket.on('disconnect', () =>{
        console.log("User have left")
    })
})

server.listen(PORT, () => console.log(`Server has startet on port ${PORT}`));