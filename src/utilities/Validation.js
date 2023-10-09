const users = require("../data/users.json");

class Validation {
  static validateSignup = (userBody) => {
    const parsedUsers = JSON.parse(JSON.stringify(users));
    const { fullName, email, password } = userBody;

    if (fullName == null || email == null || password == null) {
      return {
        status: false,
        message: `Invalid data provided. The Full Name, Email, Password are required.`,
      };
    } else if (
      typeof fullName != "string" ||
      typeof email != "string" ||
      typeof password != "string"
    ) {
      return {
        status: false,
        message: `Invalid data provided. Full Name, Email, Password should be string.`,
      };
    } else if (parsedUsers.some((user) => user.email === email)) {
      return {
        status: false,
        message: "Email is already exists.",
      };
    }

    return {
      status: true,
      message: "Signup data is correct",
    };
  };

  static validateSignin = (userBody) => {
    const { email, password } = userBody;

    if (email == null || password == null) {
      return {
        status: false,
        message: "Invalid data provided. Email and password are required.",
      };
    } else if (typeof email != "string" || typeof password != "string") {
      return {
        status: false,
        message: "Invalid data provided. Email and password should be string.",
      };
    }
    return {
      status: true,
      message: "Signin data is correct",
    };
  };

  static validateUserPreference = () => {};

  static validateUserReadNews = () => {};

  static validateUserFavouritePreferences = () => {};
}

module.exports = Validation;
