module.exports = (sequelize, DataTypes) => {
    const tblReservation = sequelize.define(
      "tblReservation",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        bigTableID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigSystemID: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        bigUserID:{
            type: DataTypes.BIGINT,
        },
        intSeatsNumber:{
            type:DataTypes.INTEGER,   
        },
        strTablePrice:{
            type:DataTypes.STRING(250),  
        },
        jsnClientInfo:{
            type:DataTypes.JSON,  
        },
        jsnClientPayment:{
            type:DataTypes.JSON,  
        },
        dtmReservationStart:{
            type:DataTypes.DATE
        },
        dtmReservationEnd:{
            type:DataTypes.DATE
        },
        blnTableAvailable:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return tblReservation;
  };
  