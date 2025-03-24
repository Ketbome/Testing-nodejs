const mockGetAll = jest.fn();

const request = require("supertest");

const createApp = require("../src/app");
const { generateManyBooks } = require("../src/services/book.fake");

jest.mock("../src/lib/mongo.lib", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
  }))
);

describe("test for Books", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3003);
    jest.clearAllMocks();
    mockGetAll.mockReset();
  });

  afterAll(async () => {
    await server.close();
  });

  describe("test for [GET] /api/v1/books", () => {
    test('should return "Hello World!"', async () => {
      // Arrange
      const fakeBooks = generateManyBooks(10);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const response = await request(app).get("/api/v1/books");
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(fakeBooks.length);
    });
  });
});
