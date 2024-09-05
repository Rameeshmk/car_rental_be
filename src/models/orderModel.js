import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  fueltype: { type: String, required: true },
  image: { type: String, required: true } 
});

const orderSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  rentPerDay: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  userId:{type: String, required: true},
 
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
