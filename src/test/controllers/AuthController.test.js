const app = require("../../../index");
const request = require("supertest");

describe("Test sign up flow", () => {
  const user = {
    fullName: "Jane Smith",
    email: "janesmith@mail.com",
    password: "jane1234",
  };
  test("user has created account successfully", (done) => {
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toMatch(
          "User has been registered successfully."
        );
        expect(res.body.data.user).toMatchObject({
          fullName: user.fullName,
          email: user.email,
        });
        expect(res.body.data).toHaveProperty("accessToken");
        done();
      });
  });

  test("Email is already exists", (done) => {
    user.email = "john@mail.com";
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch("Email is already exists.");
        expect(res.body.data).toBeNull();
        done();
      });
  });

  test("Invalid data provided", (done) => {
    user.password = 1234;
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
        expect(res.body.message).toMatch(
          "Invalid data provided. Full Name, Email, Password should be string."
        );
        expect(res.body.data).toBeNull();
        done();
      });
  });
});

describe("Test sign in flow", () => {
  const user = {
    fullName: "Jane Smith",
    email: "janesmith12@mail.com",
    password: "jane1234",
  };
  beforeAll((done) => {
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        done();
      });
  });

  test("User has logged in successfully", (done) => {
    request(app)
      .post("/signin")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toMatch(
          "User has been signed in successfully."
        );
        expect(res.body.data.user).toMatchObject({
          fullName: user.fullName,
          email: user.email,
        });
        expect(res.body.data).toHaveProperty("accessToken");
        done();
      });
  });

  test("Email provided doesn't exists", (done) => {
    user.email = "jane123@mail.com";
    request(app)
      .post("/signin")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
        expect(res.body.data).toBeNull();
        expect(res.body.message).toMatch("Email or password is incorrect.");
        done();
      });
  });

  test("Invalid password provided", (done) => {
    user.password = "jane1223";
    request(app)
      .post("/signin")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
        expect(res.body.data).toBeNull();
        expect(res.body.message).toMatch("Email or password is incorrect.");
        done();
      });
  });
});
