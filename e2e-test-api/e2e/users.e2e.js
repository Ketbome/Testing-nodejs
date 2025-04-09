const request = require("supertest");
const createApp = require("../src/app");

describe("tests for users", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
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

  afterEach(() => {
    server.close();
  });
});
