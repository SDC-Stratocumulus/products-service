const request = require("supertest");
const app = require("../server/index.js");
const pool = require("../database/index.js");

describe("GET /products ", () => {
  test("It should get 200 status code", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /products/:product_id", () => {
  test("It responds with an object of product info", async () => {
    const res = await request(app).get("/products/1");
    expect(res.body.length).toBe(1);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("category");
    expect(res.statusCode).toBe(200);
  });
});

