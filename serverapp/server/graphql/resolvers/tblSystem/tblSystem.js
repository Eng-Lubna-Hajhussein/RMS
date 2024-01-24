const { models } = require("../../../database/models");
const { tblSystem } = models;

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findSystem: async (_,{bigSystemID}) => {
    try {
      return await tblSystem.findOne({where:{bigSystemID:bigSystemID}});
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  createSystem: async (_, system) => {
    console.log({system})
    try {
      return await tblSystem.create({ ...system });
    } catch (err) {
      throw err;
    }
  },
  //UPDATE
  updateSystem: async (_, system) => {
    try {
      const updatedSystem = await tblSystem.update({ ...system }, { where: { bigSystemID:system.bigSystemID } });
      if (!updatedSystem[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblSystem.findOne({where:{bigSystemID:system.bigSystemID}});
      }
    } catch (err) {
      throw err;
    }
  },
};