const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const {
  GraphQLJSON,
  GraphQLDate,
  GraphQLDateTime,
  GraphQLBigInt,
  GraphQLByte
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
        strFullName: { type: GraphQLString },
        jsnLocation: { type: GraphQLJSON },
        strAddress: { type: GraphQLString },
      },
      resolve: UserResolvers.signup,
    },
    updateUser: {
      type: UserType,
      args: {
        bigUserID: { type: GraphQLBigInt },
        bigUserRoleID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        strEmail: { type: GraphQLString },
        strImgPath: { type: GraphQLString },
        strFullName: { type: GraphQLString },
        jsnLocation: { type: GraphQLJSON },
        strAddress: { type: GraphQLString },
        blnIsDeleted: { type: GraphQLBoolean },
        blnIsActive: { type: GraphQLBoolean },
      },
      resolve: UserResolvers.updateUser,
    },
    createSystem: {
      type: SystemType,
      args: {
        bigSystemID: { type: GraphQLBigInt },
        bigWSCategoryID: { type: GraphQLBigInt },
        strLogoPath: { type: GraphQLString },
        strSystemName: { type: GraphQLString },
        strSystemPathURL: { type: GraphQLString },
        strSystemAddress: { type: GraphQLString },
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
        strSystemName: { type: GraphQLString },
        strSystemPathURL: { type: GraphQLString },
        strSystemAddress: { type: GraphQLString },
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
    createOrder: {
      type: OrderType,
      args: {
        bigOrderID: { type: GraphQLBigInt },
        bigSystemID: { type: GraphQLBigInt },
        bigUserID: { type: GraphQLBigInt },
        lstProduct: { type: GraphQLJSON },
        strTotalPrice: { type: GraphQLString },
        strAddress: { type: GraphQLString },
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
        strAddress: { type: GraphQLString },
        jsnLocation: { type: GraphQLJSON },
        dtmOrderDate: { type: GraphQLDateTime },
        jsnClientInfo: { type: GraphQLJSON },
        jsnClientPayment: { type: GraphQLJSON },
        blnDelivered: { type: GraphQLBoolean },
      },
      resolve: OrderResolvers.updateOrder,
    },
  },
});

module.exports = Mutation;
