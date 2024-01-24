
import React from 'react';
import UnderlinedHeader from '../Common/UnderlinedHeader/UnderlinedHeader';

// Helper description component for course details page
const CourseDescription = (props) => {
    return (
        <div>
            <UnderlinedHeader>
                Description
            </UnderlinedHeader>
            <p>{props.description}</p>
        </div>
    );
};

export default CourseDescription;