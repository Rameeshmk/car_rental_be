import Dealer from "../models/dealerModel.js";
import bcrypt from "bcrypt";
import adminToken from "../utils/adminToken.js";
import Car from "../models/carModels.js";





const checkAdmins = async (req, res) => {
  try {
    const dealer = req.user;

    
    if (!dealer || !dealer.data) {
      return res.status(400).send("Invalid dealer data");
    }

    
    const findDealer = await Dealer.findOne({ email: dealer.data });

    if (!findDealer) {
      return res.status(404).send("Dealer not found");
    }

    
    if (findDealer.role === 'admin') {
      return res.send("Admin found");
    } else {
      return res.status(403).send("Dealer is not an admin");
    }

  } catch (error) {
    console.error("Error checking admin:", error);
    if (!res.headersSent) {
      return res.status(500).send("Internal server error");
    }
  }
}




const singin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    
    const dealer = await Dealer.findOne({ email });

    if (!dealer) {
      return res.status(404).send({message:"User not found"});
    }

    
    const matchPassword = await bcrypt.compare(password, dealer.hashPassword);

    if (!matchPassword) {
      return res.status(401).send({message:"Password does not match"});
    }

    
    const token = adminToken(dealer);
    const  isProduction = process.env.NODE_ENV ==="production";
   
    const userRole = dealer.role; 
    console.log(userRole);

    
    res.cookie("token", token, { 
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true ,
      secure: isProduction,
      sameSite: isProduction ? "None": "Lax",
    
    });
    return res.json({ message: "Logged in!", token, userRole, dealerId: dealer._id });

  } catch (error) {
    console.error("Error", error);
    
    if (!res.headersSent) {
      return res.status(500).send("Internal Server Error");
    }
  }
};







const checkAdmin = async (req, res) => {

  try {
    const dealer = req.user
    const findDealer = await Dealer.findOne({ email: dealer.data });

    if (!findDealer) {
      return res.send("dealer not found");
    }
    return res.send("found");
  }
  catch (error) {
    console.log(error);
  }
}


const singup = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password, name } = req.body;
    const dealerExist = await Dealer.findOne({ email });
    if (dealerExist) {
      return res.send("Dealer is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newDealer = new Dealer({
      name,
      email,
      hashPassword,
      role: "dealer",
    });
    const newDealerCreated = await newDealer.save();

    if (!newDealerCreated) {
      return res.send("dealer is not created");
    }

    const token = adminToken(newDealerCreated);
    res.cookie("token", token);
    res.json({ message: "signned in!", token });
  } catch (error) {
    console.log(error, "Something wrong");
  }
};

//const singin = async (req, res) => {
  //try {
    //const body = req.body;
    //const { email, password } = body;
    //console.log(body);

    //const dealer = await Dealer.findOne({ email });

    //if (!dealer) {
      //return res.send("dealer is not found");
    //}

    //const matchPassword = await bcrypt.compare(
      //password,
      //dealer.hashPassword
   // );

    //console.log(matchPassword, "matchpassword");
    //if (!matchPassword) {
      //return res.send("password is not match");
    //}

    //const token = adminToken(dealer);

    //res.cookie("token", token);
    //res.json({ message: "Logged in!", token });
  //} catch (error) {
    //console.error("Error", error);
    //res.status(500).send("Internal Server Error");
  //}
//};
const getAllDealers = async (req, res) => {
  const dealers = await Dealer.find();
  return res.send(dealers);
};

const removeDealer = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const dealer = await Dealer.find({ _id: id });
  if (!dealer) {
    return res.send("dealer is not exist");
  }
  const remove = await Dealer.deleteOne({ _id: id });

  if (!remove) {
    return res.send("failed to remove");
  }

  return res.send("removed sucessfully");
};


const getDealersCars = async (req, res) => {
  try {
    const {dealerId} = req.params;

    
    if (!dealerId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

   
    const orders = await Car.find({ dealerId });
     
    console.log("orders",orders)

    // Return the orders
    res.status(200).json( orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};




const dealerController = { singin, singup, getAllDealers, removeDealer,checkAdmin,checkAdmins,getDealersCars }

export default dealerController