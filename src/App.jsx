import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './Dashboard';
import Login from './Login';
import NotFound from './NotFound';
import NewBirth from './NewBirth';
import Profile from './Profile';
import AllBirth from './AllBirth';
import AddMoney from './AddMoney';
import Malik from './Malik';
import Edit from './Edit';

import { Routes , Route} from 'react-router-dom';
function App() {
  
  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route 
      path="/dashboard" 
      element={<Dashboard />}>
      
        <Route index element={<Malik />} />
      
        <Route path="newbirth" element={<NewBirth/>} />
        <Route path="allbirth" element={<AllBirth/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="add" element={<AddMoney/>} />
        <Route path='edit' element={<Edit/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
