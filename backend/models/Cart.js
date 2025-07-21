const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    userId: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [
        {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: {type: Number, required: true, default: 1 }
        }
    ],
    // !This reference mongoose.Schema.Types.ObjectId  connect with both User and Product models.
    total: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", CartSchema);