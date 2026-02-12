const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/devopscse");

let cse1 = mongoose.Schema({
  _id: Number,
  name: String,
  branch: String,
  college: String,
  marks: Number,
});

let csem1 = new mongoose.model("cserocks", cse1, "devopsmarks");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to CSE",
  });
});

app.get("/data/:id", async (req, res) => {
  id = req.params.id;
  csem1.findOne({ _id: id }).then((data) => res.send(data));
});

app.post("/data/post", async (req, res) => {
  var newdata = {
    _id: req.body._id,
    name: req.body.name,
    branch: req.body.branch,
    college: req.body.college,
    marks: req.body.marks,
  };
  const m = new csem1(newdata);
  await m.save();
  res.status(201).json({
    message: "Data Inserted",
  });
});

app.patch("/data/update/:id", async (req, res) => {
  id = req.params.id;
  let updata = await csem1.findById({ _id: id });
  if (!updata) {
    res.status(404).json({
      message: "Data Not Found",
    });
  } else {
    await csem1.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      message: "Data Updated",
    });
  }
});

app.delete("/data/delete/:id", async (req, res) => {
  id = req.params.id;
  let deldata = await csem1.findById({ _id: id });
  if (!deldata) {
    res.status(404).json({
      message: "Data Not Found",
    });
  } else {
    await csem1.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Data Deleted",
    });
  }
});

module.exports = app;
