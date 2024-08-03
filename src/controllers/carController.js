import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import Car from "../models/carModels.js";
import Dealer from "../models/dealerModel.js"

 const createCarDetails = async (req, res) => {
    try {
      console.log("hitted");
      if(!req.file) {
      return res.send("file is not visible")
      }
      cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err, "error");
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        console.log("result",result);
        
        const imageUrl = result.url;
  
        const { title, description, price, } = req.body;
  
        //const findDealer = await Dealer.findOne({ email:Dealer.email });
  
         //if (!findDealer) {
           //return res.send("please add dealer first");
        // }
  
        const createCarDetails = new Car({
          title,
          description,
          price,
          //dealer: findDealer._id,
          image: imageUrl,
        });
        
        
        const newCarDataCreated = await createCarDetails.save();
        if (!newCarDataCreated) {
          return res.send("Car data  not created");
        }
        return res.send(newCarDataCreated);
      });
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to create cars");
    }
  };

  const getCarData = async(req,res)=>{

    try {
        const carsDetails = await Car.find()
        return res.send(carsDetails)
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch cars");
        
    }
  }
  const updateCarData =async (req,res)=>{

    try {
      const {id} = req.params
      const {title,price,description} = req.body
      const updateCarData = await Car.findByIdAndUpdate(id,
        {
          title,
          price,
          description
        },
        { new: true}
      );
      return res.send(updateCarData)
    } catch (error) {
      
    }
  }

  const deleteCarData= async(req,res) =>{
    try {
      const {id} = req.params
      console.log(typeof id);
      const deleteCarData = await Car.deleteOne({id})
      if(!deleteCarData){
        return res.send("failed to delete ")
      }
      return res.send("deleted")
      
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to fetch cars");
    }
  }
    const carController = {createCarDetails,getCarData,updateCarData,deleteCarData}
  export default  carController 