import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './screens/Home'
import '../src/App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Login from './screens/Login'

// npm i bootstrap-dark-5 bootstrap react-bootstrap
// basically for carousal on bootrap website it autmotically slides because they have sometheir hidden js
// but here we dont to get that js effect we are doing this
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar.jsx'
import Signup from './screens/Signup.jsx'
import NotFound from './screens/NotFound.jsx'

const isLoggedIn = !!localStorage.getItem("accessToken");
import { Navigate } from "react-router-dom";
import { CartProvider } from './components/ContextReducer.jsx'
import MyOrders from './screens/MyOrders.jsx'
// import './App.css'

function App() {
  const isLoggedIn = !!localStorage.getItem("accessToken")

  return (
    <CartProvider>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/myorders' element={ <MyOrders />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
    </CartProvider>
  )
}

export default App
