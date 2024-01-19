const { models } = require("../../../database/models");
const { tblReservation } = models;

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findTables: async (_, { bigSystemID }) => {
    try {
      return await tblReservation.findAll({ where: { bigSystemID } });
    } catch (err) {
      throw err;
    }
  },
  findTable: async (_, { bigTableID }) => {
    try {
      return await tblReservation.findByPk(bigTableID);
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  createTable: async (_, table) => {
    try {
      return await tblReservation.create({ table });
    } catch (err) {
      throw err;
    }
  },
  //UPDATE
  updateTable: async (_, table) => {
    try {
      const updatedTable = await tblReservation.update(
        { ...table },
        { where: { bigTableID: table.bigTableID } }
      );
      if (!updatedTable[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblReservation.findByPk(table.bigTableID);
      }
    } catch (err) {
      throw err;
    }
  },
  //DELETE
  deleteTable: async (_, { bigTableID }) => {
    try {
      const deletedRows = await tblReservation.destroy({ where: { bigTableID } });
      if (!deletedRows) {
        throw new Error("No rows have been effected.");
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  },
};
