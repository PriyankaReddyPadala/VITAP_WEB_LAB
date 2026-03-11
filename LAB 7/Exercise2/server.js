const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/bookFinderDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const bookRoutes = require("./routes/books");

app.use("/books", bookRoutes);

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
