import mongoose from "mongoose";


const dealerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["dealer", "admin"],
    },
    hashPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    cars: [{ type: mongoose.Types.ObjectId, ref: "cars" }],
  },
  { timestamps: true }
);

const Dealer = mongoose.model("Dealer", dealerSchema);

export default Dealer;