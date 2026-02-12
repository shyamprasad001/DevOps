require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");
console.log("Project", process.env.PROJECT_ID);
console.log("KEY_FILE", process.env.KEY_FILE);

const app = express();
const cseclient = new PubSub({
  PROJECT_ID: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILE,
});
app.use(express.json());
app.post("/publish", async (req, res) => {
  const { message } = req.body;
  const topicname = "ydptest";
  try {
    const databuffer = Buffer.from(message);
    await cseclient.topic(topicname).publish(databuffer);
    res.status(200).send("message published");
  } catch (error) {
    console.log("Error");
    res.status(500).send("ERROR WHILE PUBLISHING");
  }
});
app.post("/subscribe", async (req, res) => {
  const subname = "ydptestsub";
  const subscription = cseclient.subscription(subname);
  const csemessage = (message) => {
    console.log("Received Message");
    console.log(`data:${message.data}`);
    message.ack();
  };
  subscription.on("message", csemessage);
  res.status(200).send("listening messages");
});
app.listen(4000, () => console.log("Server Running "));
