const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

let p = mongoose.connect("mongodb://localhost:27017/devopscse");
p.then(() => {
  console.log("sucess");
});

p.catch(() => {
  console.log("connection failed");
});

let cgpaschema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    branch: String,
    email: String,
    mobile: Number,
    cgpa: Number,
  },
  { versionKey: false }
);

let cgpamodel = new mongoose.model("cgpacse", cgpaschema, "csecgpa");

app.post("/postdata", (req, res) => {
  var data = {
    _id: req.body._id,
    name: req.body.name,
    branch: req.body.branch,
    email: req.body.email,
    mobile: req.body.mobile,
    cgpa: req.body.cgpa,
  };
  const m = new cgpamodel(data);
  m.save().then((info) => {
    res.json(info);
  });
});

app.get("/cse", (req, res) => {
  cgpamodel.find().then((data) => {
    res.json(data);
  });
});
app.listen(3001, () => {
  console.log("server running sucessfully");
});
