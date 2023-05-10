import { useNavigate, useParams, NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { products } from "../home/productdata";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../context/Contextprovider";

import axios from "axios";

const Cart = () => {
  console.log("Here..............................");

  const { account, setAccount } = useContext(Logincontext);
  // console.log(account);

  // const { id } = useParams("");
  const { id, ptype } = useParams();

  console.log("Product id: ", id);
  console.log("Product ptype: ", ptype);

  const history = useNavigate();

  const [inddata, setIndedata] = useState("");

  const apiTr = `/getproductsone/${id}/${ptype}`;

  console.log("Here 3 ", apiTr);

  const getinddata = async () => {
    console.log("Calling fetch");
    const data = await fetch("http://localhost:5007" + apiTr, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();

    // console.log("Fetched product: ", res);

    if (!res) {
      alert("no data available");
    } else {
      console.log("ind mila hain");
      setIndedata(res);
    }
  };

  // useEffect(()=>{
  //     const stepOne = async () =>{
  //         console.log("C1");
  //         await getinddata();
  //         console.log("C2");
  //     }
  //     stepOne();
  // },[])

  useEffect(() => {
    console.log("C1");
    setTimeout(getinddata, 1000);
    console.log("C2");
  }, [id]);


  const addtocart = async (id) => {
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
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
              <NavLink to={`/compare/${inddata.id}/`}>
                <button className="cart_btn2">Compare</button>
              </NavLink>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount}){" "}
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>{" "}
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {" "}
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Iteam :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      )}

      {!inddata ? (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  // return (
  //     <>vhbkjvbh</>
  // )
};

export default Cart;
