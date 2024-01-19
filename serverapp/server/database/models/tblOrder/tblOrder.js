module.exports = (sequelize, DataTypes) => {
    const tblOrder = sequelize.define(
      "tblOrder",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        bigOrderID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigSystemID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigUserID:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        lstProduct:{
            type:DataTypes.TEXT("medium"),   
        },
        strTotalPrice:{
            type:DataTypes.STRING(250),  
        },
        jsnAddress:{
            type:DataTypes.JSON,  
        },
        jsnLocation:{
            type:DataTypes.JSON,  
        },
        dtmOrderDate:{
            type:DataTypes.DATE
        },
        jsnClientInfo:{
            type:DataTypes.JSON
        },
        jsnClientPayment:{
            type:DataTypes.JSON
        },
        blnDelivered:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return tblOrder;
  };
  