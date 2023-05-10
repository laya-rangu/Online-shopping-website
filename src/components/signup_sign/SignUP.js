import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './signup.css'

const SignUP = () => {
  const [udata, setUdata] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    password:"",
    cpassword:""

  });

  const adddata =(e)=>{
    const {name,value} = e.target;

    setUdata(()=>{
      return{
        ...udata,
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
            <h1>Sign-Up</h1>
            <div className='form_data'>
              <label htmlFor='fname'>Your First name</label>
              <input type='text' onChange={adddata} value={udata.fname} name="fname" id="fname"/>
            </div>
            <div className='form_data'>
              <label htmlFor='lname'>Your Last name</label>
              <input type='text' onChange={adddata} value={udata.lname} name="lname" id="lname"/>
            </div>
            <div className='form_data'>
              <label htmlFor='email'>Email</label>
              <input type='text' onChange={adddata} value={udata.email} name="email" id="email"/>
            </div>
            <div className='form_data'>
              <label htmlFor='number'>Mobile Number</label>
              <input type='text' onChange={adddata} value={udata.mobile} name="mobile" id="mobile"/>
            </div>
            <div className='form_data'>
              <label htmlFor='password'>Password</label>
              <input type='password' onChange={adddata} value={udata.password} name="password" placeholder="At least 8 characters"id="password"/>
            </div>
            <div className='form_data'>
              <label htmlFor='cpassword'>Conform-Password</label>
              <input type='password' onChange={adddata} value={udata.cpassword} name="cpassword" id="cpassword"/>
            </div>
            <button className='signin_btn'> Continue</button>
            <div className='signin_info'>
              <p>Already have an account?</p>
              <NavLink to="/login">signin</NavLink>
            </div>
          </form>
        </div>
        
      </div>
    </section>
    
    
  )
}

export default SignUP