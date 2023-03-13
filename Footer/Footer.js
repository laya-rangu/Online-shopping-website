import React from 'react'
import "./footer.css"

const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);
  return (
    <Footer>

        <div className='footer_container'>
            <div className='footr_details_one'>
                <h3>Get to Know US</h3>
                <p>About Us</p>
                <p>Careers</p>
                <p>Press Release</p>
                <p>Cares</p>
            </div>
            <div className='footr_details_one'>
                <h3>Connect with  US</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
                
            </div>
            <div className='footr_details_one forres'>
                <h3>Make Money with US</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
                
            </div>
            <div className='footr_details_one forres'>
                <h3>Make Money with US</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
                
            </div>
            <div className="lastdetails">
                <img src="./amazon_PNG25.png" alt="logo" />
                <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    </Footer>
  )
}

export default Footer
