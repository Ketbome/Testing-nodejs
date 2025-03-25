const request = require("supertest");
const createApp = require("../src/app");

describe("GET /hello", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3003);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("test for [GET] /", () => {
    test('should return "Hello World!"', async () => {
      // Arrange
      const expected = "Hello World!";
      // Act
      const response = await request(app).get("/");
      // Assert
      expect(response.status).toBe(200);
      expect(response.text).toBe(expected);
    });
  });
});
