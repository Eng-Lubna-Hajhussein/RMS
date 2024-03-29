export const createSystemQuery = (objInput) => {
  return `mutation {
    createSystem (bigSystemID:${objInput.bigSystemID},bigWSCategoryID:${
    objInput?.bigWSCategoryID || null
  },strLogoPath:${
    objInput?.strLogoPath ? '"' + objInput?.strLogoPath + '"' : null
  },jsnSystemLocation:"""${JSON.stringify(
    objInput?.jsnSystemLocation || {}
  )}""",jsnSystemName:"""${JSON.stringify(
    objInput?.jsnSystemName || {}
  )}""",strSystemPathURL:"${
    objInput?.strSystemPathURL || null
  }",jsnSystemAddress:"""${JSON.stringify(
    objInput?.jsnSystemAddress || {}
  )}""",jsnSystemContact:"""${JSON.stringify(
    objInput?.jsnSystemContact || {}
  )}""",lstSystemReviews:"""${JSON.stringify(
    objInput?.lstSystemReviews || []
  )}""",lstSystemTeam:"""${JSON.stringify(
    objInput?.lstSystemTeam || []
  )}""",jsnSystemSections:"""${JSON.stringify(
    objInput?.jsnSystemSections || {}
  )}""",lstContactUs:"""${JSON.stringify(objInput?.lstContactUs || [])}"""){
      bigSystemID
      bigWSCategoryID
      strLogoPath
      jsnSystemName
      strSystemPathURL
      jsnSystemAddress
      jsnSystemLocation
      jsnSystemContact
      lstSystemReviews
      lstSystemTeam
      jsnSystemSections
      lstContactUs
    }
  }`;
};

export const updateSystemQuery = (objInput) => {
  return `mutation {
      updateSystem (bigSystemID:${objInput.bigSystemID},bigWSCategoryID:${
    objInput?.bigWSCategoryID || null
  },strLogoPath:${
    objInput?.strLogoPath ? '"' + objInput?.strLogoPath + '"' : null
  },jsnSystemLocation:"""${JSON.stringify(
    objInput?.jsnSystemLocation || {}
  )}""",jsnSystemName:"""${JSON.stringify(
    objInput?.jsnSystemName || {}
  )}""",strSystemPathURL:"${
    objInput?.strSystemPathURL || null
  }",jsnSystemAddress:"""${JSON.stringify(
    objInput?.jsnSystemAddress || {}
  )}""",jsnSystemContact:"""${JSON.stringify(
    objInput?.jsnSystemContact || {}
  )}""",lstSystemReviews:"""${JSON.stringify(
    objInput?.lstSystemReviews || []
  )}""",lstSystemTeam:"""${JSON.stringify(
    objInput?.lstSystemTeam || []
  )}""",jsnSystemSections:"""${JSON.stringify(
    objInput?.jsnSystemSections || {}
  )}""",lstContactUs:"""${JSON.stringify(objInput?.lstContactUs || [])}"""){
        bigSystemID
        bigWSCategoryID
        strLogoPath
        jsnSystemName
        strSystemPathURL
        jsnSystemAddress
        jsnSystemLocation
        jsnSystemContact
        lstSystemReviews
        lstSystemTeam
        jsnSystemSections
        lstContactUs
      }
    }`;
};

export const updateSystemReviewsQuery = (objInput) => {
  return `mutation{
    updateSystem(bigSystemID:${
      objInput.bigSystemID
    },lstSystemReviews:"""${JSON.stringify(objInput.lstSystemReviews)}"""){
      lstSystemReviews
    }
  }`;
};

export const systemUploadLogoQuery = (objInput) => {
  return `mutation {
    updateSystem(bigSystemID:${objInput.bigSystemID},strLogoPath:"${objInput.strLogoPath}"){
      strLogoPath
    }
  }`;
};



export const findSystemQuery = (bigSystemID) => {
  return `query {
    findSystem(bigSystemID:${bigSystemID}){
      bigSystemID
      bigWSCategoryID
      strLogoPath
      jsnSystemName
      strSystemPathURL
      jsnSystemAddress
      jsnSystemLocation
      jsnSystemContact
      lstSystemReviews
      lstSystemTeam
      jsnSystemSections
      lstContactUs
    }
  }`;
};

export const findSystemsQuery = () => {
  return `query {
    findSystems{
      bigSystemID
      strLogoPath
      strSystemPathURL
      jsnSystemName
    }
  }`;
};

export const systemUpdateSettingsQuery = (objInput)=>{
  return `mutation {
    updateSystem(bigSystemID:${objInput.bigSystemID},jsnSystemAddress:"""${JSON.stringify(objInput.jsnSystemAddress)}"""){
      jsnSystemAddress
    }
  }`
}