import Navbaar from './Components/header/Navbaar';
import React from 'react';

import { BrowserRouter,Routes,Route,Outlet } from 'react-router-dom';

import Newnav from './Components/newnav/Newnav';
import Maincomp from './Components/home/Maincomp';
import Footer from './Components/footer/Footer';
import Signup from './Components/signup_signin/SignUp';
import Sign_in from './Components/signup_signin/Sign_in';
import Cart from './Components/cart/Cart';
import Buynow from './Components/buynow/Buynow';
import './App.css';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
//import { Switch, Route } from "react-router-dom";


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])


  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            {/* <BrowserRouter>
               <Routes>
                   <Route path="/" element={<Maincomp/>}/>
                   <Route path="/signup" element={<Signup/>}/>
                   <Route path="/login" element={<Sign_in/>}/>
                   <Route path="/getproductsone/:id" element={<Cart/>}/>
                   <Route path="/buynow" element={<Buynow/>}/>

               </Routes>
            </BrowserRouter> */}

            {/* /*
            <Switch>
              <Route exact path="/">
                <Maincomp />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/login">
                <Sign_in />
              </Route>
              <Route exact path="/getproductsone/:id">
                <Cart />
              </Route>
              <Route exact path="/buynow">
                <Buynow />
              </Route>
            </Switch> */}
           
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }

    </>
  );
}

export default App;