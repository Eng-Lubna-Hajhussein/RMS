export const signupQuery = (objInput) => {
  return `mutation {
     signup(bigUserID:${objInput.bigUserID},bigUserRoleID:${
    objInput.bigUserRoleID
  },strEmail:"${objInput.strEmail}",strPassword:"${
    objInput.strPassword
  }",bigSystemID:"${objInput.bigSystemID}",jsnFullName:"""${JSON.stringify(
    objInput.jsnFullName
  )}""",jsnClientPayment:"""${JSON.stringify(
    objInput.jsnClientPayment
  )}""",jsnAddress:"""${JSON.stringify(
    objInput.jsnAddress
  )}""",jsnLocation:"""${JSON.stringify(objInput.jsnLocation)}"""){
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
           blnIsDeleted
            blnIsActive
            dtmCreatedDate
            dtmUpdatedDate
   }
   }`;
};

export const loginQuery = (objInput) => {
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
            blnIsDeleted
            blnIsActive
            dtmCreatedDate
            dtmUpdatedDate
      }
    }`;
};

export const updateUserQuery = (objInput) => {
  return `mutation{
      updateUser(bigUserID:${objInput.bigUserID},strImgPath:"${
    objInput.strImgPath
  }",jsnClientPayment:"""${JSON.stringify(
    objInput.jsnClientPayment
  )}""",jsnFullName:"""${JSON.stringify(
    objInput.jsnFullName
  )}""",jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}"""){
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
            blnIsDeleted
            blnIsActive
            dtmCreatedDate
            dtmUpdatedDate
      }
    }`;
};

export const customerUpdateSettingsQuery = (objInput) => {
  return `mutation{
      updateUser(bigUserID:${
        objInput.bigUserID
      },jsnClientPayment:"""${JSON.stringify(
    objInput.jsnClientPayment
  )}""",jsnFullName:"""${JSON.stringify(
    objInput.jsnFullName
  )}""",jsnAddress:"""${JSON.stringify(
    objInput.jsnAddress
  )}""",dtmUpdatedDate:"${objInput.dtmUpdatedDate}"){
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
            blnIsDeleted
            blnIsActive
            dtmCreatedDate
            dtmUpdatedDate
      }
    }`;
};

export const adminUpdateSettingsQuery = (objInput) => {
  return `mutation {
    updateUser(bigUserID:${objInput.bigUserID},jsnAddress:"""${JSON.stringify(objInput.jsnAddress)}""",jsnClientPayment:"""${JSON.stringify(objInput.jsnClientPayment)}"""){
      jsnAddress
      jsnClientPayment
    }
  }`;
};

export const customerDeleteAccountQuery = (bigUserID) => {
  const dtmUpdatedDate =  new Date().toISOString();
  return `mutation{
      updateUser(bigUserID:${bigUserID},blnIsDeleted:true){
         blnIsDeleted
         dtmUpdatedDate
      }
    }`;
};

export const banCustomerQuery = (bigUserID) => {
  const dtmUpdatedDate =  new Date().toISOString();
  return `mutation{
      updateUser(bigUserID:${bigUserID},blnIsDeleted:true,dtmUpdatedDate:"${dtmUpdatedDate}"){
         blnIsDeleted
         dtmUpdatedDate
      }
    }`;
};

export const unBanCustomerQuery = (bigUserID) => {
  const dtmUpdatedDate =  new Date().toISOString();
  return `mutation{
      updateUser(bigUserID:${bigUserID},blnIsDeleted:false,dtmUpdatedDate:"${dtmUpdatedDate}"){
         blnIsDeleted
         dtmUpdatedDate
      }
    }`;
};

export const deactivateCustomerQuery = (bigUserID) => {
  const dtmUpdatedDate =  new Date().toISOString();
  return `mutation{
      updateUser(bigUserID:${bigUserID},blnIsActive:false,dtmUpdatedDate:"${dtmUpdatedDate}"){
        blnIsActive
        dtmUpdatedDate
      }
    }`;
};

export const activateCustomerQuery = (bigUserID) => {
  const dtmUpdatedDate =  new Date().toISOString();
  return `mutation{
      updateUser(bigUserID:${bigUserID},blnIsActive:true,dtmUpdatedDate:"${dtmUpdatedDate}"){
        blnIsActive
      }
    }`;
};

export const userUploadImgQuery = (objInput) => {
  return `mutation{
      updateUser(bigUserID:${objInput.bigUserID},strImgPath:"${objInput.strImgPath}"){
        strImgPath
      }
    }`;
};

export const findUsersQuery = (bigSystemID) => {
  return `query{
      findUsers(bigSystemID:${bigSystemID}){
        bigUserID
        bigUserRoleID
        bigSystemID
        strEmail
        strImgPath
        jsnFullName
        jsnLocation
        jsnAddress
        blnIsDeleted
        blnIsActive
        jsnClientPayment
        dtmCreatedDate
        dtmUpdatedDate
      }
    }`;
};

export const findUserPublicQuery= (bigUserID)=>{
  return `query{
    findUser(bigUserID:${bigUserID}){
      bigUserID
      bigUserRoleID
      strImgPath
      jsnFullName
      jsnLocation
      jsnAddress
    }
  }`
}