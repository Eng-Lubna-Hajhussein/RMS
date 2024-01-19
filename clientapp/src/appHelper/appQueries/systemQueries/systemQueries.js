export const createSystemQuery = (objInput) => {
  return `mutation{
    createSystem(bigSystemID:${objInput.bigSystemID},jsnSystemName:"""${JSON.stringify(objInput.jsnSystemName)}""",jsnSystemAddress:"""${JSON.stringify(objInput.jsnSystemAddress)}""",strSystemPathURL:"${objInput.strSystemPathURL}"){
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

export const updateSystem = (objInput) => {
    return `mutation {
        updateSystem (bigSystemID:${objInput.bigSystemID},bigWSCategoryID:${objInput.bigWSCategoryID},strLogoPath:"${objInput.strLogoPath}",jsnSystemName:"""${JSON.stringify(objInput.jsnSystemName)}""",strSystemPathURL:"""${JSON.stringify(objInput.strSystemPathURL)}""",jsnSystemAddress:"""${JSON.stringify(objInput.jsnSystemAddress)}""",jsnSystemContact:"""${JSON.stringify(objInput.jsnSystemContact)}""",lstSystemReviews:"""${JSON.stringify(objInput.lstSystemReviews)}""",lstSystemTeam:"""${JSON.stringify(objInput.lstSystemTeam)}""",jsnSystemSections:"""${JSON.stringify(objInput.jsnSystemSections)}""",lstContactUs:"""${JSON.stringify(objInput.lstContactUs)}"""){
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
      }`
}