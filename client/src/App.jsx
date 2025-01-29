import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';

import Footer from './pages/Frontpage/Footer';
import Navbar from './pages/Frontpage/Navbar';
function App() {
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
        </Routes>
      </div>
      {<Footer/>}
    </div>
  );
}

export default App;
