import React, { useEffect, useState, useContext } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import { Logincontext } from "../context/Contextprovider";

import axios from "axios";

const Right = ({ iteam }) => {

    const { account, setAccount } = useContext(Logincontext);
    const emailId = localStorage.getItem('email');

    // console.log(iteam);
    const [val, setVal] = useState(false);

    const [price, setPrice] = useState(0);

    const history = useNavigate("");
    // const history = useHistory();

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    const proceesby = async ()=>{
        const check = await axios.post(`http://localhost:5007/clearcart`, {},{
            headers: {
              'email' : emailId
            }
        });

        console.log("Account: ",check);
        setAccount(check);
        alert("Your Order is Confirmed");
        history('/');
        
    }

    return (
        <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3>Subtotal ({iteam.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={proceesby} >Proceed to Buy</button>
                <div className="emi" onClick={() => setVal(!val)}>
                    Emi available
                    {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <span className={val ? "show" : "hide"}> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
    )
}

export default Right;