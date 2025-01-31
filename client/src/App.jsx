import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Register from './pages/Register';
import Login from './pages/Login';
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home'
import Navbar from './pages/Frontpage/Navbar';
import Footer from './pages/Frontpage/Footer';
import EmailLogin from './pages/Frontpage/EmailLogin';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './pages/components/PrivateRoute';

import { getProfile } from "./slices/ProfileSlice";
import { getUser} from "./slices/AuthSlice";
import RegisterLoading from './pages/Frontpage/RegisterLoading';

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
    }
},[])
if(token && !userInfo){
  return <RegisterLoading/>
}
  return (
    <div className="flex flex-col ">
      {<Navbar/>}
      <div className="flex-grow">
        {/* <h1>PET ADOP SYSTEM</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul> */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify' element={<AccountVerify />} />
          <Route path= '/loginwithemail' element= {<EmailLogin/>}/>
          <Route path= '/profilepage' element= {<PrivateRoute> <ProfilePage /></PrivateRoute>}/>
          <Route path= '/dashboard' element= {<PrivateRoute> <Dashboard /></PrivateRoute>}/>

        </Routes>
      </div>
        {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
