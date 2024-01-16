const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = require("graphql");
const {
  GraphQLJSON,
  GraphQLDate,
  GraphQLDateTime,
  GraphQLBigInt,
} = require("graphql-scalars");
const {
  UserType,
  SystemType,
  ReservationType,
  OrderType,
} = require("../Types/types");
const UserResolvers = require("./../../resolvers/tblUser/tblUser");
const SystemResolvers = require("./../../resolvers/tblSystem/tblSystem");
const ReservationResolvers = require("./../../resolvers/tblReservation/tblReservation");
const OrderResolvers = require("./../../resolvers/tblOrder/tblOrder");

const RootQuery = new GraphQLObjectType({
  name: "ViewTypeOfQueries",
  fields: {
    findUsers: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: UserResolvers.findUsers,
    },
    login: {
      type: new GraphQLNonNull(UserType),
      args: {
        strPassword: { type: GraphQLString },
        strEmail: { type: GraphQLString },
      },
      resolve: UserResolvers.login,
    },
    findSystem: {
      type: new GraphQLNonNull(SystemType),
      args: {
        bigSystemID: { type: GraphQLBigInt },
      },
      resolve: SystemResolvers.findSystem,
    },
    findTables: {
      type: new GraphQLList(new GraphQLNonNull(ReservationType)),
      args: {
        bigSystemID: { type: GraphQLBigInt },
      },
      resolve: ReservationResolvers.findTables,
    },
    findTable: {
      type: new GraphQLNonNull(ReservationType),
      args: {
        bigTableID: { type: GraphQLBigInt },
      },
      resolve: ReservationResolvers.findTable,
    },
    findOrders: {
      type: new GraphQLList(new GraphQLNonNull(OrderType)),
      args: {
        bigSystemID: { type: GraphQLBigInt },
      },
      resolve: OrderResolvers.findOrders,
    },
    findOrder: {
      type: new GraphQLNonNull(OrderType),
      args: {
        bigOrderID: { type: GraphQLBigInt },
      },
      resolve: OrderResolvers.findOrder,
    },
  },
});

module.exports = RootQuery;
