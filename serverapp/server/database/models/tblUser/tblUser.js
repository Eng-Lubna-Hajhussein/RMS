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
        strFullName:{
            type:DataTypes.STRING(250),  
        },
        jsnLocation:{
            type:DataTypes.JSON
        },
        strAddress:{
            type:DataTypes.STRING(250)
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
  