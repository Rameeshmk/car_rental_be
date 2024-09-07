import Order from '../models/orderModel.js';

const saveOrderSummary = async (req, res) => {
  try {
    // Extract order summary data from the request body
    const {
      car,
      startDate,
      endDate,
      totalDays,
      rentPerDay,
      totalAmount,
      pickupLocation,
      userId,
      carId
    } = req.body;

    // Create a new Order instance with the received data
    const newOrder = new Order({
      car,
      startDate,
      endDate,
      totalDays,
      rentPerDay,
      totalAmount,
      pickupLocation,
      userId,
      carId
    });

    // Save the new order to the database
    await newOrder.save();

    // Send a success response with the newly created order
    res.status(201).json({ message: 'Order summary saved successfully', data: newOrder });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Failed to save order summary', error: error.message });
  }
};


const getAllorders = async (req, res) => {
  const orders = await Order.find();
  return res.send(orders);
};

// Function to get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const {userId} = req.params;

    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch orders from the database where userId matches
    const orders = await Order.find({ userId });
     
    console.log("orders",orders)

    // Return the orders
    res.status(200).json( orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};


const checkAvailability = async (req, res) => {
  try {
    const { carId } = req.params;
  

    //Find overlapping bookings
    const orders = await Order.findById({carId});
    console.log("ored",orders);
    
    if(!orders){
      return res.send({message:"no orders"});
    }
    res.status(200).json( orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};
{/*const getDealersOrders = async (req, res) => {
  try {
    const {car_id} = req.params;

    
    if (!car_id) {
      return res.status(400).json({ error: 'car ID is required' });
    }

    // Fetch orders from the database where userId matches
    const orders = await Order.find({car_id });
     
    console.log("orders",orders)

    // Return the orders
    res.status(200).json({ data:orders});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};*/}

const getDealersOrders = async (req, res) => {
  try {
    const { carId } = req.params;

    if (!carId) {
      return res.status(400).json({ error: 'Car ID is required' });
    }

    // Fetch orders where car._id matches carId
    const orders = await Order.find(carId );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this cars' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};







const orderController = {saveOrderSummary, getUserOrders,getAllorders,checkAvailability,getDealersOrders}
export default orderController

