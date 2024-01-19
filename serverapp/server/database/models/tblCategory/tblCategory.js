module.exports = (sequelize, DataTypes) => {
    const tblCategory = sequelize.define(
      "tblCategory",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        bigID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigSystemID:{
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        jsnName: {
          type: DataTypes.JSON,
        },
        bigParentID:{
            type: DataTypes.BIGINT,
        },
        jsnCategoryInfo:{
            type:DataTypes.JSON,   
        },
        lstReviews:{
            type:DataTypes.TEXT("medium"),  
        },
        intRating:{
            type:DataTypes.INTEGER,  
        },
        blnFeatured:{
            type:DataTypes.BOOLEAN,
            defaultValue:false  
        },
        blnMostOrdered:{
            type:DataTypes.BOOLEAN,
            defaultValue:false  
        },
        blnOnSale:{
            type:DataTypes.BOOLEAN,
            defaultValue:false  
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return tblCategory;
  };
  