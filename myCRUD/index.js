const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let students = JSON.parse(fs.readFileSync("./myCRUD/data/students.json"));

app.get("/cse/get/all", (req, res) => {
  res.json(students);
});

app.get("/cse/getbyid/:id", (req, res) => {
  let id = req.params.id;
  let data = students.find((el) => el.id == id);
  if (!data) {
    res.send("NOT DATA FOUND WITH ID");
  } else {
    res.json(data);
  }
});

app.post("/cse/post", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  fs.writeFile(
    "./myCRUD/data/students.json",
    JSON.stringify(students),
    (err) => {
      res.send("DATA_INSERT");
    }
  );
});

app.delete("/cse/deletebyid/:id", (req, res) => {
  let id = req.params.id;
  let data = students.find((el) => el.id == id);
  if (!data) {
    res.send("No Data found with id");
  } else {
    let index = students.indexOf(data);
    students.splice(index, 1);
    fs.writeFile(
      "./myCRUD/data/students.json",
      JSON.stringify(students),
      (err) => {
        res.send("DATA_DELETED");
      }
    );
  }
});

app.patch("/cse/updatebyid/:id", (req, res) => {
  let id = req.params.id;
  let stupdate = students.find((el) => el.id == id);
  if (!stupdate) {
    res.send("Not data found with id");
  } else {
    let index = students.indexOf(stupdate);
    Object.assign(stupdate, req.body);
    fs.writeFile(
      "./myCRUD/data/students.json",
      JSON.stringify(students),
      (err) => {
        res.send("DATA_UPDATED");
      }
    );
  }
});

app.listen(3000, (req, res) => {
  console.log("Server Running Succesfully!");
});
