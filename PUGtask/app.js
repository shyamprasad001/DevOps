const express = require("express");
const mongoose = require("mongoose");
const pug = require("pug");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

let b = mongoose.connect("mongodb://localhost:27017/devopscse");
b.then(() => {
  console.log("CONNECTION SUCCESS");
});

b.catch((err) => {
  console.log("CONNECTION FAILED");
});

let skillsSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    branch: String,
    city: String,
    skills: [String],
  },
  { versionKey: false },
);

let skillsModol = new mongoose.model("skillscse", skillsSchema, "CSEskills");

app.post("/data", (req, res) => {
  let data = {
    _id: req.body._id,
    name: req.body.name,
    branch: req.body.branch,
    city: req.body.city,
    skills: req.body.skills,
  };
  const m = new skillsModol(data);
  m.save().then(() => res.send("SUCCESS"));
});

app.get("/pugdisplay", (req, res) => {
  let b = skillsModol.find();
  b.then((data) => res.render("sample.pug", { data }));
});

app.get("/pugdisplay/sort", (req, res) => {
  let b = skillsModol.find();
  b.sort((a, b) => b.skills.length - a.skills.length);
  b.then((data) => res.render("sample.pug", { data }));
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
