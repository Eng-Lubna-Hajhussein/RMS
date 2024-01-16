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
  GraphQLJSONObject,
  GraphQLByte
} = require("graphql-scalars");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    bigUserID: { type: GraphQLBigInt },
    bigUserRoleID: { type: GraphQLBigInt },
    bigSystemID: { type: GraphQLBigInt },
    strPassword: { type: GraphQLString },
    strEmail: { type: GraphQLString },
    strImgPath: { type: GraphQLString },
    strFullName: { type: GraphQLString },
    jsnLocation: { type: GraphQLJSON },
    strAddress: { type: GraphQLString },
    blnIsDeleted: { type: GraphQLBoolean },
    blnIsActive: { type: GraphQLBoolean },
    dtmCreatedDate: { type: GraphQLDate },
    dtmUpdatedDate: { type: GraphQLDate },
  }),
});

const SystemType = new GraphQLObjectType({
  name: "SystemType",
  fields: () => ({
    id: { type: GraphQLID },
    bigSystemID: { type: GraphQLBigInt },
    bigWSCategoryID: { type: GraphQLBigInt },
    strLogoPath: { type: GraphQLString },
    strSystemName: { type: GraphQLString },
    strSystemPathURL: { type: GraphQLString },
    strSystemAddress: { type: GraphQLString },
    jsnSystemLocation: { type: GraphQLJSON },
    jsnSystemContact: { type: GraphQLJSON },
    lstSystemReviews: { type: GraphQLJSON  },
    lstSystemTeam: { type: GraphQLJSON },
    jsnSystemSections: { type: GraphQLJSON },
    lstContactUs: { type: GraphQLJSON },
    blnIsDeleted: { type: GraphQLBoolean },
    blnIsActive: { type: GraphQLBoolean },
    dtmCreatedDate: { type: GraphQLDate },
    dtmUpdatedDate: { type: GraphQLDate },
  }),
});

const ReservationType = new GraphQLObjectType({
  name: "ReservationType",
  fields: () => ({
    id: { type: GraphQLID },
    bigTableID: { type: GraphQLBigInt },
    bigSystemID: { type: GraphQLBigInt },
    bigUserID: { type: GraphQLBigInt },
    intSeatsNumber:{type:GraphQLInt},
    strTablePrice: { type: GraphQLString },
    jsnClientInfo: { type: GraphQLJSON },
    jsnClientPayment: { type: GraphQLJSON },
    dtmReservationStart:{type:GraphQLDateTime},
    dtmReservationEnd:{type:GraphQLDateTime},
    blnTableAvailable: { type: GraphQLBoolean },
  }),
});

const OrderType = new GraphQLObjectType({
    name: "OrderType",
    fields: () => ({
      id: { type: GraphQLID },
      bigOrderID: { type: GraphQLBigInt },
      bigSystemID: { type: GraphQLBigInt },
      bigUserID: { type: GraphQLBigInt },
      lstProduct:{type:GraphQLJSON},
      strTotalPrice: { type: GraphQLString },
      strAddress: { type: GraphQLString },
      jsnLocation: { type: GraphQLJSON },
      dtmOrderDate:{type:GraphQLDateTime},
      jsnClientInfo:{type:GraphQLJSON},
      jsnClientPayment:{type:GraphQLJSON},
      blnDelivered: { type: GraphQLBoolean },
    }),
  });

module.exports = { UserType, SystemType, ReservationType, OrderType };