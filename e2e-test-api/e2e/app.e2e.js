const request = require("supertest");
const createApp = require("../src/app");
const { config } = require("../src/config/config");

describe("tests for app", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  test("GET /hello", async () => {
    const response = await api.get("/hello");
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("nico");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  describe('Test for /nueva-ruta', () => {
    test('should return 401 without API key', async () => {
      const response = await request(app).get('/nueva-ruta');
      expect(response.statusCode).toBe(401);
    });

    it('should return 401 with invalid API key', async () => {
      const response = await request(app)
        .get('/nueva-ruta')
        .set('API', 'invalid-api-key');
      expect(response.statusCode).toBe(401);
    });

    it('should return 200 with valid API key', async () => {
      const response = await request(app)
        .get('/nueva-ruta')
        .set('API', config.apiKey);
      expect(response.statusCode).toBe(200);
    });
  });

  afterEach(() => {
    server.close();
  });
});
