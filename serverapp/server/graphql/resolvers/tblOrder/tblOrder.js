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
  findUnDeliveredOrder: async (_,{bigUserID,bigSystemID}) => {
    try {
      return await tblOrder.findOne({where:{bigUserID:bigUserID,bigSystemID:bigSystemID,blnDelivered:false}});
    } catch (err) {
      throw err;
    }
  },
  findUserOrders: async (_,{bigUserID,bigSystemID}) => {
    try {
      return await tblOrder.findAll({where:{bigUserID:bigUserID,bigSystemID:bigSystemID}});
    } catch (err) {
      throw err;
    }
  },
  // MUTATION--------------------------------------------------------------------------------
  //CREATE
  createOrder: async (_, order) => {
    try {
      return await tblOrder.create({ ...order });
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
        return await tblOrder.findOne({where:{bigOrderID:order.bigOrderID}});
      }
    } catch (err) {
      throw err;
    }
  },
     //DELETE
     deleteOrder: async (_, {bigOrderID}) => {
      try {
        const deletedRows = await tblOrder.destroy({where:{bigOrderID}});
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