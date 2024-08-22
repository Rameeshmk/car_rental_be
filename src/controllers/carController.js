
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
  
        const { name, make, price,model,fueltype,capacity,dealerEmail } = req.body;
  
        const findDealer = await Dealer.findOne({ email:dealerEmail });
  
        if (!findDealer) {
           return res.send("please add dealer first");
         }
  
        const createCarDetails = new Car({
          name,
          make,
          price,
          model,
          fueltype,
          capacity,
          dealer: findDealer._id,
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



  const findCarById = async (req, res) => {
    try {
      const { id } = req.params; 
  
  
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ success: false, message: "Car not found" });
      }
  
      return res.status(200).json(car);
    } catch (error) {
      console.error("Error fetching car by ID:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch car" });
    }
  };
  


  
const getCarsData = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 6; 

    const carsDetails = await Car.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCars = await Car.countDocuments(); 

    return res.json({
      cars: carsDetails,
      totalPages: Math.ceil(totalCars / limit), 
      currentPage: page
    });
  } catch (error) {
    console.log("something went wrong", error);
    if (!res.headersSent) {
      return res.status(500).send("Failed to fetch cars");
    }
  }
};




 const getCarData = async (req,res)=>{
    
      try {
        const carsDetails = await Car.find();
       return res.json(carsDetails);
    } catch (error) {
        console.log("something went wrong", error);
        if (!res.headersSent) {
          return res.status(500).send("Failed to fetch cars");
        }  
    }
  };



  const updateCarData = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from params
      const { name, price, make, model, fueltype, capacity } = req.body; // Extract data from body
  
      console.log("Request Body:", req.body);
      console.log("Request Params ID:", id);
  
      // Find and update the car document in the database
      const updatedCarData = await Car.findByIdAndUpdate(
        id, // Find by ID
        { name, price, make, model, fueltype, capacity }, // Data to update
        { new: true, runValidators: true } // Return updated document and run validators
      );
  
      console.log("Updated Car Data:", updatedCarData);
  
      if (!updatedCarData) {
        return res.status(404).send("Car not found");
      }
  
      return res.status(200).json(updatedCarData); // Send updated document
    } catch (error) {
      console.error("Error updating car data:", error);
      return res.status(500).send("Internal server error");
    }
  };
  

  //const updateCarData =async (req,res)=>{

   // try {
     // const {id} = req.params.id;
     // const {name,price,make,model,fueltype,capacity} = req.body;
     // const updateCarData = await Car.findOneAndUpdate({_id:id},
       // {
       //   name,
       //   price,
       //   make,
       //   model,
       //   fueltype,
       //   capacity
       // },
      //  { new: true}
     // );
     // console.log(updateCarData);
     // if (!updateCarData) {
      //  return res.send("Course is not updated");
      //}
     // return res.send(updateCarData)
   // } catch (error) {
      
   // }
 // }

  //const deleteCarData= async(req,res) =>{
    //try {
      //const {id} = req.params
      //console.log(req.params)
      //console.log(typeof id);
      //const deleteCarData = await Car.deleteOne({id})
      //if(!deleteCarData){
        //return res.send("failed to delete ")
     // }
      //return res.send("deleted")
      
    //} catch (error) {
     // console.log("something went wrong", error);
      //res.send("failed to fetch cars");
   // }
  //}

  const deleteCarData = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const cars = await Car.find({ _id: id });
    if (!cars) {
      return res.send("car i not exist");
    }
    const remove = await Car.deleteOne({ _id: id });
  
    if (!remove) {
      return res.send("failed to delete");
    }
  
    return res.send("removed sucessfully");
  };




    const carController = {createCarDetails,getCarData,updateCarData,getCarsData,deleteCarData,findCarById}
    
  export default  carController 