import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Common/Inputs/Button';

const HomeHeaderText = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 5rem;
    margin-bottom: 1rem;
    font-weight: 1000;
    line-height: 6rem;
    white-space: prewrap;
`
const MainText = styled.h3`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1.75rem;
    margin-top: 3%;
    margin-bottom: 10px;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0.1;
    justify-content: space-between;
    margin: 15px 0 0 13px;
`
const ButtonGroup = styled.div`
    display: flex;
`

const ButtonLink = styled(Link)`
    text-decoration: none
`
// Helper styling wrap of body for Home page
export const HomeBody = props => {
    return (
        <div>
            <HomeHeaderText>
                {props.title}
            </HomeHeaderText>

            <MainText>
                {props.subtitle}
            </MainText>
            <ButtonGroup>
                <ButtonLink to="/signup">
                    <ButtonWrapper>
                        <Button>
                            {"Sign Up"}
                        </Button>
                    </ButtonWrapper>
                </ButtonLink>
                <ButtonLink to="/login">
                    <ButtonWrapper>
                        <Button>
                            {"Login"}
                        </Button>
                    </ButtonWrapper>
                </ButtonLink>
            </ButtonGroup>
        </div>
    )
};


export default HomeBody;
