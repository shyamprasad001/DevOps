const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/deletebyid", (req, res) => {
  res.sendFile(__dirname + "/public/delete.html");
});

app.get("/updateid", (req, res) => {
  res.sendFile(__dirname + "/public/update.html");
});

app.post("/formpost", (req, res) => {
  let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
  data.push(req.body);
  fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), (err) => {
    res.send("SUCCESSFULLY ADDED");
  });
});

app.post("/formdelete", (req, res) => {
  let id = req.body.sid;
  let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
  let index = data.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("No data with that id");
  } else {
    data.splice(index, 1);
    fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), (err) => {
      if (err) {
        res.send("Error deleting data");
      } else {
        res.send("DATA DELETED");
      }
    });
  }
});

app.post("/formupdate", (req, res) => {
  let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
  let stupdate = data.find((el) => el.id == req.body.sid);
  if (!stupdate) {
    res.send("Not data found with id");
  } else {
    let index = data.indexOf(stupdate);
    data[index].name = req.body.sname;
    data[index].city = req.body.scity;
    fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), (err) => {
      res.send("DATA_UPDATED");
    });
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
