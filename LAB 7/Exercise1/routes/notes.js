const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");


router.post("/", async (req, res) => {

    const db = getDB();

    const note = {
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description,
        created_date: new Date()
    };

    const result = await db.collection("notes").insertOne(note);

    res.json(result);
});


router.get("/", async (req, res) => {

    const db = getDB();

    const notes = await db.collection("notes").find().toArray();

    res.json(notes);
});


router.put("/:id", async (req, res) => {

    const db = getDB();

    const id = req.params.id;

    const result = await db.collection("notes").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        }
    );

    res.json(result);
});


router.delete("/:id", async (req, res) => {

    const db = getDB();

    const id = req.params.id;

    const result = await db.collection("notes").deleteOne({
        _id: new ObjectId(id)
    });

    res.json(result);
});

module.exports = router;
