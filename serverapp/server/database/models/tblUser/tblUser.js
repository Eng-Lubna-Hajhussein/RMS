module.exports = (sequelize, DataTypes) => {
    const tblUser = sequelize.define(
      "tblUser",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        bigUserID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigUserRoleID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigSystemID:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        strPassword:{
            type:DataTypes.STRING(250),   
        },
        strEmail:{
            type:DataTypes.STRING(250),  
        },
        strImgPath:{
            type:DataTypes.STRING(250),  
        },
        jsnFullName:{
            type:DataTypes.JSON,  
        },
        jsnLocation:{
            type:DataTypes.JSON
        },
        jsnAddress:{
            type:DataTypes.JSON,
        },
        jsnClientPayment:{
          type:DataTypes.JSON,
        },
        blnIsDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        blnIsActive:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        },
        dtmCreatedDate:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        dtmUpdatedDate:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return tblUser;
  };
  