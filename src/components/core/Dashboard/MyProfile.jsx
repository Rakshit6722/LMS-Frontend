import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { RiEditBoxLine } from 'react-icons/ri'
import { formatDate } from '../../../services/formatDate'

function MyProfile() {

    const { user } = useSelector(state => state.profile)
    const navigate = useNavigate()

    return (
        <div>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
                My Profile
            </h1>
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className='flex items-center gap-x-4'>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />
                    <div className='space-y-1 hidden sm:block'>
                        <p className='text-lg font-semibold text-richblack-5'>
                            {user?.firstName + " " + user?.lastName}
                        </p>
                    </div>
                </div>
                <IconBtn
                    text={"Edit"}
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className='text-lg font-semibold text-richblack-5'>
                        About
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <p
                    className={`${user?.additionalDetails?.about
                        ? "text-richblack-5"
                        : "text-richblack-400"
                        } text-sm font-medium`}
                >
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>
            </div>

            <div className='flex max-w-[500px] justify-between'>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">First Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.firstName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Email</p>
                        <p className="text-[13px] font-medium text-richblack-5">
                            {user?.email}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Gender</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.gender ?? <span className='text-richblack-400'>Add Gender</span>}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.contactNumber ?? <span className='text-richblack-400'>Add Number</span>}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {formatDate(user?.additionalDetails?.dateOfBirth) ??
                                "Add Date Of Birth"}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile