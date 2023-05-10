import { useNavigate, useParams, NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./compare.css";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../context/Contextprovider";

import axios from "axios";

const Compare = () => {
  console.log("Here..............................");

  const { account, setAccount } = useContext(Logincontext);

  const { id } = useParams();

  console.log("Product id: ", id);

  const history = useNavigate();

  const [inddata, setIndedata] = useState("");
  const [inddata1, setIndedata1] = useState("");
  const [inddata2, setIndedata2] = useState("");

  const apiTr = `/getproductsone/${id}`;


  const getinddata = async () => {
    console.log("Calling fetch");
    const data = await fetch("http://localhost:5007" + apiTr, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();

    console.log("Fetched product for compare: ", res);

    if (!res) {
      alert("no data available");
    } else {
      console.log("ind mila hain");
      setIndedata(res[0]);
      setIndedata1(res[1]);
      setIndedata2(res[2]);
    }
  };

  useEffect(() => {
    console.log("C1");
    setTimeout(getinddata, 1000);
    console.log("C2");
  }, [id]);


  const addtocart = async (id,ptype) => {
    console.log(id);
    const emailId = localStorage.getItem('email');
    console.log("EmailID: ",emailId);
    const check = await axios.post(`http://localhost:5007/addcart/${id}/${ptype}`, {},{
      headers: {
        'email' : emailId
      },
      body: JSON.stringify({
        inddata,
      })
    });
    // console.log(check);
    const data1 = await check.data;
    console.log("Data : ",data1);

    if (check.status !== 201) {
      alert("no data available");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data1);
      history("/buynow");
    }
  };

return (
  <div className="cart_section">
    {inddata && inddata1 && inddata2 && Object.keys(inddata).length && (
    <table className="comparison-table">
    <thead>
      <tr>
        <th>Product Image</th>
        <th>Product Price</th>
        <th>Product Seller</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img src={inddata.detailUrl} alt="Product 1" />
        </td>
        <td>₹{inddata.price.mrp}</td>
        <td>₹{inddata.price.cost}</td>
        <td>
        <div style={{display:"flex", flexDirection:"column", gap:"10px", justifyContent:"center"}} className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id, inddata.ptype)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
        </td>
      </tr>    
      <tr>
        <td>
          <img src={inddata1.detailUrl} alt="Product 1" />
        </td>
        <td>₹{inddata1.price.mrp}</td>
        <td>₹{inddata1.price.cost}</td>
        <td>
        <div style={{display:"flex", flexDirection:"column", gap:"10px", justifyContent:"center"}} className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id, inddata.ptype)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
        </td>
      </tr>    
      <tr>
        <td>
          <img src={inddata2.detailUrl} alt="Product 1" />
        </td>
        <td>₹{inddata2.price.mrp}</td>
        <td>₹{inddata2.price.cost}</td>
        <td>            
          <div style={{display:"flex", flexDirection:"column", gap:"10px", justifyContent:"center"}} className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id, inddata.ptype)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </td>
      </tr>
    </tbody>
  </table>)}
  {(!inddata || !inddata1 || !inddata2)? (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      ) : (
        ""
      )}
  </div>

);
};



export default Compare;
