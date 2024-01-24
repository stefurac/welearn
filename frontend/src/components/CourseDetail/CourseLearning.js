
import React from 'react';
import UnderlinedHeader from '../Common/UnderlinedHeader/UnderlinedHeader';

// Helper highlights component for course details page
const CourseHighlights = (props) => {
    return (
        <div>
            <UnderlinedHeader>
                You Will Learn
            </UnderlinedHeader>
            <br></br>
            {props.courseLearning}
        </div>
    );
};

export default CourseHighlights;

