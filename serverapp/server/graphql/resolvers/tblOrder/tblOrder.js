const { models } = require("../../../database/models");
const { tblOrder } = models;

module.exports = {
  // QUERY--------------------------------------------------------------------------------
  findOrders: async (_,{bigSystemID}) => {
    try {
      return await tblOrder.findAll({where:{bigSystemID}});
    } catch (err) {
      throw err;
    }
  },
  findOrder: async (_,{bigOrderID}) => {
    try {
      return await tblOrder.findByPk(bigOrderID);
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  createOrder: async (_, order) => {
    try {
      return await tblOrder.create({ order });
    } catch (err) {
      throw err;
    }
  },
  //UPDATE
  updateOrder: async (_, order) => {
    try {
      const updatedOrder = await tblOrder.update({ ...order }, { where: { bigOrderID:order.bigOrderID } });
      if (!updatedOrder[0]) {
        throw new Error("No rows have been effected.");
      } else {
        return await tblOrder.findByPk(order.bigOrderID);
      }
    } catch (err) {
      throw err;
    }
  },
};