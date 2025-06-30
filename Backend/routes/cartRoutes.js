const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); 

// Helper.function to get.a.cart by user Id.or guest.ID
const mongoose = require("mongoose");

const getCart = async (userId, guestId) => {
  try {
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      return await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) });
    } else if (guestId) {
      return await Cart.findOne({ guestId });
    }
  } catch (err) {
    console.error("Error in getCart:", err);
  }
  return null;
};



// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId);

        // If the cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // If the product already exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: Number(product.price),
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: Number(product.price),
                        size,
                        color,
                        quantity,
                    }
                ],
                totalPrice: Number(product.price) * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/cart
// @desc Update the quantity of a product in the cart for a guest or logged in user
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.products[productIndex].quantity = quantity;
        // Recalculate total price
        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/cart
// @desc Delete a product from the cart for a guest or logged in user
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const initialLength = cart.products.length;
        cart.products = cart.products.filter(
            (p) =>
                !(p.productId.toString() === productId &&
                  p.size === size &&
                  p.color === color)
        );

        if (cart.products.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Recalculate total price
        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route GET /api/cart
// @desc Get cart details for a guest or logged in user
// @access Public (or use 'protect' if for authenticated users only)
router.get("/", async (req, res) => {
    
    const { guestId, userId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router