import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Comment from './Comment';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        console.log('CommentSection component mounted');

        socketRef.current = io('http://localhost:5000');

        socketRef.current.on('connect', () => {
            console.log('Connected to socket');
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from socket');
            setIsConnected(false);
        });

        socketRef.current.on('newComment', (comment) => {
            setComments((prevComments) => [...prevComments, comment]);
            console.log('New comment received:', comment);
        });

        return () => {
            console.log('CommentSection component unmounted');
            socketRef.current.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = { username, text: commentText };
        socketRef.current.emit('newComment', newComment);
        setCommentText('');
    };

    return (
        <div>
            <h2>Comments</h2>
            <p>{isConnected ? "Socket is connected" : "Socket is not connected"}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
                <button type="submit">Send Comment</button>
            </form>
            <div id="comments-container">
                {comments.map((comment, index) => (
                    <Comment key={index} username={comment.username} comment={comment.text} timestamp={comment.timestamp} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
