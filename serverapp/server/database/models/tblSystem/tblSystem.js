module.exports = (sequelize, DataTypes) => {
    const tblSystem = sequelize.define(
      "tblSystem",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        bigSystemID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigWSCategoryID: {
          type: DataTypes.BIGINT,
        },
        strLogoPath:{
            type: DataTypes.STRING(250),
        },
        jsnSystemName:{
            type:DataTypes.JSON,   
        },
        strSystemPathURL:{
            type:DataTypes.STRING(250),  
        },
        jsnSystemAddress:{
            type:DataTypes.JSON,  
        },
        jsnSystemLocation:{
            type:DataTypes.JSON,  
        },
        jsnSystemContact:{
            type:DataTypes.JSON
        },
        lstSystemReviews:{
            type:DataTypes.TEXT('medium')
        },
        lstSystemTeam:{
            type:DataTypes.TEXT('medium')
        },
        jsnSystemSections:{
            type:DataTypes.JSON
        },
        lstContactUs:{
            type:DataTypes.TEXT('medium')
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
    return tblSystem;
  };
  