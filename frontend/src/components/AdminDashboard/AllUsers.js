import React from 'react'
import PropTypes from 'prop-types'
import { CourseRow } from '../Common/CourseRow'
import { Button } from '../Common/Inputs'
import Api from '../../api'


const AllUsers = props => {

    // Calls API to delete comment
    const deleteUser = user => {
        Api.User.deleteUser(user.id)
            .then(res => {
                // updates page
                props.setLastUpdate(Date.now())
            })
    }
    return (
        <>
            {props.users.map(user =>
                <CourseRow
                    key={user._id}
                    title={user.username}
                    image={user.profilePicture}
                    sidecarComponent={
                        <Button label={'Delete User'}
                            onClick={() => { deleteUser(user) }}
                            warning
                            disabled={user.isAdmin} />}>
                </CourseRow>
            )}
        </>
    )
}

AllUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AllUsers
