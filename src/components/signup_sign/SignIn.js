import React, { useState } from 'react'
import './signup.css'
import { NavLink } from 'react-router-dom'

const SignIn = () => {

  const [logdata,setData] = useState({
    email:"",
    password:""
  });
  console.log(logdata);

  const adddata = (e)=>{
    const {name,value} = e.target;

    setData(()=>{
      return {
        ...logdata,
        [name]:value
      }
    })
  }
  

  return (
    <section>
      <div className='Sign_container'>
        <div className='sign_header'>
          <h2>Online shopping website</h2>
        </div>
        <div className='sign_form'>
          <form>
            <h1>Sign-In</h1>
            <div className='form_data'>
              <label htmlFor='email'>Email</label>
              <input type='text'
              onChange={adddata} 
              value={logdata.email}
              name="email" id="email"/>
            </div>
            <div className='form_data'>
              <label htmlFor='password'>Password</label>
              <input type='password' name="password"
              onChange={adddata} 
              value={logdata.password}
              placeholder="At least 8 characters"id="password"/>
            </div>
            <button className='signin_btn'> Continue</button>
          </form>
        </div>
        <div className='create_account_info'>
          <p>New to website?</p>
          <NavLink to="/register"><button>Create your Account.</button></NavLink>
        </div>
      </div>
    </section>
    
    
  )
}

export default SignIn