const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid").v4;
const users = require("../data/users.json");
const Validation = require("../utilities/Validation");
const { addUsers } = require("../helpers");

const parsedUsers = JSON.parse(JSON.stringify(users));

const signup = (req, res) => {
  const validationRes = Validation.validateSignup(req.body);
  if (validationRes.status) {
    const user = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 9),
      id: uuidv4(),
    };
    parsedUsers.push(user);
    addUsers()
      .then((addUserRes) => {
        const token = jwt.sign(user.id, process.env.API_KEY);
        console.log("add user res", addUserRes);
        return res.status(200).json({
          status: true,
          data: {
            user: user,
            accessToken: token,
          },
          message: "",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          data: null,
          message: err,
        });
      });
  } else {
    return res.status(400).json({
      status: false,
      message: validationRes.message,
      data: null,
    });
  }
};

const signin = (req, res) => {};

module.exports = { signin, signup };
