const request = require("supertest");

const createApp = require("../src/app");
const { connectDb, closeDb, cleanDb } = require("./utils/db");
const { getBooksMock } = require("./utils/mocks");

describe("test for Books", () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    database = await connectDb();
  });

  afterAll(async () => {
    await server.close();
    await cleanDb();
    await closeDb();
  });

  afterEach(async () => {
    // Limpiar la colección de libros después de cada prueba
    await database.collection("books").deleteMany({});
  });

  describe("test for [GET] /api/v1/books", () => {
    test("should return all books", async () => {
      // Arrange
      const booksMock = getBooksMock();
      const seedData = await database.collection("books").insertMany(booksMock);

      // Act
      const response = await request(app).get("/api/v1/books");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(seedData.insertedCount);
      expect(response.body[0].name).toEqual(booksMock[0].name);
    });

    test("should return empty array when no books exist", async () => {
      // Act
      const response = await request(app).get("/api/v1/books");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
