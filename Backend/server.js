const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const commentsRouter = require('./routes/comments');
const setupSocket = require('./socket/commentsSocket'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(express.json());

app.use('/api/comments', commentsRouter);

setupSocket(io); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
