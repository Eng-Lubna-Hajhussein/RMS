const { models } = require("../../../database/models");
const { tblUser } = models;
const {
  handleErrors,
  createToken,
} = require("./../../../appHelper/appFunctions");

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findUsers: async (_) => {
    try {
      return await tblUser.findAll();
    } catch (err) {
      throw err;
    }
  },
  login: async (_, user) => {
    try {
      const loggedUser = await tblUser.findOne({ where: { strEmail:user.strEmail } });
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
      const token = createToken(user.bigUserID);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: loggedUser });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  signup: async (_, user) => {
    try {
      const userExists = await tblUser.findOne({
        where: { strEmail: user.strEmail,bigSystemID:user.bigSystemID },
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
      const token = createToken(regUser.bigUserID);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: regUser });
    } catch (err) {
      console.log(err.message);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  },
  //UPDATE
  updateUser: async (_, user) => {
    try {
      const updatedUser = await tblUser.update({ ...user }, { where: { bigUserID:user.bigUserID } });
      if (!updatedUser[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblUser.findByPk(ID);
      }
    } catch (err) {
      throw err;
    }
  },
};
