const express = require("express"); //inporting express module
const mongoose = require("mongoose"); //importing mongoose module

const pug = require("pug"); //importing pug
const path = require("path"); //importing path module

const app = express(); 
app.use(express.json()); //working to json data

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", pug);

//connection to database(MONGODB)
let p = mongoose.connect("mongodb://localhost:27017/devopscse");
p.then(() => console.log("CONNECTION SUCCESS"));
p.catch((err) => console.log(err));

//schema
let pugschema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    branch: String,
    marks: Number,
  },
  { versionKey: false }
);

//modal
let pugmodal = new mongoose.model("csemarks", pugschema, "pugmarks");

app.post("/data", (req, res) => {
  var data = {
    _id: req.body._id,
    name: req.body.name,
    branch: req.body.branch,
    marks: req.body.marks,
  };

  const m = new pugmodal(data);
  m.save().then(() => res.send("SUCCESSFULLY INSERT"));
});

app.get("/data", (req, res) => {
  pugmodal.find().then((info) => res.send(info));
});

app.get("/data/:id", async (req, res) => {
  id = req.params.id;
  try {
    const info = await pugmodal.findById({ _id: id });
    if (!info) {
      res.status(404).json({ message: "DATA NOT FOUND" });
    } else {
      res.status(200).send(info);
    }
  } catch (err) {
    res.status(500).send("INTERNAL ERROR");
  }
});

app.patch("/data/:id", async (req, res) => {
  id = req.params.id;
  try {
    let upinfo = await pugmodal.findById({ _id: id });
    if (!upinfo) {
      res.status(404).json({ message: "Data Not found" });
    } else {
      const update1 = await pugmodal
        .findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(() => res.send("UPDATED SUCCESS"));
    }
  } catch (err) {
    res.status(500).send("ERROR");
  }
});

app.delete("/data/:id", async (req, res) => {
  id = req.params.id;
  try {
    const cse = await pugmodal.findByIdAndDelete({ _id: id });
    if (!cse) {
      res.status(404).json({ message: "Data Not fnd" });
    } else {
      res.send("DELETED SUCCESS");
    }
  } catch (err) {
    res.status(500).send("INTERNAL ERR");
  }
});

app.get("/pugdata", (req, res) => {
  let b = pugmodal.find();
  b.then((data) => res.render("sample.pug", { data }));
});

app.listen(3000, () => {
  console.log("SERVER SUCCESS");
});
