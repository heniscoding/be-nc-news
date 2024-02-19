const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("getTopics", () => {
  it("should return a 200 status code", () => {
    return request(app).get("/api/topics").expect(200);
  });
  it("should return an array of topic objects, each of which should have the following properties: slug, description", () => {
    return request(app)
      .get("/api/topics")
      .then((res) => {
        expect(res.body.topics).toHaveLength(3);
        res.body.topics.forEach((topic, index) => {
          expect(typeof res.body.topics[index]).toBe("object");
          expect(topic).hasOwnProperty("slug");
          expect(topic).hasOwnProperty("description");
        });
      });
  });
});

describe("getAPI", () => {
  it("should return an object describing all of the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const testObject = endpoints;
        const endpointResult = res.body;
        expect(testObject).toEqual(endpointResult);
      });
  });
});

describe("getArticleByID", () => {
  it("should return the correct article based on the id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const testArticle = res.body.article;
        const expectedArticle = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(testArticle).toEqual(expectedArticle);
      });
  });
  it("should return a 404 error if no such id exists", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((res) => {
        expect(res.body.error).toBe("Not found");
      });
  });
  it("should return a 400 error if invalid ID passed", () => {
    return request(app)
      .get("/api/articles/hello")
      .expect(400)
      .then((res) => {
        expect(res.body.error).toBe("Bad request");
      });
  });
});
