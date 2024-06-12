// models/cart/schemas.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      itemCount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
