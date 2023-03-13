
import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/Footer/Footer';
import { Routes,Route } from 'react-router-dom';
import SignIn from './components/signup_sign/SignIn';
import SignUP from './components/signup_sign/SignUP';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';

function App() {
  return (
    <div>
      <Navbaar/>
      <Newnav/>
      <Routes>
        <Route path ="/" element={<Maincomp/>}/>
        <Route path ="/login" element={<SignIn/>}/>
        <Route path ="/registration" element={<SignUP/>}/>
        <Route path="/getproductsone/:id" element={<Cart/>}/>
        <Route path="/buynow" element={<Buynow/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
