const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid").v4;
const users = require("../data/users.json");
const Validation = require("../utilities/Validation");
const { addUsers } = require("../helpers");

const parsedUsers = JSON.parse(JSON.stringify(users));

const signup = async (req, res) => {
  const validationRes = Validation.validateSignup(req.body);
  if (validationRes.status) {
    const user = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 9),
      id: uuidv4(),
    };
    parsedUsers.push(user);
    try {
      await addUsers(parsedUsers);
      const token = jwt.sign(user.id, process.env.API_KEY);
      return res.status(201).json({
        status: true,
        data: {
          user: user,
          accessToken: token,
        },
        message: "User has been registered successfully.",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        data: null,
        message: err,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: validationRes.message,
      data: null,
    });
  }
};

const signin = (req, res) => {
  const validationRes = Validation.validateSignin(req.body);
  const { email, password } = req.body;

  if (validationRes.status) {
    const registeredUser = parsedUsers.filter((user) => user.email === email);

    if (
      registeredUser.length > 0 &&
      bcrypt.compareSync(password, registeredUser[0].password)
    ) {
      const token = jwt.sign(registeredUser[0].id, process.env.API_KEY);
      return res.status(200).json({
        status: true,
        message: "User has been signed in successfully.",
        data: {
          user: registeredUser,
          accessToken: token,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Email or password is incorrect.",
        data: null,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      data: null,
      message: validationRes.message,
    });
  }
};

module.exports = { signin, signup };
