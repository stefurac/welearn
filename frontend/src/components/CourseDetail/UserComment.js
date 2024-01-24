
import React from 'react';

// Helper user comments component for course details page
const UserComment = (props) => {
    return (
        <div>
            <p><strong>{props.username}:</strong></p>
            <p>{props.comment}</p>
        </div>
    );
};

export default UserComment;