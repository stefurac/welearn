import React, { useState, useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useSelector } from 'react-redux'
import { getUser } from '../../../store/selectors'
import { Portal } from '../../../utils'
import { useRouteMatch } from 'react-router-dom'
import { ReactComponent as CoinSVG } from '../../../assets/icons/coin.svg'

const Wrapper = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;

    display: flex;
    align-items: center;

    padding: 10px 16px;
    border-radius: 24px;
    color: ${({ theme }) => theme.palette.text.regular};
    background-color: ${({ theme }) => theme.palette.sideNavBackground};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 500;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
    transition: width 400ms ease;
`

const CoinSpinAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
`

const CoinIcon = styled(CoinSVG)`
    width: 2rem;
    height: 2rem;
    stroke: #e0ab2f;
    stroke-width: 2;
    margin-right: 8px;
    
    ${props => props.animate
        ? css`animation: ${CoinSpinAnimation} 1600ms forwards`
        : css`animation: none`};
`

// https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

// https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
const useHasChanged = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
}
// Styling wrap for hover points display
const PointsDisplay = props => {
    const { balance } = useSelector(getUser)
    const hasBalanceChanged = useHasChanged(balance)
    const [animate, setAnimate] = useState(false)

    // Hook cannot be called in a loop :(
    const isHome = useRouteMatch({
        path: '/home',
        exact: true,
    })
    const isCourseEdit = useRouteMatch({
        path: '/creator/course-edit/:id',
        exact: true,
    })
    const isCourseStudy = useRouteMatch({
        path: '/course/:id',
        exact: true,
    })

    // Animate changes in balance!
    useEffect(() => {
        if (hasBalanceChanged) {
            setAnimate(true)
            setTimeout(() => setAnimate(false), 1600)
        }
    }, [balance]);

    return (
        <Portal>
            {(balance && !isHome && !isCourseEdit && !isCourseStudy) &&
                <Wrapper>
                    <CoinIcon animate={animate} />
                    <span><strong>{balance}</strong> WeLearn Points</span>
                </Wrapper>
            }
        </Portal>
    )
}

export default PointsDisplay
