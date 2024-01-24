const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const {
  GraphQLBigInt,
} = require("graphql-scalars");
const {
  UserType,
  SystemType,
  ReservationType,
  OrderType,
  CategoryType
} = require("../Types/types");
const UserResolvers = require("./../../resolvers/tblUser/tblUser");
const SystemResolvers = require("./../../resolvers/tblSystem/tblSystem");
const ReservationResolvers = require("./../../resolvers/tblReservation/tblReservation");
const OrderResolvers = require("./../../resolvers/tblOrder/tblOrder");
const CategoryResolvers = require("./../../resolvers/tblCategory/tblCategory");

const RootQuery = new GraphQLObjectType({
  name: "ViewTypeOfQueries",
  fields: {
    findUsers: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      args: {
        bigSystemID: { type: GraphQLBigInt },
      },
      resolve: UserResolvers.findUsers,
    },
    login: {
      type: UserType,
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
    findCategories: {
      type: new GraphQLList(new GraphQLNonNull(CategoryType)),
      args: {
        bigSystemID: { type: GraphQLBigInt },
      },
      resolve: CategoryResolvers.findCategories,
    },
    findCategory: {
      type: new GraphQLNonNull(CategoryType),
      args: {
        bigID: { type: GraphQLBigInt },
      },
      resolve: CategoryResolvers.findCategory,
    },
  },
});

module.exports = RootQuery;
