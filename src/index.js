import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
//import { BrowserRouter } from "react-router-dom";
import Contextprovider from "./Components/context/Contextprovider";
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
import Compare from './Components/comapreComp/Compare';

ReactDOM.render(
   <Contextprovider>
     <Provider store={store}>
       <BrowserRouter>
         <App />
          <Routes>
                   <Route path="/" element={<Maincomp/>}/>
                   <Route path="/signup" element={<Signup/>}/>
                   <Route path="/login" element={<Sign_in/>}/>
                   <Route path="/getproductsone/:id/:ptype" element={<Cart/>}/>
                   <Route path="/buynow" element={<Buynow/>}/>
                   <Route path="/compare/:id" element={<Compare/>}/>
          </Routes>
          {/* <Footer /> */}
       </BrowserRouter>
     </Provider>
   </Contextprovider>
   ,
   document.getElementById('root') );