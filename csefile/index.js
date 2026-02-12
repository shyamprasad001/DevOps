const express = require("express");
const fileupload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const app = express();
app.use(fileupload());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.post("/upload", (req, res, next) => {
  let imagefile = req.files.file;
  const uploadpath = path.join(__dirname + "/public/" + imagefile.name);
  imagefile.mv(uploadpath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("UPLOADED");
  });
});

app.post("/upload/rename", (req, res, next) => {
  let imagefile = req.files.file;
  const uploadpath = path.join(__dirname + "/public/" + imagefile.name);
  imagefile.mv(uploadpath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    fs.rename(uploadpath, __dirname + "/public/" + "pic.jpg", (err) => {
      if (err) {
        console.log("FAILED");
      }
    });
    res.send("UPDLOADED");
  });
});

app.get("/cse/display", (req, res) => {
  file = "/pic.jpg";
  res.render("demo", { file });
});

app.listen(3000, () => {
  console.log("SERVER RUNNING SUCCESS");
});
