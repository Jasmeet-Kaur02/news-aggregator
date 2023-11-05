const app = require("../../../index");
const request = require("supertest");

let token = "";
let userId = "";

beforeAll((done) => {
  const user = {
    fullName: "Jane Smith",
    email: "janesmith123@mail.com",
    password: "jane1234",
  };
  request(app)
    .post("/signup")
    .send(user)
    .end((err, res) => {
      token = res.body.data.accessToken;
      userId = res.body.data.user.id;
      if (userId) {
        request(app)
          .put(`/users/${userId}/news/preferences`)
          .set("authorization", token)
          .send({
            sources: "bbc-news",
            country: "in",
          })
          .end((err, res) => {
            done();
          });
      }
    });
});

describe("Test cases of fetch user's news preferences API", () => {
  test("User's news preferences have been fetched successfully", (done) => {
    request(app)
      .get(`/users/${userId}/news/preferences`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toMatch(
          "News preference have been fetched successfully."
        );
        done();
      });
  });

  test("User with the provided id doesn't exists", (done) => {
    request(app)
      .get(`/users/23132/news/preferences`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch(
          "User with the provided id doesn't not exists."
        );
        done();
      });
  });

  test("User is unauthorized", (done) => {
    request(app)
      .get(`/users/${userId}/news/preferences`)
      .set({ Authorization: "12334" })
      .end((err, res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch("Account is unauthorized.");
        done();
      });
  });

  // test("User's news preferences not found", (done) => {
  //   request(app)
  //     .get(`/users/${userId}/news/preferences`)
  //     .set({ Authorization: token })
  //     .end((err, res) => {
  //       expect(res.statusCode).toBe(404);
  //       expect(res.body.status).toBeFalsy();
  //       expect(res.body.message).toMatch(
  //         "News preference have been fetched successfully."
  //       );
  //       done();
  //     });
  // });
});

describe("Test cases of update user's news preferences API", () => {
  test("User's news preferences has been updated successfully", (done) => {
    request(app)
      .put(`/users/${userId}/news/preferences`)
      .set({ Authorization: token })
      .send({
        country: "us",
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toMatch(
          "News preference has been updated successfully."
        );
        done();
      });
  });

  test("Invalid data provided", (done) => {
    request(app)
      .put(`/users/${userId}/news/preferences`)
      .set({ Authorization: token })
      .send({
        country: 123,
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch(
          "Invalid data provided. Source, category and country should be string."
        );
        done();
      });
  });

  test("User with the provided id doesn't exists", (done) => {
    request(app)
      .put(`/users/23132/news/preferences`)
      .set({ Authorization: token })
      .send({
        country: "us",
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch(
          "User with the provided id doesn't not exists."
        );
        done();
      });
  });

  test("User is unauthorized", (done) => {
    request(app)
      .put(`/users/${userId}/news/preferences`)
      .set({ Authorization: "12334" })
      .send({
        country: "us",
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch("Account is unauthorized.");
        done();
      });
  });
});

describe("Test cases of fetch user's news API", () => {
  test("User's news has been fetched successfully", (done) => {
    request(app)
      .get(`/users/${userId}/news`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toMatch(
          "All news have been fetched successfully."
        );
        done();
      });
  });

  // test("User has not added their news preferences", (done) => {
  //   request(app)
  //     .get(`/users/23132/news`)
  //     .set({ Authorization: token })
  //     .end((err, res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res.body.status).toBeFalsy();
  //       expect(res.body.message).toMatch(
  //         "Cannot fetch news. Please select your preferences."
  //       );
  //       done();
  //     });
  // });

  test("User with the provided id doesn't exists", (done) => {
    request(app)
      .get(`/users/23132/news`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch(
          "User with the provided id doesn't not exists."
        );
        done();
      });
  });

  test("User is unauthorized", (done) => {
    request(app)
      .get(`/users/${userId}/news`)
      .set({ Authorization: "12334" })
      .end((err, res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch("Account is unauthorized.");
        done();
      });
  });
});
