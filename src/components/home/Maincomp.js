import React, { useEffect } from 'react'
import Banner from './Banner'
import "../home/home.css";
import Slide from './Slide';
import { Divider } from '@mui/material';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";


const Maincomp = () => {

    const { products } = useSelector(state => state.getproductsdata);
    console.log("P: ",products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const productsOfType1 = products.filter((product) => product.ptype === '1');
    const productsOfType2 = products.filter((product) => product.ptype === '2');
    const productsOfType3 = products.filter((product) => product.ptype === '3');


    console.log("Products: ",products);

    return (
        <>
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="VIEW ALL CATEGORY PRODUCTS" products={products} />
                    </div>
                    <div className="right_slide">
                        <h4>Festive latest launches</h4>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
                    </div>
                </div>

                <Slide title="NEW PRODUCTS" products={productsOfType1} />

                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>

                <Slide title="SECOND HAND PRODUCTS" products={productsOfType2} />
                <Slide title="RENTALS" products={productsOfType3} />
            </div>

            <Divider />

        </>
    )
}

export default Maincomp;

{/* {
            products.map((e)=>{
                return (
                    <>
                        <h3>{e.description}</h3>
                    </>
                )
            })
        } */}