export const createOrderQuery = (objInput) => {
    return `mutation {
        createOrder(bigOrderID:${objInput.bigOrderID},bigSystemID:${objInput.bigSystemID},bigUserID:${objInput.bigUserID},lstProduct:"""${JSON.stringify(objInput.lstProduct)}""",strTotalPrice:"${objInput.strTotalPrice}",jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}""",jsnLocation:"""${JSON.stringify(objInput.jsnLocation)}""",dtmOrderDate:${objInput.dtmOrderDate},jsnClientInfo:"""${JSON.stringify(objInput.jsnClientInfo)}""",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}""",blnDelivered:${objInput.blnDelivered}){
          bigOrderID
          bigSystemID
          bigUserID
          lstProduct
          strTotalPrice
          jsnAddress
          jsnLocation
          dtmOrderDate
          jsnClientInfo
          jsnClientPayment
          blnDelivered
        }
      }`
}