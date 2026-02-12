const express = require("express");
const stylus = require("stylus");
const path = require("path"); // for resolve the path ambiguty

const app = express();
app.use(
  stylus.middleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
  }),
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
