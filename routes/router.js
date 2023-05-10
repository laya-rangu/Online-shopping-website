const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

// router.get("/",(req,res)=>{
//     res.send("this is testing routes");
// });


// get the products data

router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        console.log(productsdata + "data mila hain");
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});



// register the data
router.post("/register", async (req, res) => {
     console.log(req.body);
    console.log("hai")
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log("bhai nathi present badhi details");
    };

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new User({
                fname, email, mobile, password, cpassword
            });

            // yaha pe hasing krenge

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }

});



// login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    //console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        //console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);



            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
                const token = await userlogin.generatAuthtoken();
                console.log("Token after login: ",token);

                res.cookie("eccomerce", token, {
                    expires: new Date(Date.now() + 2589000),
                    httpOnly: true
                });
                res.status(201).json(userlogin);
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

// getindividual

router.get("/getproductsone/:id/:ptype", async (req, res) => {

    try {
        const id = req.params.id;
        const ptype = req.params.ptype;
        console.log(id,ptype);

        const individual = await Products.findOne({ id: id, ptype: ptype});
        console.log(individual + "ind mila hai");

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/getproductsone/:id", async (req, res) => {

    try {
        const id = req.params.id;
        console.log(id);

        const individual = await Products.find({ id: id});
        console.log(individual + "ind mila hai");

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }
});


// adding the data into cart

router.post("/addcart/:id/:ptype", async (req, res) => {

    console.log("Add to cart.................................")
    try {
        const email = req.headers['email'];
        console.log("Email ",email);
        console.log("perfect 6");
        const { id,ptype } = req.params;
        const cart = await Products.findOne({ id: id, ptype:ptype });
        // console.log(cart + "cart milta hain");
        // console.log("Email: ",req.headers['email']);
        const Usercontact = await User.findOne({ email: email});
        if(Usercontact){
            console.log(" user milta hain");
        }
        // console.log(Usercontact + " user milta hain");

        if (Usercontact) {
            console.log("Adding cart info into user data..........");
            const cartData = await Usercontact.addcartdata(cart);
            await Usercontact.save();
            console.log(cartData + " thse save wait kr");
            console.log(Usercontact + "userjode save");
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});


router.post("/clearcart", async (req, res) => {

    try {
        const email = req.headers['email'];
        const Usercontact = await User.findOne({ email: email});

        if(Usercontact){
            console.log(" user milta hain");
        }

        if (Usercontact) {
            const cartData = await Usercontact.clearcartdata();
            await Usercontact.save();
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});



router.get("/cartdetails", async (req, res) => {
    try {
        const buyuser = await User.findOne({ email: req.headers['email'] });
        console.log(buyuser + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});



// get user is login or not
// router.get("/validuser", authenicate, async (req, res) => {
//     console.log("Request in validuser: ",req);
//     try {
//         const validuserone = await User.findOne({ _id: req.userID });
//         console.log(validuserone + "user hain home k header main pr");
//         res.status(201).json(validuserone);
//     } catch (error) {
//         console.log(error + "error for valid user");
//     }
// });

router.get("/validuser", async (req, res) => {
    // console.log("Request in validuser: ",req);
    try {
        var email = req.headers['email'];
        const validuserone = await User.findOne({ email: email });
        console.log(validuserone + "user hain home k header main pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

// router.get("/validuser", async (req, res) => {
//     console.log("Request in validuser: ",req);
//     try {
//         const validuserone = await User.findOne({ _id: req.userID });
//         console.log(validuserone + "user hain home k header main pr");
//         res.status(201).json(validuserone);
//     } catch (error) {
//         console.log(error + "error for valid user");
//     }
// });

// for userlogout

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("eccomerce", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});

// item remove ho rhi hain lekin api delete use krna batter hoga
// remove iteam from the cart

router.get("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});



module.exports = router;