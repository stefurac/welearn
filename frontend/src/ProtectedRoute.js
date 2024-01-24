import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import Api from './api'
import NotLoggedInPage from './pages/NotFoundPage/NotLoggedInPage'
import { getUser } from './store/selectors';
import { login } from './store/actions';
import LoadingPage from './pages/NotFoundPage/LoadingPage';

const ProtectedRoute = ({
	component: Component,
	forbiddenWithoutAuth,
	...rest
}) => {
	const dispatch = useDispatch()
	const user = useSelector(getUser)
	const [loading, setLoading] = useState(true)
	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if (user?.id) {
			setLoggedIn(true)
			setLoading(false)
		}
		else {
			Api.User.getSessionUserNoInterceptor()
				.then(user => {
					setTimeout(() => {
						setLoggedIn(true)
						dispatch(login(user))
						setLoading(false)
					}, 1000)
				})
				.catch(error => {
					setLoggedIn(false)
					setLoading(false)
				})
		}
	}, [user])

	let NoAuthComponent = () => {
		window.localStorage.setItem('redirectUrl', window.location.href);
		return (
			<NotLoggedInPage />
		);
	};

	// if (noAuthComponent) {
	// 	NoAuthComponent = noAuthComponent;
	// }
	const tryAuth = (user) => {

		if (!user.id) {
			return false;
		}
		// I know this looks redundant, but leaving it here for phase 2 to we can check permissions of individual bought courses
		if (rest.path.includes('dashboard') || rest.path.includes('creator') || rest.path.includes('profile') || rest.path.includes('course-search/')) {
			if (user.id) {
				return true;
			}
			return false;
		}
		return true
	}
	return <Route {...rest} render={(props) => (
		loading
			? <LoadingPage />
			: forbiddenWithoutAuth
				? loggedIn
					? <Component {...props} {...rest} />
					: <NotLoggedInPage />
				: <Component {...props} {...rest} />
	)} />;
};

ProtectedRoute.propTypes = {
	forbiddenWithoutAuth: PropTypes.bool,
}

ProtectedRoute.defaultProps = {
	forbiddenWithoutAuth: true
}

export default ProtectedRoute