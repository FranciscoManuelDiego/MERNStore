const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/JwtAuth');
const JwtAuth = require("../middleware/JwtAuth");

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Protected route on a post method
router.post("/", JwtAuth, async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
})

router.put("/:id", JwtAuth, async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate (
            req.params.id,
            req.params.body,
            { new: true } // Return the updated document
        );
        if(!updatedProduct) return res.status(404).json({message: "Product not found"});
        res.json(updatedProduct)
    }catch{
        res.status(500).json({message: "Error updating the requested product."})
    };
});
//Inject many products on the route 
router.post('/bulk', async (req, res) => {
  try {
    await Product.insertMany(req.body); // req.body should be an array of products
    res.status(201).json({ message: 'Products inserted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;