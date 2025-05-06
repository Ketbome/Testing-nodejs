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

  describe("POST /login", () => {
    test("should return a 200", async () => {
      // arrange
      const bodyRequest = {
        email: "admin@mail.com",
        password: "admin123",
      };

      // act
      const { statusCode, body } = await api
        .post("/api/v1/auth/login")
        .send(bodyRequest);

      // assert
      expect(statusCode).toEqual(200);
      expect(body).toHaveProperty("access_token");
      expect(body.access_token).toBeTruthy();
    });

    test("should return a 401", async () => {
      // arrange
      const bodyRequest = {
        email: "emailFake@mail.com",
        password: "123456",
      };

      // act
      const { statusCode } = await api
        .post("/api/v1/auth/login")
        .send(bodyRequest);

      // assert
      expect(statusCode).toEqual(401);
    });
  });

  afterAll(() => {
    server.close();
  });
});
