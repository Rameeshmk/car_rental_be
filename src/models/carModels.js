import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
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