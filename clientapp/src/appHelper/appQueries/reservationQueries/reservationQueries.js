export const findTablesQuery = (bigSystemID)=>{
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
      }`
}

export const findAvailableTablesQuery = (bigSystemID)=>{
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
      }`
}

export const reserveTableQuery = (objInput)=>{
  return `mutation {
    updateTable(bigTableID:${objInput.bigTableID},bigUserID:${objInput.bigUserID},jsnClientInfo:"""${JSON.stringify(objInput.jsnClientInfo)}""",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}""",dtmReservationStart:"${objInput.dtmReservationStart}",dtmReservationEnd:"${objInput.dtmReservationEnd}",blnTableAvailable:${objInput.blnTableAvailable}){
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