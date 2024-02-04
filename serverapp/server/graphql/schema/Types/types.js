const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const {
  GraphQLJSON,
  GraphQLDate,
  GraphQLDateTime,
  GraphQLBigInt,
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
    jsnFullName: { type: GraphQLJSON },
    jsnLocation: { type: GraphQLJSON },
    jsnAddress: { type: GraphQLJSON },
    blnIsDeleted: { type: GraphQLBoolean },
    blnIsActive: { type: GraphQLBoolean },
    dtmCreatedDate: { type: GraphQLDate },
    dtmUpdatedDate: { type: GraphQLDate },
    jsnClientPayment: { type: GraphQLJSON },
  }),
});

const SystemType = new GraphQLObjectType({
  name: "SystemType",
  fields: () => ({
    id: { type: GraphQLID },
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
    intSeatsNumber: { type: GraphQLInt },
    strTablePrice: { type: GraphQLString },
    jsnClientInfo: { type: GraphQLJSON },
    jsnClientPayment: { type: GraphQLJSON },
    dtmReservationStart: { type: GraphQLDateTime },
    dtmReservationEnd: { type: GraphQLDateTime },
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
    lstProduct: { type: GraphQLJSON },
    strTotalPrice: { type: GraphQLString },
    jsnAddress: { type: GraphQLJSON },
    jsnLocation: { type: GraphQLJSON },
    dtmOrderDate: { type: GraphQLString },
    jsnClientInfo: { type: GraphQLJSON },
    jsnClientPayment: { type: GraphQLJSON },
    blnDelivered: { type: GraphQLBoolean },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    id: { type: GraphQLID },
    bigID: { type: GraphQLBigInt },
    bigSystemID: { type: GraphQLBigInt },
    bigCategoryTypeID:{type: GraphQLBigInt},
    jsnName: { type: GraphQLJSON },
    bigParentID: { type: GraphQLBigInt },
    jsnCategoryInfo: { type: GraphQLJSON },
  }),
});

const CategoryInputType = new GraphQLInputObjectType({
  name: "CategoryInputType",
  fields: () => ({
    bigID: { type: GraphQLBigInt },
    bigSystemID: { type: GraphQLBigInt },
    bigCategoryTypeID:{type: GraphQLBigInt},
    jsnName: { type: GraphQLJSON },
    bigParentID: { type: GraphQLBigInt },
    jsnCategoryInfo: { type: GraphQLJSON },
  }),
});

module.exports = { UserType, SystemType, ReservationType, OrderType, CategoryType,CategoryInputType };
