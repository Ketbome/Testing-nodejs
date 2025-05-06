const request = require("supertest");
const createApp = require("../src/app");

describe("tests for users", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe("GET /users/{id}", () => {
    test("should return a 200 and a user", async () => {
      // arrange
      const id = "1";

      // act
      const { statusCode, body } = await api.get(`/api/v1/users/${id}`);

      // assert
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(1);
      expect(body).toHaveProperty("password");
      expect(body.email).toEqual("admin@mail.com");
    });
  });

  describe("POST /users", () => {
    test("should return a 400 bas request", async () => {
      // arrange
      const bodyRequest = {
        email: "nicolas@mail.com",
        password: "----",
      };

      // act
      const { statusCode, body } = await api
        .post("/api/v1/users")
        .send(bodyRequest);

      // assert
      expect(statusCode).toEqual(400);
      expect(body.message).toMatch(/password/);
    });
  });

  afterAll(() => {
    server.close();
  });
});
