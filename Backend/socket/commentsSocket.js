module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('newComment', (comment) => {
            const timestamp = new Date().toLocaleString(); 
            const commentWithTimestamp = { ...comment, timestamp }; 
            console.log('New comment received:', commentWithTimestamp);
            io.emit('newComment', commentWithTimestamp);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
