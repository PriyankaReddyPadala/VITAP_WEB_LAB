const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Search by title
router.get("/search", async (req,res)=>{
    const title = req.query.title;

    const books = await Book.find({
        title: { $regex: title, $options: "i" }
    });

    res.json(books);
});

// Filter by category
router.get("/category/:category", async (req,res)=>{
    const books = await Book.find({
        category: req.params.category
    });

    res.json(books);
});

// Sort by price
router.get("/sort/price", async (req,res)=>{
    const books = await Book.find().sort({price:1});
    res.json(books);
});

// Sort by rating
router.get("/sort/rating", async (req,res)=>{
    const books = await Book.find().sort({rating:-1});
    res.json(books);
});

// Top rated
router.get("/top", async (req,res)=>{
    const books = await Book.find({rating:{$gte:4}}).limit(5);
    res.json(books);
});

// Pagination
router.get("/", async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const books = await Book.find()
        .skip((page-1)*limit)
        .limit(limit);

    res.json(books);
});

module.exports = router;
