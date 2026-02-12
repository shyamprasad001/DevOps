const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const aws = require("aws-sdk");
const fileUpload = require("express-fileupload");
const path = require("path");
//require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/devopscse")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  user: String,
  pass: String,
});

const User = mongoose.model("User", UserSchema);

const s3 = new aws.S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});

app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "public/register.html")),
);

app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "public/login.html")),
);

app.get("/upload", (req, res) =>
  res.sendFile(path.join(__dirname, "public/upload.html")),
);

app.post("/register", async (req, res) => {
  const { user, pass } = req.body;
  const hash = await bcrypt.hash(pass, 10);
  await new User({ user, pass: hash }).save();
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { user, pass } = req.body;

  const dbUser = await User.findOne({ user });
  if (!dbUser) return res.send("Invalid user");

  const ok = await bcrypt.compare(pass, dbUser.pass);
  if (!ok) return res.send("Wrong password");

  res.redirect("/upload");
});

app.post("/upload", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No file selected");
  }

  const file = req.files.file;

  const params = {
    Bucket: "aditya-cse-devops-project-n", // EXACT BUCKET NAME
    Key: `${Date.now()}_${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("S3 ERROR:", err);
      return res.status(500).send(err.message);
    }
    res.json({ imageUrl: data.Location });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
