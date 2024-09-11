import express from 'express';
import Dealer from '../models/dealerModel.js';
import authenticateAdmin from '../middlewares/adminMiddleware.js';


// Fetch notifications
const notification = async (req, res) => {
  try {
    const dealers = await Dealer.find({ isApproved: false });
    const notifications = dealers.map(dealer => ({
      dealerId: dealer._id,
      message: `New dealer signup pending approval: ${dealer.name}`
    }));
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications", error);
    res.status(500).send("Internal Server Error");
  }
};

// Approve dealer
const approve = async (req, res) => {
  try {
    const { dealerId } = req.params;
    const dealer = await Dealer.find(dealerId);

    if (!dealer) {
      return res.status(404).send("Dealer not found");
    }

    dealer.isApproved = true;
    await dealer.save();

    res.send("Dealer approved");
  } catch (error) {
    console.error("Error approving dealer", error);
    res.status(500).send("Internal Server Error");
  }
};

const notificationsController = {notification,approve }

export default notificationsController
