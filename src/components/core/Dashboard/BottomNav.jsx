import React, { useState } from 'react'
import { VscSettingsGear, VscSignOut, VscAdd } from 'react-icons/vsc'
import { AiOutlineHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import ConfirmationModel from '../../common/ConfirmationModel'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { FaShoppingCart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

function BottomNav() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModel, setConfirmationModel] = useState(null)
    const { user } = useSelector(state => state.profile)


    return (
        <div className="fixed bottom-0 left-0 w-full bg-richblack-800 border-t border-richblack-700 flex justify-around items-center py-3">
            {
                (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) && (
                    <>
                        <button
                            className="flex flex-col items-center text-richblack-300"
                            onClick={() => navigate('/dashboard/my-courses')}
                        >
                            <AiOutlineHome className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                        <button
                            className="flex flex-col items-center text-richblack-300"
                            onClick={() => navigate('/dashboard/add-course')}
                        >
                            <VscAdd className="text-2xl" />
                            <span className="text-xs">Add Course</span>
                        </button>
                    </>
                )
            }

            {
                (user && user?.accountType === ACCOUNT_TYPE.STUDENT) && (
                    <>
                        <button
                            className="flex flex-col items-center text-richblack-300"
                            onClick={() => navigate('/dashboard/enrolled-courses')}
                        >
                            <AiOutlineHome className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                        <button
                            className="flex flex-col items-center text-richblack-300"
                            onClick={() => navigate("/dashboard/cart")}
                        >
                            <BsCart2 className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                    </>
                )
            }

            <button
                className="flex flex-col items-center text-richblack-300"
                onClick={() => navigate('/dashboard/settings')}
            >
                <VscSettingsGear className="text-2xl" />
                <span className="text-xs">Settings</span>
            </button>
            <button
                className="flex flex-col items-center text-richblack-300"
                onClick={() => {
                    setConfirmationModel({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModel(null)
                    })
                }}
            >
                <VscSignOut className="text-2xl" />
                <span className="text-xs">Logout</span>
            </button>

            {confirmationModel && <ConfirmationModel modalData={confirmationModel} />}
        </div>
    )
}

export default BottomNav
