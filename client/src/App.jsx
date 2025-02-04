import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Register from './pages/Register';
import Login from './pages/Login';
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home';
import Navbar from './pages/Frontpage/Navbar';
import Footer from './pages/Frontpage/Footer';
import EmailLogin from './pages/Frontpage/EmailLogin';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './pages/Components/PrivateRoute';

import { getProfile } from "./slices/ProfileSlice";
import { getUser} from "./slices/AuthSlice";
import Spinner from "./pages/Frontpage/Spinner"
import PetTypes from './pages/Admin/PetTypes';
import PetProfile from './pages/Owner/PetProfile';
import { petTypes } from './slices/PetSlice';
import YourPets from './pages/Owner/YourPets';
import RequestPets from './pages/Owner/RequestPets';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector(state => state.auth)
  const token = localStorage.getItem("token");
  const showFooter = ["/", "/login", "/register"];

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      dispatch(getUser())
      dispatch(getProfile())
      dispatch(petTypes())
    }
},[])

if(token && !userInfo){
  return <Spinner/>
}
  return (
    <div className="flex flex-col ">
      {<Navbar/>}
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify' element={<AccountVerify />} />
          <Route path= '/loginwithemail' element= {<EmailLogin/>}/>
          <Route path= '/profilepage' element= {<PrivateRoute> <ProfilePage /></PrivateRoute>}/>
          <Route path= '/dashboard' element= {<PrivateRoute> <Dashboard /></PrivateRoute>}/>
          <Route path= '/petType' element= {<PrivateRoute permittedRoles={["admin"]}> <PetTypes /></PrivateRoute>}/>
          <Route path= '/petProfile' element= {<PrivateRoute permittedRoles={["owner"]}> <PetProfile /></PrivateRoute>}/>
          <Route path= '/yoursPetList' element= {<PrivateRoute permittedRoles={["owner"]}> <YourPets/></PrivateRoute>}/>
          <Route path= '/requestpets' element= {<PrivateRoute permittedRoles={["owner"]}> <RequestPets/></PrivateRoute>}/>





        </Routes>
      </div>
        {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
