import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
});

const AddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
    // Customer
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customerEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    //Order details
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
