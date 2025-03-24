const { MongoClient } = require("mongodb");
const { config } = require("../../src/config");

const dbName = config.dbName;
const mongoUri = config.dbUrl;

let client = null;
let database = null;

async function connectDb() {
  client = new MongoClient(mongoUri);
  await client.connect();
  database = client.db(dbName);
  return database;
}

async function closeDb() {
  if (client) {
    await client.close();
  }
}

async function cleanDb() {
  if (database) {
    await database.dropDatabase();
  }
}

module.exports = { connectDb, closeDb, cleanDb };
