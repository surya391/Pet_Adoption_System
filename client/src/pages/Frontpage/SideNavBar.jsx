import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TbLogout2 } from "react-icons/tb";
import { IoReorderThree } from "react-icons/io5";
import { FaRegUserCircle, FaBusinessTime } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { logOut } from "../../slices/AuthSlice"


const SideNavbar = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    }
    const handleLogout = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
        toast.success("User logout succesfully")
        navigate("/login")
    }
    return (
        // <div className=" relative w-auto h-auto  flex flex-col bg-slate-100 rounded-sm shadow-sm p-4 overflow-x-hidden ">
        //     <div className=" flex cursor-pointer p-4" onClick={toggleSidebar}>
        //         <IoReorderThree size={30} />
        //     </div>
        //     <div className="flex flex-col  ">
        //         <p className="  p-4 flex text-bold cursor-pointer ">
        //             <Link to="/profilepage" className="flex items-center space-x-2" ><FaRegUserCircle size={25} />
        //                 {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Profile </span>}</Link>
        //         </p>
        //         <p className="p-4 flex text-bold cursor-pointer">
        //             <Link to="/petProfile" className="flex items-center space-x-2">
        //                 <FaPaw size={25} className="text-blue-500" />
        //                 {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500">your Pet</span>}
        //             </Link>
        //         </p>
        //         <p className="  flex text-bold cursor-pointer p-4" onClick={handleLogout}><TbLogout2 size={25} /> {isExpanded && <span className="ml-2 font-semibold text-sm text-rose-500"> Logout</span>}</p>
        //     </div>
        // </div>

        <div className="relative w-auto h-auto flex flex-col bg-slate-100 rounded-sm shadow-sm p-4 overflow-x-hidden">
    {/* Menu Toggle */}
    <div className="flex cursor-pointer p-4" onClick={toggleSidebar}>
        <p className="text-xl font-semibold text-blue-500">Menu</p>
    </div>
    
    {/* Navigation Links */}
    <div className="flex flex-col space-y-2">
        {/* Profile Link */}
        <p className="p-4 text-sm font-bold cursor-pointer">
            <Link to="/profilepage" className="text-blue-500 hover:underline">
                Profile
            </Link>
        </p>

        {/* Your Pet Link */}
        <p className="p-4 text-sm font-bold cursor-pointer">
            <Link to="/petProfile" className="text-blue-500 hover:underline">
                Pet profile
            </Link>
        </p>

        <p className="p-4 text-sm font-bold cursor-pointer">
            <Link to="/yoursPetList" className="text-blue-500 hover:underline">
                Pet Lists
            </Link>
        </p>

        <p className="p-4 text-sm font-bold cursor-pointer">
            <Link to="/requestPets" className="text-blue-500 hover:underline">
                Create Request
            </Link>
        </p>

        <p className="p-4 text-sm font-bold cursor-pointer">
            <Link to="/requestList" className="text-blue-500 hover:underline">
                Service Request
            </Link>
        </p>

        {/* Logout Link */}
        <p
            className="p-4 text-sm font-bold text-rose-500 cursor-pointer"
            onClick={handleLogout}
        >
            Logout
        </p>
    </div>
</div>

       

    )
}
export default SideNavbar;