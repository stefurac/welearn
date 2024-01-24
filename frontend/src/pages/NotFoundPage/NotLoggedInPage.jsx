import React from 'react'
import styled from 'styled-components'
import EmptyPlaceholder from '../../components/Common/EmptyPlaceholder/EmptyPlaceholder'
import { Button } from '../../components/Common/Inputs'

const NoAuthWrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
	align-items: center;
`
// Default page if usesr is not logged in
export const NotLoggedInPage = props => {
	return (
		<NoAuthWrap>
			<EmptyPlaceholder
				maxHeight={'500px'}
				margin={'-10% 0 0 0'}
				imageName={'auth'}
				imageTitle={'Not Authorized'}
				headerComponent={"You don't have access to this page, try..."}
				bodyComponent={
					<div>
						<Button label={'Login'} margin={'0 8px'} linkTo={'/login'} />
							or
							<Button label={'SignUp'} margin={'0 8px'} linkTo={'/signup'} />
						<span>to get started</span>
					</div>
				} />
		</NoAuthWrap>
	)
}

export default NotLoggedInPage
