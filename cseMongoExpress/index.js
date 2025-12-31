const express = require("express");
const mongoose = require("mongoose");

const app = express();

let cse = mongoose.connect("mongodb://localhost:27017/devopscse");
cse.then(() => {
  console.log("COnnection SUcces");
});
cse.catch(() => {
  console.log("Connection Failed");
});

let cseSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  city: String,
});

let modalcse = new mongoose.model("csedata", cseSchema);

app.get("/cse/get", (req, res) => {
  modalcse.find().then((data) => {
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log("Serer Running");
});
