const request = require("supertest");
const createApp = require("./../src/app");
const { models } = require("./../src/db/sequelize");

describe("tests for /users path", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe("GET /users/{id}", () => {
    test("should return a user", async () => {
      const user = await models.User.findByPk("1");
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toEqual(user.email);
    });
  });

  describe("POST /users", () => {
    let newUserId;
    test("should return a 400 Bad request with password invalid", async () => {
      const inputData = {
        email: "nicolas@mail.com",
        password: "-----",
      };
      const { statusCode, body } = await api
        .post("/api/v1/users")
        .send(inputData);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test("should return a 400 Bad request with email invalid", async () => {
      const inputData = {
        email: "----",
        password: "najshash1212as",
      };
      const { statusCode, body } = await api
        .post("/api/v1/users")
        .send(inputData);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });

    test("should return a new user", async () => {
      const inputData = {
        email: "pepit@mail.com",
        password: "pepito123",
      };
      const { statusCode, body } = await api
        .post("/api/v1/users")
        .send(inputData);
      expect(statusCode).toBe(201);
      // check DB
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual("admin");
      expect(user.email).toEqual(inputData.email);

      newUserId = body.id;
    });

    test("should return a delete user", async () => {
      const { statusCode, body } = await api.delete(
        "/api/v1/users/" + newUserId
      );

      // Assert
      expect(statusCode).toBe(201);
      expect(parseInt(body.id)).toBe(newUserId);
    });
  });

  describe("PUT /users", () => {
    // tests for /users
  });

  afterAll(() => {
    server.close();
  });
});
