const request = require("supertest");

const createApp = require("../src/app");

describe("test for Books", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3003);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("test for [GET] /api/v1/books", () => {
    test('should return "Hello World!"', async () => {
      // Arrange
      // Act
      const response = await request(app).get("/api/v1/books");
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(fakeBooks.length);
    });
  });
});
