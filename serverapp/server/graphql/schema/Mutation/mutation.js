const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} = require("graphql");
const {
  GraphQLJSON,
  GraphQLDateTime,
  GraphQLBigInt,
} = require("graphql-scalars");
const {
  UserType,
  SystemType,
  ReservationType,
  OrderType,
  CategoryType,
  CategoryInputType,
} = require("../Types/types");
const UserResolvers = require("./../../resolvers/tblUser/tblUser");
const SystemResolvers = require("./../../resolvers/tblSystem/tblSystem");
const ReservationResolvers = require("./../../resolvers/tblReservation/tblReservation");
const OrderResolvers = require("./../../resolvers/tblOrder/tblOrder");
const CategoryResolvers = require("./../../resolvers/tblCategory/tblCategory");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        bigUserID: { type: GraphQLBigInt },
        bigUserRoleID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        strPassword: { type: GraphQLString },
        strEmail: { type: GraphQLString },
        strImgPath: { type: GraphQLString },
        jsnFullName: { type: GraphQLJSON },
        jsnLocation: { type: GraphQLJSON },
        jsnAddress: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
      },
      resolve: UserResolvers.signup,
    },
    updateUser: {
      type: UserType,
      args: {
        bigUserID: { type: GraphQLBigInt },
        bigUserRoleID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        strPassword: { type: GraphQLString },
        strEmail: { type: GraphQLString },
        strImgPath: { type: GraphQLString },
        jsnFullName: { type: GraphQLJSON },
        jsnLocation: { type: GraphQLJSON },
        jsnAddress: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        blnIsDeleted: { type: GraphQLBoolean },
        blnIsActive: { type: GraphQLBoolean },
        dtmCreatedDate: { type: GraphQLDateTime },
        dtmUpdatedDate: { type: GraphQLDateTime },
      },
      resolve: UserResolvers.updateUser,
    },
    createSystem: {
      type: SystemType,
      args: {
        bigSystemID: { type: GraphQLBigInt },
        bigWSCategoryID: { type: GraphQLBigInt },
        strLogoPath: { type: GraphQLString },
        jsnSystemName: { type: GraphQLJSON },
        strSystemPathURL: { type: GraphQLString },
        jsnSystemAddress: { type: GraphQLJSON },
        jsnSystemLocation: { type: GraphQLJSON },
        jsnSystemContact: { type: GraphQLJSON },
        lstSystemReviews: { type: GraphQLJSON },
        lstSystemTeam: { type: GraphQLJSON },
        jsnSystemSections: { type: GraphQLJSON },
        lstContactUs: { type: GraphQLJSON },
      },
      resolve: SystemResolvers.createSystem,
    },
    updateSystem: {
      type: SystemType,
      args: {
        bigSystemID: { type: GraphQLBigInt },
        bigWSCategoryID: { type: GraphQLBigInt },
        strLogoPath: { type: GraphQLString },
        jsnSystemName: { type: GraphQLJSON },
        strSystemPathURL: { type: GraphQLString },
        jsnSystemAddress: { type: GraphQLJSON },
        jsnSystemLocation: { type: GraphQLJSON },
        jsnSystemContact: { type: GraphQLJSON },
        lstSystemReviews: { type: GraphQLJSON },
        lstSystemTeam: { type: GraphQLJSON },
        jsnSystemSections: { type: GraphQLJSON },
        lstContactUs: { type: GraphQLJSON },
        blnIsDeleted: { type: GraphQLBoolean },
        blnIsActive: { type: GraphQLBoolean },
      },
      resolve: SystemResolvers.updateSystem,
    },
    createTable: {
      type: ReservationType,
      args: {
        bigTableID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigUserID: { type: GraphQLBigInt },
        intSeatsNumber: { type: GraphQLInt },
        strTablePrice: { type: GraphQLString },
        jsnClientInfo: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        dtmReservationStart: { type: GraphQLDateTime },
        dtmReservationEnd: { type: GraphQLDateTime },
        blnTableAvailable: { type: GraphQLBoolean },
      },
      resolve: ReservationResolvers.createTable,
    },
    updateTable: {
      type: ReservationType,
      args: {
        bigTableID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigUserID: { type: GraphQLBigInt },
        intSeatsNumber: { type: GraphQLInt },
        strTablePrice: { type: GraphQLString },
        jsnClientInfo: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        dtmReservationStart: { type: GraphQLDateTime },
        dtmReservationEnd: { type: GraphQLDateTime },
        blnTableAvailable: { type: GraphQLBoolean },
      },
      resolve: ReservationResolvers.updateTable,
    },
    deleteTable: {
      type: GraphQLBoolean,
      args: {
        bigTableID: { type: GraphQLBigInt },
      },
      resolve: ReservationResolvers.deleteTable,
    },
    createOrder: {
      type: OrderType,
      args: {
        bigOrderID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigUserID: { type: GraphQLBigInt },
        lstProduct: { type: GraphQLJSON },
        strTotalPrice: { type: GraphQLString },
        jsnAddress: { type: GraphQLJSON },
        jsnLocation: { type: GraphQLJSON },
        dtmOrderDate: { type: GraphQLDateTime },
        jsnClientInfo: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        blnDelivered: { type: GraphQLBoolean },
      },
      resolve: OrderResolvers.createOrder,
    },
    updateOrder: {
      type: OrderType,
      args: {
        bigOrderID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigUserID: { type: GraphQLBigInt },
        lstProduct: { type: GraphQLJSON },
        strTotalPrice: { type: GraphQLString },
        jsnAddress: { type: GraphQLJSON },
        jsnLocation: { type: GraphQLJSON },
        dtmOrderDate: { type: GraphQLDateTime },
        jsnClientInfo: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        blnDelivered: { type: GraphQLBoolean },
      },
      resolve: OrderResolvers.updateOrder,
    },
    deleteOrder: {
      type: OrderType,
      args: {
        bigOrderID: { type: GraphQLBigInt },
      },
      resolve: OrderResolvers.deleteOrder,
    },
    createCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
        bigID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigCategoryTypeID:{type: GraphQLBigInt},
        jsnName: { type: GraphQLJSON },
        bigParentID: { type: GraphQLBigInt },
        jsnCategoryInfo: { type: GraphQLJSON },
      },
      resolve: CategoryResolvers.createCategory,
    },
    bulkCategories:{
      type: new GraphQLList(CategoryType),
      args: {
        categories:{type:new GraphQLList(CategoryInputType)},
        onDeleteIDs:{type:new GraphQLList(GraphQLBigInt)}
      },
      resolve: CategoryResolvers.bulkCategories,
    },
    updateCategory: {
      type: CategoryType,
      args: {
        bigID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigCategoryTypeID:{type: GraphQLBigInt},
        jsnName: { type: GraphQLJSON },
        bigParentID: { type: GraphQLBigInt },
        jsnCategoryInfo: { type: GraphQLJSON },
      },
      resolve: CategoryResolvers.updateCategory,
    },
    deleteCategory: {
      type: GraphQLBoolean,
      args: {
        bigID: { type: GraphQLBigInt },
      },
      resolve: CategoryResolvers.deleteCategory,
    },
  },
});

module.exports = Mutation;
