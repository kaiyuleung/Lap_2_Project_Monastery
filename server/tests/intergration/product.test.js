const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const jwt = require("jsonwebtoken");


require("dotenv").config();

const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjY3ODEyMTV9.mURhBMZXogpiq2MaVhBF25DksH2JW3KGfJKwXN_ZN_M`;

/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect(process.env.TESTING_DATABASE_URL);
  });

//   async function getAdminToken() {
//     console.log("getAdminToken: Start");
//     loginToken = "";
//     const response = await 
//                         myApp.
//                         post('/users/login').
//                         send({
//                             "username": "admin",
//                             "password": "admin"
//                         });

//     loginToken = response.body.Data.token;

//     console.log("getAdminToken: End");
//     return loginToken;
// }
  
  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET / ", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/").set('Authorization', token);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /habits ", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/habits/user").set('Authorization', token);
      expect(res.statusCode).toBe(200);
    //   expect(res.body.length).toBeGreaterThan(0);
    });
  });

//   describe("POST /users", () => {
//     it("should create a user account", async () => {
//       const res = await request(app).post("/users/").send({
//         username: "peterdgfdg",
//         password: "12345678dfg",
//       });
//       expect(res.statusCode).toBe(201);
//     //   expect(res.body.name).toBe("Product 2");
//     });
//   })
