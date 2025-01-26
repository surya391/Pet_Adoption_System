import './App.css';
import { Routes, Route,Link } from 'react-router-dom'
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home'
import Register from './pages/Register';

function App() {

 
  return (
   <div>
      <h1>PET ADOP SYSTEM</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
     
     <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Register' element={<Register/>}/>
    <Route path='/verify' element={<AccountVerify/>}/>
  </Routes>
   </div>
  );
}

export default App;
