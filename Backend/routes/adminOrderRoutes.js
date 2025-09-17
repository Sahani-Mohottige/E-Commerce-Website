const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();

//@route GET /api/admin/orders
//@desc Get all orders (Admin only) 
//@access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({ user: { $ne: null } }).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//@route PUT /api/admin/orders/:id
//@desc update order status(Admin only)
//@access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {       
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        const newStatus = req.body.status;

        // FIX: Use 'order.status' instead of 'order.orderStatus'
        if (newStatus && newStatus !== order.status) {
            order.status = newStatus;
            order.isDelivered = newStatus === "Delivered";
            order.deliveredAt = newStatus === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            return res.json(updatedOrder);
        } else {
            return res.status(400).json({ message: "Status is the same as current" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//@route DELETE /api/admin/orders/:id
//@desc Delete an order (Admin only)
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order removed successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;