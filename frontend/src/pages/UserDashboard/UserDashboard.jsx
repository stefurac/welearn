import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardDataAsync } from '../../store/actions'
import { getDashboardData, getUser } from '../../store/selectors'
import LabelledSection from '../../components/Common/LabelledSection/LabelledSection'
import { RecentCourses, MyCourses, Heatmap, DashboardStatistics, MyWishlist } from '../../components/UserDashboard'
import EmptyPlaceholder from '../../components/Common/EmptyPlaceholder/EmptyPlaceholder'
import Api from '../../api'
import axios from 'axios';

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

//User dashboard page
export const UserDashboard = props => {
    const dispatch = useDispatch()
    const { allCourses, recentCourses, wishlistCourses } = useSelector(getDashboardData)
    const [activity, setActivity] = useState([])
    const [dashboardStatistics, setDashboardStatistics] = useState({})
    const [dbUser, setDbUser] = useState({})

    // Dispatch actions to load page
    useEffect(() => {
        dispatch(fetchDashboardDataAsync())
        Api.User.getSessionUser().then(user => setDbUser(user))
        Api.User.getActivity().then(activity => setActivity(activity))
        Api.User.getDashboardStatistics().then(statistics => setDashboardStatistics(statistics))
    }, [])

    // returns empty placeholders for dashboards
    const renderEmptyPlaceholder = () => (
        <FullGridSpanner>
            <EmptyPlaceholder
                maxHeight={'600px'}
                imageName={'empty'}
                imageTitle={'Nothing to see'}
                headerComponent={<span>Nothing to see!</span>}
                bodyComponent={<span>Once you start enrolling in courses<br />they will be displayed here</span>} />
        </FullGridSpanner>
    )

    // returns dashboard for user
    const renderDashboard = () => (
        <>
            <Row1Col1>
                <LabelledSection label={'Recent Courses'}>
                    <RecentCourses recentCourses={recentCourses} />
                </LabelledSection>
            </Row1Col1>

            <Row1Col2>
                <LabelledSection label={'Recent Activity'}>
                    <Heatmap activity={activity} />
                </LabelledSection>

                <LabelledSection label={'Statistics'} topPadding expandHeight filled>
                    <DashboardStatistics {...dashboardStatistics} />
                </LabelledSection>
            </Row1Col2>

            <Row2Col1>
                <LabelledSection label={'My Courses'} expandHeight scrollable>
                    <MyCourses allCourses={allCourses} />
                </LabelledSection>
            </Row2Col1>

            <Row2Col2>
                <LabelledSection label={'My Wishlist'} expandHeight scrollable>
                    <MyWishlist wishlistCourses={wishlistCourses} />
                </LabelledSection>
            </Row2Col2>
        </>
    )

    return (
        <GridContainer>
            {(dbUser?.boughtCourses?.length === 0 && dbUser?.wishlistedCourses?.length === 0)
                ? renderEmptyPlaceholder()
                : renderDashboard()}
        </GridContainer>
    );
};

export default UserDashboard;
