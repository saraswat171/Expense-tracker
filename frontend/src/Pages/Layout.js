import React from 'react'
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom';

import Signup from './AuthUser/Signup';
import Login from './AuthUser/Login';
import Dashboard from '../Dashboard';

function Layout() {
  return (
   <Router>
    
    <Routes>
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/Login' Component={Login} />
        <Route path='/' Component={Signup} />
    </Routes>
   </Router>
  )
}

export default Layout