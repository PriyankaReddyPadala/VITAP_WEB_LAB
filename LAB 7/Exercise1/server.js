const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentNotesDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// routes
const noteRoutes = require("./routes/notes");
app.use("/notes", noteRoutes);

// root route fix
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
