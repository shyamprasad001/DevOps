const request = require("supertest");
const app = require("./index");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/devopscse");

describe("GET /", () => {
  it("should return 200 as a status and message object", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Welcome to CSE");
  });
});

describe("GET /data/:id", () => {
  it("should return student details", async () => {
    const res = await request(app).get("/data/501");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("prasad");
  });
});

describe("POST /data/post", () => {
  it("should return success message", async () => {
    const res = await request(app).post("/data/post").send({
      _id: 516,
      name: "viki",
      branch: "CSE",
      college: "ACET College",
      marks: 76,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.message).toBe("Data Inserted");
  });
});

describe("PATCH /data/update/:id", () => {
  it("should update existing record", async () => {
    const res = await request(app).patch("/data/update/511").send({
      marks: 98,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Data Updated");
  });

  it("should return 404 if data not found", async () => {
    const res = await request(app).patch("/data/update/999").send({
      marks: 57,
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBo("Data Not Found");
  });
});

describe("DELETE /data/delete/:id", () => {
  it("should delete existing record", async () => {
    const res = await request(app).delete("/data/delete/514");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Data Deleted");
  });
  it("should return 404 if data not found", async () => {
    const res = await request(app).delete("/data/delete/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Data Not Found");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
