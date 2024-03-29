const { models } = require("../../../database/models");
const { tblCategory } = models;

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findCategories: async (_, { bigSystemID }) => {
    try {
      return await tblCategory.findAll({ where: { bigSystemID } });
    } catch (err) {
      throw err;
    }
  },
  findMenuCategories: async (_, { bigSystemID }) => {
    try {
      return await tblCategory.findAll({
        where: { bigSystemID: bigSystemID, bigCategoryTypeID: 3916121742 },
      });
    } catch (err) {
      throw err;
    }
  },
  findDeliveryAddressCategories: async (_, { bigSystemID }) => {
    try {
      return await tblCategory.findAll({
        where: { bigSystemID: bigSystemID, bigCategoryTypeID: 4026111142 },
      });
    } catch (err) {
      throw err;
    }
  },
  findCategory: async (_, { bigID }) => {
    try {
      return await tblCategory.findOne({ where: { bigID: bigID } });
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  createCategory: async (_, category) => {
    try {
      return await tblCategory.create({ ...category });
    } catch (err) {
      throw err;
    }
  },
  //CREATE BULK
  bulkCategories: async (_, { categories, onDeleteIDs }) => {
    try {
      if (onDeleteIDs?.length) {
        await tblCategory.destroy({ where: { bigID: [onDeleteIDs] } });
      }
      return await tblCategory.bulkCreate(
        JSON.parse(JSON.stringify(categories)),
        {
          updateOnDuplicate: ["bigID", "jsnName","jsnCategoryInfo"],
        }
      );
      return result;
    } catch (err) {
      throw err;
    }
  },
  //UPDATE
  updateCategory: async (_, category) => {
    try {
      const updatedCategory = await tblCategory.update(
        { ...category },
        { where: { bigID: category.bigID } }
      );
      if (!updatedCategory[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblCategory.findOne({ where: { bigID: category.bigID } });
      }
    } catch (err) {
      throw err;
    }
  },
  //DELETE
  deleteCategory: async (_, { bigID }) => {
    try {
      const deletedRows = await tblCategory.destroy({ where: { bigID } });
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
