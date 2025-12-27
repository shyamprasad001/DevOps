const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let students = JSON.parse(
  fs.readFileSync("./taskCRUD/localdata/students.json")
);

app.get("/cse/get/all", (req, res) => {
  res.json(students);
});

app.get("/cse/getbyid/:id", (req, res) => {
  let id = req.params.id;
  let data = students.find((el) => el.id == id);
  if (!data) {
    res.send("NO DATA FOUND");
  } else {
    res.json(data);
  }
});

app.post("/cse/post", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  fs.writeFile(
    "./taskCRUD/localdata/students.json",
    JSON.stringify(students),
    (err) => {
      res.send("DATA_INSERTED");
    }
  );
});

app.listen(3000, (req, res) => {
  console.log("Server Running Successfully!");
});
