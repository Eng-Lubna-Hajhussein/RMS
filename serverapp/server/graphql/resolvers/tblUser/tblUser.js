const { models } = require("../../../database/models");
const { tblUser } = models;
const {
  handleErrors,
  createToken,
} = require("./../../../appHelper/appFunctions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findUsers: async (_, { bigSystemID }) => {
    try {
      return await tblUser.findAll({ where: { bigSystemID: bigSystemID } });
    } catch (err) {
      throw err;
    }
  },
  login: async (_, user) => {
    try {
      const loggedUser = await tblUser.findOne({
        where: { strEmail: user.strEmail },
      });
      if (!loggedUser) {
        throw Error("incorrect email");
      }
      if (loggedUser) {
        const auth = await bcrypt.compare(
          user.strPassword,
          loggedUser.strPassword
        );
        if (!auth) {
          throw Error("incorrect password");
        }
      }
      const token = jwt.sign(
        { bigUserID: loggedUser.bigUserID },
        "somesupersecretkey",
        {
          expiresIn: "1h",
        }
      );
      return loggedUser;
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  signup: async (_, user) => {
    try {
      const userExists = await tblUser.findOne({
        where: { strEmail: user.strEmail, bigSystemID: user.bigSystemID },
      });
      if (userExists) {
        throw Error("user exists in system");
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.strPassword, salt);
      const regUser = await tblUser.create({
        ...user,
        strPassword: hashedPassword,
      });
      const token = jwt.sign(
        { bigUserID: regUser.bigUserID },
        "somesupersecretkey",
        {
          expiresIn: "1h",
        }
      );
      return regUser;
    } catch (err) {
      throw err;
    }
  },
  //UPDATE
  updateUser: async (parent, user, context) => {
    try {
      const updatedUser = await tblUser.update(
        { ...user },
        { where: { bigUserID: user.bigUserID } }
      );
      if (!updatedUser[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblUser.findOne({ where: { bigUserID: user.bigUserID } });
      }
    } catch (err) {
      throw err;
    }
  },
};
