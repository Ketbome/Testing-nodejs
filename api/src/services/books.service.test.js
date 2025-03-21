const { generateManyBooks } = require("./book.fake");
const BooksService = require("./books.service");

const mockGetAll = jest.fn();

jest.mock("../lib/mongo.lib", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
  }))
);

describe("Books Service Test", () => {
  let bookService;

  beforeEach(() => {
    bookService = new BooksService();
    jest.clearAllMocks();
    mockGetAll.mockReset();
  });

  describe("getBooks test", () => {
    test("should return a list books", async () => {
      // Arrange
      const fakeBooks = generateManyBooks(10);
      const params = {};
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await bookService.getBooks(params);
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith("books", params);
    });
  });
});
