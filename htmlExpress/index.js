const express = require("express");

const app = express();
app.use(express.static("public"));
// app.use(express.json());
app.use(express.urlencoded()); //to unpack the request

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/formpost", (req, res) => {
  res.send(
    `Welcome ${req.body.uname} from ${req.body.ucity} bearing ${req.body.upin} by email ${req.body.uemail}`
  );
});

app.listen(3000, () => {
  console.log("Server running Succesfully");
});
