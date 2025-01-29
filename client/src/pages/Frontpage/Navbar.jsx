import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { logOut } from "./../../slices/AuthSlice";
import { ToastContainer } from "react-toastify";
// import petImage from '../image/petImage.jpg'
const Navbar = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logOut()); // Dispatch logout action
        localStorage.removeItem("token"); // Remove token from local storage
    };

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 shadow-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Logo with Image */}
                <div className="flex items-center space-x-4 ml-8">
                    {/* <img
                        src={petImage}
                        alt="Logo"
                        className="h-10 w-10 rounded-full" // Adjust size as needed
                    /> */}
                    <span className="text-white font-extrabold text-2xl flex items-center tracking-wide">
                        <span className="text-3xl opacity-80"></span>
                        <span className="mx-2 text-yellow-200 hover:text-yellow-400">
                            <Link to="/">Pet Adoption</Link>
                        </span>
                        <span className="text-3xl opacity-80"></span>
                    </span>
                </div>

                {/* Navbar Links */}
                <div className="space-x-6 text-white flex items-center">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <div className="cursor-pointer">
                                <Link to="/profile">
                                    <CgProfile size={30} color="white" />
                                </Link>
                            </div>
                            <button
                                className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-yellow-400 transition-all duration-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="ml-4">
                            <p className="text-lg font-semibold">
                                <Link
                                    to="/login"
                                    className="relative text-blue-500 hover:text-gray-400 transition duration-300 ease-in-out before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:bg-yellow-400 before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>

                    )}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </nav>
    );
};

export default Navbar;
