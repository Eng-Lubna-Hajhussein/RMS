export const findTablesQuery = (bigSystemID) => {
  return `query {
        findTables(bigSystemID:${bigSystemID}){
          bigTableID
          bigSystemID
          bigUserID
          intSeatsNumber
          strTablePrice
          jsnClientInfo
          jsnClientPayment
          dtmReservationStart
          dtmReservationEnd
          blnTableAvailable
        }
      }`;
};

export const findAvailableTablesQuery = (bigSystemID) => {
  return `query {
        findAvailableTables(bigSystemID:${bigSystemID}){
          bigTableID
          bigSystemID
          bigUserID
          intSeatsNumber
          strTablePrice
          jsnClientInfo
          jsnClientPayment
          dtmReservationStart
          dtmReservationEnd
          blnTableAvailable
        }
      }`;
};

export const reserveTableQuery = (objInput) => {
  return `mutation {
    updateTable(bigTableID:${objInput.bigTableID},bigUserID:${
    objInput.bigUserID
  },jsnClientInfo:"""${JSON.stringify(
    objInput.jsnClientInfo
  )}""",jsnClientPayment:"""${JSON.stringify(
    objInput.jsnClientPayment
  )}""",dtmReservationStart:"${
    objInput.dtmReservationStart
  }",dtmReservationEnd:"${objInput.dtmReservationEnd}",blnTableAvailable:${
    objInput.blnTableAvailable
  }){
      bigTableID
      bigSystemID
      bigUserID
      intSeatsNumber
      strTablePrice
      jsnClientInfo
      jsnClientPayment
      dtmReservationStart
      dtmReservationEnd
      blnTableAvailable
    }
  }`;
};

export const createTableQuery = (objInput) => {
  return `mutation{
    createTable(bigTableID:${objInput.bigTableID},bigSystemID:${objInput.bigSystemID},intSeatsNumber:${objInput.intSeatsNumber},strTablePrice:"${objInput.strTablePrice}"){
      bigTableID
      bigSystemID
      bigUserID
      intSeatsNumber
      strTablePrice
      jsnClientInfo
      jsnClientPayment
      dtmReservationStart
      dtmReservationEnd
      blnTableAvailable
    }
  }`;
};

export const deleteTableQuery = (bigTableID)=>{
  return `mutation {
    deleteTable(bigTableID:${bigTableID})
  }`
};

export const freeTableQuery = (bigTableID)=>{
  return `mutation {
    updateTable(bigTableID:${bigTableID},bigUserID:null,jsnClientInfo:null,jsnClientPayment:null,dtmReservationStart:null,dtmReservationEnd:null,blnTableAvailable:true){
      bigTableID
      bigSystemID
      bigUserID
      intSeatsNumber
      strTablePrice
      jsnClientInfo
      jsnClientPayment
      dtmReservationStart
      dtmReservationEnd
      blnTableAvailable
    }
  }`
}

export const updateTableQuery = (objInput)=>{
  return `mutation {
    updateTable(bigTableID:${objInput.bigTableID},intSeatsNumber:${objInput.intSeatsNumber},strTablePrice:"${objInput.strTablePrice}"){
      bigTableID
      bigSystemID
      bigUserID
      intSeatsNumber
      strTablePrice
      jsnClientInfo
      jsnClientPayment
      dtmReservationStart
      dtmReservationEnd
      blnTableAvailable
    }
  }`
}

export const findUserTablesQuery = (objInput)=>{
  return `query{
    findUserTables(bigSystemID:${objInput.bigSystemID},bigUserID:${objInput.bigUserID}){
      bigTableID
      bigSystemID
      bigUserID
      intSeatsNumber
      strTablePrice
      jsnClientInfo
      jsnClientPayment
      dtmReservationStart
      dtmReservationEnd
      blnTableAvailable
    }
  }`
}