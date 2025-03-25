const { faker } = require("@faker-js/faker");

const generateOneBook = () => ({
  _id: faker.string.uuid(),
  name: faker.lorem.words(3),
  price: faker.commerce.price(),
});

const generateManyBooks = (size) => {
  const limit = size || 10;
  return Array.from({ length: limit }, () => generateOneBook());
};

module.exports = {
  generateOneBook,
  generateManyBooks,
};
