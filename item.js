// models/schemas/item.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemInfo: { type: String },
  itemImg: { type: String },
  itemCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
