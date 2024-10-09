import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDrowpdown from '../core/Auth/ProfileDrowpdown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'
import { BsChevronDown } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { CgAdd } from "react-icons/cg";
import IconBtn from './IconBtn'
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { logout } from '../../services/operations/authAPI'

// for temporary testing


function Navbar() {

    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const { totalItems } = useSelector(state => state.cart)

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [open, setOpen] = useState(false)

    const fetchSubLinks = async () => {
        setLoading(true)
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("result", result)
            setSubLinks(result.data.data)
            console.log("sublinks", subLinks)
        } catch (err) {
            console.log("Could not fetch the category list")
        }
        setLoading(false)

    }

    useEffect(() => {
        fetchSubLinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (<>

        <div className='hidden lg:flex md:flex xl:flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto'>
                {/* Logo */}
                <Link to={"/"}>
                    <img src={logo} width={150} height={42} loading='lazy' />
                </Link>

                {/* Nav links */}
                <nav>
                    <ul className='flex gap-x-4 text-richblack-25'>
                        {
                            NavbarLinks.map((ele, i) => {
                                return (
                                    <li key={i}>
                                        {
                                            ele.title === "Catalog" ?
                                                (<>
                                                    <div className='group flex justify-center items-center gap-1 cursor-pointer relative'>
                                                        <p>{ele.title}</p>
                                                        <BsChevronDown />

                                                        <div className="invisible absolute left-[50%] top-[80%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all
                                                         duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                                                            <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                                            {loading ? (
                                                                <p className="text-center">Loading...</p>
                                                            ) : subLinks && subLinks.length ? (
                                                                <>
                                                                    {subLinks.map((subLink, i) => {
                                                                        // Check if courses exist for the current subLink
                                                                        if (subLink.courses && subLink.courses.length > 0) {
                                                                            return (
                                                                                <Link
                                                                                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                                    key={i}
                                                                                >
                                                                                    <p>{subLink.name}</p>
                                                                                </Link>
                                                                            );
                                                                        }
                                                                        return null; // Return null if no courses exist for this subLink
                                                                    })}
                                                                    {/* If none of the subLinks have courses, show a message */}
                                                                    {!subLinks.some(subLink => subLink.courses && subLink.courses.length > 0) && (
                                                                        <p className="text-center">No Courses Found</p>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <p className="text-center">No Courses Found</p>
                                                            )}

                                                        </div>

                                                    </div>
                                                </>) : (<>
                                                    <Link to={ele?.path}><p className={`${matchRoute(ele?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{ele.title}</p></Link>
                                                </>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* login/signup/dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType === "Student" && (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart className='text-2xl text-richblack-100'></AiOutlineShoppingCart>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {user && user?.accountType === "Admin" && (
                        <Link to={'/createCategory'}>
                            <IconBtn text="Category">
                                <CgAdd size={20} />
                            </IconBtn>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Sign up
                            </button>
                        </Link>
                    )}
                    {token !== null && (
                        <ProfileDrowpdown />
                    )}
                </div>

            </div>
        </div>

        {/* mobile screen navbar */}

        <div className='lg:hidden md:hidden xl:hidden flex justify-between p-5 w-full border-b-richblack-600'>
            <div>
                <Link to={"/"}>
                    <img
                        src={logo}
                        width={150}
                    />
                </Link>

            </div>
            <div>
                <button onClick={() => setOpen(true)}>
                    <MdOutlineMenu className='text-white w-10 h-9' />
                </button>
            </div>

            {open && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <div className="w-72 bg-richblack-800 p-5 h-full overflow-y-auto">
                            <button className="text-white" onClick={() => setOpen(false)}><IoMdClose /></button>
                            <nav className="mt-5">
                                <ul className='flex flex-col gap-y-4'>
                                    {
                                        NavbarLinks.map((ele, i) => {
                                            return (
                                                <li key={i}>
                                                    {
                                                        ele.title === "Catalog" ? (
                                                            <div className='group flex flex-col justify-center items-center gap-1 cursor-pointer relative text-richblack-400'>
                                                                <p>{ele.title}</p>
                                                                <BsChevronDown />
                                                                <div className="flex flex-row w-full rounded-lg p-2 text-white text-[15px]">
                                                                    {loading ? (
                                                                        <p className="text-center">Loading...</p>
                                                                    ) : subLinks && subLinks.length ? (
                                                                        <>
                                                                            {subLinks.map((subLink, i) => {
                                                                                if (subLink.courses && subLink.courses.length > 0) {
                                                                                    return (
                                                                                        <Link
                                                                                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                                            key={i}
                                                                                            onClick={() => setOpen(false)} // Close navbar when a link is clicked
                                                                                        >
                                                                                            <p>{subLink.name}</p>
                                                                                        </Link>
                                                                                    );
                                                                                }
                                                                                return null;
                                                                            })}
                                                                            {!subLinks.some(subLink => subLink.courses && subLink.courses.length > 0) && (
                                                                                <p className="text-center">No Courses Found</p>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <p className="text-center">No Courses Found</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                to={ele?.path}
                                                                onClick={() => setOpen(false)}  // Close navbar when a link is clicked
                                                            >
                                                                <p className={`${matchRoute(ele?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{ele.title}</p>
                                                            </Link>
                                                        )
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </nav>

                            {/* login/signup/dashboard buttons */}
                            <div className="mt-5">
                                {user && user?.accountType === "Admin" && (
                                 
                                        <Link to={'/createCategory'} onClick={()=>setOpen(false)}>
                                            <IconBtn text="Category">
                                                <CgAdd size={20} />
                                            </IconBtn>
                                        </Link>
                               
                                )}
                                {token === null && (
                                    <>
                                        <Link to="/login" onClick={() => setOpen(false)}>
                                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 w-full mb-2">
                                                Log in
                                            </button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setOpen(false)}>
                                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 w-full">
                                                Sign up
                                            </button>
                                        </Link>
                                    </>
                                )}
                                {/* {token !== null && <ProfileDrowpdown />} */}

                                {
                                    token !== null && (
                                        <div className='py-2 mt-5'>
                                            <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
                                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 w-full mb-2">
                                                    Dashboard
                                                </button>
                                            </Link>


                                            <button
                                                onClick={() => {
                                                    dispatch(logout(navigate))
                                                    setOpen(false)
                                                }}
                                                className="bg-red-500 rounded-[8px] px-[12px] py-[8px] text-white w-full">
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>


    </>
    )
}

export default Navbar