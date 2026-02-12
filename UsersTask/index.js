const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fileupload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


mongoose
  .connect("mongodb://localhost:27017/devopscse")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const userSchema = new mongoose.Schema(
  {
    user: String,
    password: String,
    image: String,
  },
  { versionKey: false },
);

const Login = mongoose.model("login", userSchema, "logprofiles");


app.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;

    const imageFile = req.files.file;
    const ext = path.extname(imageFile.name);
    const uploadPath = path.join(__dirname, "public/uploads", `${user}${ext}`);

    await imageFile.mv(uploadPath);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Login({
      user,
      password: hashedPassword,
      image: `/uploads/${user}${ext}`,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    const userFound = await Login.findOne({ user });
    if (!userFound) {
      return res.status(404).send("User not found");
    }

    const match = await bcrypt.compare(password, userFound.password);
    if (!match) {
      return res.status(401).send("Invalid password");
    }

    res.redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await Login.find({});
    res.render("users", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
