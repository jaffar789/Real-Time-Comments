import React from 'react';

const Comment = ({ username, comment, timestamp }) => {
    return (
        <div className="comment">
            <h4>{username} <span className="timestamp">({timestamp})</span></h4>
            <p>{comment}</p>
        </div>
    );
};

export default Comment;
