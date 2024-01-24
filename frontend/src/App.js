import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, GlobalStyleComponent } from './theme'
import { useSelector } from 'react-redux'
import { getUser } from './store/selectors'
import {
  SideNav,
  CourseSearch,
  CourseDetail,
  UserDashboard,
  Home,
  Signup,
  Login,
  Profile,
  CourseEdit,
  CourseCreate,
  CourseStudy,
  NotFoundPage,
  NotLoggedInPage,
  AdminDashboard,
  Logout
} from './pages';
import SideNavButton from './pages/SideNav/SideNavButton'
import { makeIconComponent } from './utils'
import { ReactComponent as DashboardSVG } from './assets/icons/dashboard.svg'
import { ReactComponent as BrowseSVG } from './assets/icons/browse-courses.svg'
import { ReactComponent as CreatorSVG } from './assets/icons/creator-center.svg'
import { ReactComponent as ProfileSVG } from './assets/icons/profile.svg'
import { ReactComponent as LogoutSVG } from './assets/icons/logout.svg'
import ProtectedRoute from './ProtectedRoute'
import PointsDisplay from './components/Common/PointsDisplay/PointsDisplay'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const App = () => {
  const user = useSelector(getUser)
  // Create buttons for the SideNav
  const sideNavConfig = {
    mainButtonProps: [
      { icon: makeIconComponent(DashboardSVG, true), label: user.isAdmin ? "Admin Dashboard" : "Dashboard", path: user.isAdmin ? '/admin' : '/dashboard' },
      { icon: makeIconComponent(BrowseSVG, false), label: 'Browse Courses', path: '/course-search', exactPath: false },
      { icon: makeIconComponent(CreatorSVG, false), label: 'Creator Center', path: '/creator', exactPath: false },
      { icon: makeIconComponent(ProfileSVG, false), label: 'Profile', path: '/profile' },
    ],
    guestButtonProps: [
      { icon: makeIconComponent(BrowseSVG, false), label: 'Browse Courses', path: '/course-search', exactPath: false },
    ],
    endButtonProps: { icon: makeIconComponent(LogoutSVG, false), label: user.id ? 'Logout' : 'Login', path: user.id ? '/logout' : '/login' },
  }

  /**
   * Wraps a component inside the SideNav component
   *
   * @param {React.ReactElement} Component component to be wrapped in the SideNav
   */
  const withSideNav = Component => () => {
    // Create the main navigation buttons
    let sideNavMainButtons = sideNavConfig.mainButtonProps.map(props => <SideNavButton key={props.label} {...props} />)
    if (!user.id) {
      sideNavMainButtons = sideNavConfig.guestButtonProps.map(props => <SideNavButton key={props.label} {...props} />)
    }
    // Create the logout button
    const sideNavEndButton = (<SideNavButton {...sideNavConfig.endButtonProps} />)

    return (
      <SideNav mainComponents={sideNavMainButtons} endComponent={sideNavEndButton}>
        <Component />
      </SideNav>)
  }
  return (
    /* TODO: grab theme selection from state management system */
    <ThemeProvider theme={lightTheme}>
      <GlobalStyleComponent />
      <Router>
        <div className='App'>
          {/* Points Display needs to live at top of component tree, since it relies on not being re-rendered */}
          <PointsDisplay />
          <ToastContainer />
          <Switch>
            <Route path='/after-login' component={() => {
              const redirectUrl = window.localStorage.getItem('redirectUrl');
              window.localStorage.removeItem('redirectUrl');
              window.location.href = redirectUrl || '/';
              return null;
            }} />

            {/* Make /home the root page */}
            <Redirect path={'/'} to={'/home'} exact />
            {/* Components with SideNav */}
            <Route path={'/home'} component={withSideNav(Home)} exact />
            <Route path={'/login'} component={withSideNav(Login)} exact />
            <Route path={'/logout'} component={withSideNav(Logout)} exact />
            <Route path={'/signup'} component={withSideNav(Signup)} exact />
            <ProtectedRoute path={'/profile'} component={withSideNav(Profile)} exact />
            <Route path={'/home'} component={withSideNav(Home)} exact />
            <ProtectedRoute path={'/admin'} component={withSideNav(AdminDashboard)} exact />
            <ProtectedRoute path={'/course-search'} component={withSideNav(CourseSearch)} forbiddenWithoutAuth={false} exact />
            <ProtectedRoute path={'/course-search/:id'} component={withSideNav(CourseDetail)} exact />
            <ProtectedRoute path={'/dashboard'} component={withSideNav(UserDashboard)} exact />
            <ProtectedRoute path={'/creator'} component={withSideNav(CourseCreate)} exact />
            <ProtectedRoute path={'/creator/course-edit/:id'} component={withSideNav(CourseEdit)} exact />

            {/* Course study page */}
            <ProtectedRoute path={'/course/:id'} component={CourseStudy} exact />


            {/* Error pages */}
            <Route path="/404" component={NotFoundPage} />
            <Route path="/login-prompt" component={NotLoggedInPage} />
            {/* If nothing has been matched then redirect to 404 page */}
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>);
}
export default App;
