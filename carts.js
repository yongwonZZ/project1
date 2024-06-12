// routes/carts.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, itemCount } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ itemId, itemCount }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.itemId.toString() === itemId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].itemCount += itemCount;
      } else {
        cart.items.push({ itemId, itemCount });
      }
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.itemId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
