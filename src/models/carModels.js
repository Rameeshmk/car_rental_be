import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    
    },
    make: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    model: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    fueltype: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    dealer: [{ type: mongoose.Types.ObjectId, ref: "dealer" }],
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;