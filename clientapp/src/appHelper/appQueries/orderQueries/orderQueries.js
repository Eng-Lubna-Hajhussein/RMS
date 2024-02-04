export const createOrderQuery = (objInput) => {
    return `mutation {
        createOrder(bigOrderID:${objInput.bigOrderID},bigSystemID:${objInput.bigSystemID},bigUserID:${objInput.bigUserID},lstProduct:"""${JSON.stringify(objInput.lstProduct)}""",strTotalPrice:"${objInput.strTotalPrice}",jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}""",jsnLocation:"""${JSON.stringify(objInput.jsnLocation)}""",dtmOrderDate:"${objInput.dtmOrderDate}",jsnClientInfo:"""${JSON.stringify(objInput.jsnClientInfo)}""",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}""",blnDelivered:${objInput.blnDelivered}){
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

export const updateOrderQuery = (objInput) => {
  return `mutation {
    updateOrder(bigOrderID:${objInput.bigOrderID},blnDelivered:${objInput.blnDelivered}){
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

export const findUserOrdersQuery = (objInput)=>{
  return `query {
    findUserOrders(bigUserID:${objInput.bigUserID},bigSystemID:${objInput.bigSystemID}){
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

export const findUnDeliveredOrderQuery = (objInput)=>{
  return `query {
    findUnDeliveredOrder(bigUserID:${objInput.bigUserID},bigSystemID:${objInput.bigSystemID}){
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