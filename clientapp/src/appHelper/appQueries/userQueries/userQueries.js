export const signupQuery = (objInput) => {
  return `mutation {
     signup(bigUserID:${objInput.bigUserID},bigUserRoleID:${objInput.bigUserRoleID},strEmail:"${objInput.strEmail}",strPassword:"${objInput.strPassword}",bigSystemID:"${objInput.bigSystemID}",jsnFullName:"""${JSON.stringify(objInput.jsnFullName)}""",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}""",jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}""",jsnLocation:"""${JSON.stringify(objInput.jsnLocation)}"""){
           bigUserID
           bigUserRoleID
           bigSystemID
           strPassword
           strEmail
           jsnClientPayment
           strImgPath
           jsnFullName
           jsnLocation
           jsnAddress
   }
   }`;
};

export const loginQuery = (objInput)=>{
   return `query{
      login(strEmail:"${objInput.strEmail}",strPassword:"${objInput.strPassword}"){
            bigUserID
            bigUserRoleID
            bigSystemID
            strPassword
            strEmail
            strImgPath
            jsnClientPayment
            jsnFullName
            jsnLocation
            jsnAddress
      }
    }`
}

export const updateUserQuery = (objInput) => {
   return `mutation{
      updateUser(bigUserID:${objInput.bigUserID},strImgPath:"${objInput.strImgPath}",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}""",jsnFullName:"""${JSON.stringify(objInput.jsnFullName)}""",jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}"""){
            bigUserID
            bigUserRoleID
            bigSystemID
            strPassword
            strEmail
            strImgPath
            jsnClientPayment
            jsnFullName
            jsnLocation
            jsnAddress
      }
    }`
}