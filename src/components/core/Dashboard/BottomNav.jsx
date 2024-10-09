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
import { CgProfile } from "react-icons/cg";

function BottomNav() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModel, setConfirmationModel] = useState(null)
    const { user } = useSelector(state => state.profile)
    const [selected, setSelected] = useState(null)


    return (
        <div className="fixed bottom-0 h-[60px] left-0 w-full bg-richblack-800 border-t border-richblack-700 flex justify-around items-center">
            {
                (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) && (
                    <>
                        <button
                            className={`flex flex-col items-center text-richblack-300 ${selected === 1 ? "text-white" : ""}`}
                            onClick={() => {
                                navigate('/dashboard/my-courses')
                                setSelected(1)
                            }}
                        >
                            <AiOutlineHome className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                        <button
                            className={`flex flex-col items-center text-richblack-300 ${selected === 2 ? "text-white" : ""}`}
                            onClick={() => {
                                navigate('/dashboard/add-course')
                                setSelected(2)
                            }}
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
                            className={`flex flex-col items-center text-richblack-300 ${selected === 3 ? "text-white" : ""}`}
                            onClick={() => {
                                navigate('/dashboard/enrolled-courses')
                                setSelected(3)
                            }}
                        >
                            <AiOutlineHome className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                        <button
                            className={`flex flex-col items-center text-richblack-300 ${selected === 4 ? "text-white" : ""}`}
                            onClick={() => {
                                navigate("/dashboard/cart")
                                setSelected(4)
                            }}
                        >
                            <BsCart2 className="text-2xl" />
                            <span className="text-xs">Courses</span>
                        </button>
                    </>
                )
            }

            <button
                className={`flex flex-col items-center text-richblack-300 ${selected === 5 ? "text-white" : ""}`}
                onClick={() => {
                    navigate('/dashboard/my-profile')
                    setSelected(5)
                }}
            >
                <CgProfile className="text-2xl" />
                <span className="text-xs">Profile</span>
            </button>

            <button
                className={`flex flex-col items-center text-richblack-300 ${selected === 6 ? "text-white" : ""}`}
                onClick={() => {
                    navigate('/dashboard/settings')
                    setSelected(6)
                }}
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
