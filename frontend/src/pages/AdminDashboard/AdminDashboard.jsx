import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import LabelledSection from '../../components/Common/LabelledSection/LabelledSection'
import { Heatmap } from '../../components/UserDashboard'
import { AllCourses, AllUsers, AllComments } from '../../components/AdminDashboard';
import EmptyPlaceholder from '../../components/Common/EmptyPlaceholder/EmptyPlaceholder'
import Api from '../../api'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/selectors'

// Setup a CSS grid
const GridContainer = styled.div`
    display: inline-grid;
    width: 100%;
    height: 100%;

    grid-template-columns: 66% 1fr;
    grid-template-rows: auto 1fr;
    column-gap: 24px;
    row-gap: 24px;

    justify-items: stretch;
    align-items: stretch;
`

// CSS grid items
const FullGridSpanner = styled.div`
    align-self: center;
    grid-row: 1 / span 2;
    grid-column: 1 / span 2; 
`
const Row1Col1 = styled.div`
    grid-row: 1 / span 1;
    grid-column: 1 / span 1; 
`
const Row1Col2 = styled.div`
    grid-row: 1 / span 1;
    grid-column: 2 / span 1; 

    display: flex;
    flex-direction: column;
`
const Row2Col1 = styled.div`
    grid-row: 2 / span 1;
    grid-column: 1 / span 1; 
`
const Row2Col2 = styled.div`
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
`

// Admin dashboard page
export const AdminDashboard = props => {
    const user = useSelector(getUser);
    const history = useHistory();

    // only admin users can see this page
    if (!user.isAdmin) {
        history.push('/404')
    }
    const [allUsers, setAllUsers] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [activity, setActivity] = useState([])

    useEffect(() => {
        // gets all courses, users, and comments
        Api.User.getAllUser().then(users => {
            setAllUsers(users)
        })
        Api.Course.getAllCourses({ publishedOnly: false }).then(courses => {
            setAllCourses(courses)
        })
        Api.User.getActivity().then(activity => setActivity(activity))
    }, [lastUpdate])

    // renders placeholder dashboard
    const renderEmptyPlaceholder = () => (
        <FullGridSpanner>
            <EmptyPlaceholder
                maxHeight={'600px'}
                imageName={'empty'}
                imageTitle={'Nothing to see'}
                headerComponent={<span>Nothing to see!</span>}
                bodyComponent={<span>The website is totally barren</span>} />
        </FullGridSpanner>
    )

    // renders functional dashboard
    const renderDashboard = () => (
        <>
            <Row1Col1>
                <LabelledSection label={'Recent Activity'}>
                    <Heatmap activity={activity} />
                </LabelledSection>

            </Row1Col1>

            <Row1Col2>

                <LabelledSection label={'All Comments'} expandHeight scrollable>
                    <AllComments allCourses={allCourses} setLastUpdate={setLastUpdate} />
                </LabelledSection>
            </Row1Col2>

            <Row2Col1>
                <LabelledSection label={'All Courses'} expandHeight scrollable>
                    <AllCourses allCourses={allCourses} setLastUpdate={setLastUpdate} />
                </LabelledSection>
            </Row2Col1>

            <Row2Col2>
                <LabelledSection label={'All Users'} scrollable>
                    <AllUsers users={allUsers} setLastUpdate={setLastUpdate} />
                </LabelledSection>
            </Row2Col2>
        </>
    )

    return (
        <GridContainer>
            {allCourses.length === 0 && allUsers.length === 0
                ? renderEmptyPlaceholder()
                : renderDashboard()}
        </GridContainer>
    );
};

export default AdminDashboard;
