const express = require("express");
const mongoose = require("mongoose");
const pug = require("pug");
const path = require("path");

const app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "views")); // views path to access
app.set("view engine", "pug"); //setting view engine as pug

let b = mongoose.connect("mongodb://localhost:27017/devopscse");
b.then(() => {
  console.log("CONNECTION SUCCESS");
});

b.catch((err) => {
  console.log("connection failed");
});

let marksSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    branch: String,
    college: String,
    marks: Number,
    grade: String,
  },
  { versionKey: false }
);

let marksmodel = new mongoose.model("gradescse", marksSchema, "devopsgrades");
app.post("/data", (req, res) => {
  let data = {
    _id: req.body._id,
    name: req.body.name,
    branch: req.body.branch,
    college: req.body.college,
    marks: req.body.marks,
    grade: req.body.grade,
  };

  const m = new marksmodel(data);
  m.save().then(() => res.send("SUCCESS"));
});

app.get("/pugdisplay", (req, res) => {
  let b = marksmodel.find(); //data from the database store in b
  b.then((data) => res.render("sample.pug", { data })); //data in data send to sample.pug
});

app.get("/pugdisplay/sort", (req, res) => {
  let b = marksmodel.find().sort({ marks: -1 }).limit(2);
  b.then((data) => res.render("sample.pug", { data }));
});

app.get("/pugdisplay/marks", (req, res) => {
  let b = marksmodel.find().sort({ marks: -1 }).limit(5);
  b.then((data) => res.render("sample.pug", { data }));
});

app.get("/pugdisplay/grades", (req, res) => {
  let b = marksmodel.find().sort({ grade: 1 }).limit(5);
  b.then((data) => res.render("sample.pug", { data }));
});

app.listen(3000, () => {
  console.log("Server success");
});
