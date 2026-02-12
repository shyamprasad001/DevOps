const express = require("express");
const aws = require("aws-sdk"); //npm install aws-sdk in terminal
const fs = require("fs");

const app = express();

//aws connection (step 1): we need two keys access key and secret key (only valid for 3 hrs and unique to your personal account) = workbench/details/show

const id = ""; //accesskey from /workbench/details/show
const secret = "";

//for connection to aws s3
const cseS3 = new aws.S3({
  accessKeyId: id,
  secretAccessKey: secret,
});

//to upload any file to the bucket
const uploadfile = (filename) => {
  const file = fs.readFileSync(filename);
  const params = {
    Bucket: "aditya-cse1212",
    Key: "23MH1A05I8.jpg",
    Body: file,
  };
  cseS3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log("FILE UPLOADED SUCCESSFULLY");
  });
};
uploadfile("D:/DevOps/csefile/public/shyam.jpeg");

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
