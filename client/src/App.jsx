import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Register from './pages/Register';
import Login from './pages/Login';
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home';
import Navbar from './pages/Frontpage/Navbar';
import ServiceProviderNavbar from './pages/Frontpage/SeviceProviderNavbar';
import Footer from './pages/Frontpage/Footer';
import EmailLogin from './pages/Frontpage/EmailLogin';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './pages/Components/PrivateRoute';

import { getProfile } from "./slices/ProfileSlice";
import { getUser } from "./slices/AuthSlice";
import Spinner from "./pages/Frontpage/Spinner"
import PetTypes from './pages/Admin/PetTypes';
import PetProfile from './pages/Owner/PetProfile';
import { petTypes } from './slices/PetSlice';
import YourPets from './pages/Owner/YourPets';
import RequestPets from './pages/Owner/RequestPets';
import { getRequestTypes, myPetList } from './slices/RequestSlice';
import YourRequestList from './pages/Owner/YourRequestList';
import PetServicePage from './pages/ServiceProvider/PetServicePage';
import SinglePetVeiwDetail from './pages/ServiceProvider/SinglePetVeiwDetail';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector(state => state.auth)
  const token = localStorage.getItem("token");
  const showFooter = ["/", "/login", "/register"];

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getUser())
      dispatch(petTypes())
      dispatch(getRequestTypes())
    }
  }, [dispatch])


  useEffect(()=>{
     if(userInfo){
      dispatch(getProfile())
    }
    if (userInfo?.role === "owner") {
      dispatch(myPetList());
      dispatch(petTypes());
    }
  },[userInfo, dispatch])

  if (token && !userInfo) {
    return <Spinner />
  }

  // const hideNavbarRoutes = ["/login", "/register"];
  // const currentPath = window.location.pathname;

  // if (hideNavbarRoutes.includes(currentPath)) {
  //   return <Navbar />
  // }

  const showNavbar = [ "/login", "/register"];

  return (
    <div className="flex flex-col ">
      {/* {<Navbar/>} */}
      {showNavbar.includes(location.pathname) ? (
        <Navbar />
      ) : (
        (userInfo?.role === "owner" || userInfo?.role === "admin") && <Navbar />
      )}
      {userInfo?.role === "serviceProvider" && <ServiceProviderNavbar />}

{/* 
      {(userInfo?.role === "owner" || userInfo?.role === "admin") && <Navbar />}
      {userInfo?.role === "serviceProvider" && <ServiceProviderNavbar />} */}
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify' element={<AccountVerify />} />
          <Route path='/loginwithemail' element={<EmailLogin />} />
          <Route path='/profilepage' element={<PrivateRoute> <ProfilePage /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
          <Route path='/petType' element={<PrivateRoute permittedRoles={["admin"]}> <PetTypes /></PrivateRoute>} />
          <Route path='/petProfile' element={<PrivateRoute permittedRoles={["owner"]}> <PetProfile /></PrivateRoute>} />
          <Route path='/yoursPetList' element={<PrivateRoute permittedRoles={["owner"]}> <YourPets /></PrivateRoute>} />
          <Route path='/requestpets' element={<PrivateRoute permittedRoles={["owner"]}> <RequestPets /></PrivateRoute>} />
          <Route path='/requestList' element={<PrivateRoute permittedRoles={["admin", "owner", "serviceProvider"]}> <YourRequestList /></PrivateRoute>} />
          <Route path='/petServicePage' element={<PrivateRoute permittedRoles={["admin", "serviceProvider"]}> <PetServicePage /></PrivateRoute>} />
          <Route path='/singlePetVeiwDetail/:id' element={<PrivateRoute permittedRoles={["admin", "serviceProvider"]}> <SinglePetVeiwDetail /></PrivateRoute>} />



        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
