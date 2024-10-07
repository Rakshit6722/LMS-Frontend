import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'

function Index() {
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>
            <ChangeProfilePicture/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </div>
    )
}

export default Index