const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/:userId", async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId});
    res.json(cart);
});

router.post("/:userId", async (req, res) => {
    const cart = await Cart.findOne({userId : req.params.userId})
    if(!cart){
        //Create a new cart with the first item inserted.
        cart = await Cart.create({
            userId: req.params.userId,
            items: [{productId, quanity}]
        });
    }else{
        // Add item to an existing cart or update the quantity.
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        // The findIndex() method in JavaScript returns the index of the first element of the array only if the callback function passed to the findIndex method returns true.
        if(itemIndex > -1){ // This means that when findIndex is false returns -1, if so it won't go on this conditional
            cart.items[itemIndex].quantity += quantity;
        } else { //So if it doesn't exist, create it.
            cart.items.push({productId , quantity});
        }
        await cart.save();
    }
    res.json(cart);
});

router.put('/:userId', async (req , res) => {
    const {productId, quantity} = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId});
    !cart ? res.status(404).json({message: "Cart not found"}) : res.status(200).json({message: "Cart found"})
    const item = cart.products.find(item => item.productId.toString() === productId)
    if(item) {
        item.quantity = quantity;
        await cart.save();
        res.json(cart);
    }else{
        res.status(404).json({message: "Product not in the cart."})
    }
});

router.delete('/:userId/:productId', async (req , res) => {
    let cart = await Cart.findOne({ userId: req.params.userId});
    if(!cart)return res.status(404).json({message: "Cart not found"});
    cart.products = cart.products.filter(item => item.productId.toString() !== req.params.productId);
    // It will remove the product from the array only if the itemProduct matches the productId
    await cart.save();
    res.json(cart);
});

module.exports = router;
