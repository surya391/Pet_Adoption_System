import './App.css';
import { Routes, Route } from 'react-router-dom'
import AccountVerify from './pages/AccountVerify';
import Home from './pages/Home'

function App() {

 
  return (
   <div>
     <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/verify' element={<AccountVerify/>}/>
  </Routes>
   </div>
  );
}

export default App;
