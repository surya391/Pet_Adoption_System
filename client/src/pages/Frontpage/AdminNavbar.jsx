import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { logOut } from "../../slices/AuthSlice";
import { ToastContainer } from "react-toastify";

function AdminNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
        navigate("/login"); 
    };

    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-600 p-4 shadow-lg">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Admin Panel Logo */}
                <div className="text-white font-bold text-2xl">
                    <Link to="/admin">Admin Panel</Link>
                </div>

                {/* Profile and Logout */}
                <div className="flex items-center space-x-6 text-white">
                    {isLoggedIn ? (
                        <>
                            <div>
                                <Link to="/requestTypes" className="hover:text-gray-300 transition duration-300">Add RequestTyped
                                </Link>
                            </div>
                            <div>
                                <Link to="/petType" className="hover:text-gray-300 transition duration-300">Add petTypes
                                </Link>
                            </div>
                            <div>
                                <Link to="/profilepage" className="hover:text-gray-300 transition duration-300">
                                    <CgProfile size={30} />
                                </Link>
                            </div>

                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>

                        </>
                    ) : (
                        <div className="ml-4">
                            <p className="text-lg font-semibold">
                                <Link
                                    to="/login"
                                    className="relative text-blue-500 hover:text-gray-400 transition duration-300 ease-in-out before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:bg-yellow-400 before:transition-all before:duration-300  hover:pointer"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
        </nav>
    );
}

export default AdminNavbar;
