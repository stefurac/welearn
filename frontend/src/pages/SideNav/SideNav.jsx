import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' 
import Logo from '../../components/Common/Logo/Logo'

// Wrapper for the screen, all components are children of this
const ScreenWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`

// Wrapper for the SideNav
const SideNavWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: ${({ theme }) => theme.constants.sideNav.width};
    height: 100%;
    padding: 32px 48px;

    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

// Wrapper for the main content of the page
const ContentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: ${({ theme }) => theme.constants.sideNav.width};

    width: calc(100% - ${({ theme }) => theme.constants.sideNav.width});
    height: 100%;
    padding: 32px 24px;

    background-color: ${({ theme }) => theme.palette.background};
`

// Groups together the main navigation buttons, keeping the logout button separate
const MainSideGroup = styled.div`
    flex-grow: 1;
`

// Styling wrap for side nav
export const SideNav = ({mainComponents, endComponent, ...props}) => {
    return (
        <ScreenWrapper>
            <SideNavWrapper>
                <Logo margin={'0 0 64px 0'}/>

                <MainSideGroup>
                    {mainComponents}
                </MainSideGroup>
                
                {endComponent}
            </SideNavWrapper>

            <ContentWrapper>
                {props.children}
            </ContentWrapper>
        </ScreenWrapper>
    );
};

SideNav.propTypes = {
    mainComponents: PropTypes.node.isRequired,
    endComponent: PropTypes.node.isRequired,
};

export default SideNav;
