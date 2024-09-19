import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const ping = (req, res) => {
  res.send("hello world");
}

const checkUser = async (req, res) => {

  try {
    const user = req.user;
  
    const findUser = await User.findOne({ email: user.data });
    if (!findUser) {
      return res.send({message:"user not found"});
    }
    return res.send("user found");

  } catch (error) {
    console.log(error);
  }
}

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName,mobile } = req.body
    console.log(email);

    const userExist = await User.findOne({ email });
    console.log(userExist);


    if (userExist) {
      return res.send("User is a already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
      mobile,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);

    res.cookie("token", token)
    res.send({message:"Signed successfully!"});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({message:"User not found"});
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    const isProduction = process.env.NODE_ENV === "production";

   {/*} res.cookie("token", token,{
    
      httpOnly:true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });*/}



    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });


    

    res.json({message:"Logged in!",token, userId: user._id,mobile:user.mobile});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
 
 
    try {
      const { id } = req.params; 
  
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Car not found" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching car by ID:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
  };





const userController = { signup, ping, signin,checkUser,getUser }

export default userController