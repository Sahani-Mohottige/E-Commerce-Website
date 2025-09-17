const express = require('express');
const Order = require('../models/Order');
const mongoose = require('mongoose'); // Add this line
const { protect } = require('../middleware/authMiddleware');            

const router = express.Router();

//@route GET /api/orders/my-orders
//@desc Get all orders for the logged-in user
//@access Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        //find order for the authenticated user
        const orders = await Order.find({ user: req.user._id }).sort({ 
            createdAt: -1 });//sort by most recent orders first
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route GET /api/orders/:id
//@desc Get order by ID for the logged-in user
//@access Private
router.get("/:id", protect, async (req, res) => {
    // console.log("Order ID requested:", req.params.id);
    try{
        const order =await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if(!order){
        return res.status(404).json({ message: 'Order not found' });
    }
    //return full order details
    res.json(order);
    
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
)

router.get('/user/:userId', async (req, res) => {
  try {
    console.log("Fetching orders for user:", req.params.userId);

    // Validate userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      console.log("Invalid userId format.");
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Query for orders with the correct ObjectId
    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(req.params.userId)
    }).sort({ createdAt: -1 });

    console.log("Orders found:", orders.length);
    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

//@route PUT /api/orders/:id/pay
//@desc Update order to paid after PayPal payment
//@access Private
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only allow the user who owns the order or an admin to update payment
        if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }

        if (order.isPaid) {
            return res.status(400).json({ message: 'Order is already paid' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = 'paid';
        order.status = 'Confirmed'; // Set to 'Confirmed' after payment

        // Optionally, save PayPal payment details from req.body if needed
        // order.paymentResult = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.payer.email_address,
        // };

        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment update failed' });
    }
});

// PATCH /api/orders/:id/status - Update order status (user or admin)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only allow the owner or admin to update
    if (String(order.user) !== String(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Only allow cancellation if not delivered/cancelled
    if (req.body.status === "Cancelled") {
      if (order.isDelivered) {
        return res.status(400).json({ message: "Cannot cancel a delivered order" });
      }
      order.status = "Cancelled";
      order.isCancelled = true;
    } else {
      order.status = req.body.status;
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;



