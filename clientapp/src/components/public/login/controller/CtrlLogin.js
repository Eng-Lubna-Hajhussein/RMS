import { objRoleID } from "appHelper/appVariables";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlLogin = {
  handelSubmit: async ({
    appState,
    appDispatch,
    navigate,
    isLoading,
    setIsLoading,
    formData,
  }) => {
    try {
      const objInputUser = {
        strEmail: formData.email,
        strPassword: formData.password,
      };
      const loggedUser = await login(objInputUser);
      console.log({loggedUser})
      if(!loggedUser?.bigUserID){
        alert("logged in failed");
        return;
      }
      const loggedSystem = await findSystem(loggedUser?.bigSystemID);
      console.log({loggedSystem})
      if(!loggedSystem?.bigSystemID){
        alert("logged in failed");
        return;
      }
      if(loggedUser?.bigUserID&&loggedSystem?.bigSystemID){
          appState.clientInfo.blnUserLogin = true;
          appState.userInfo = {
            ...appState.userInfo,
            bigUserID: loggedUser.bigUserID,
            bigUserRoleID: loggedUser.bigUserRoleID,
            jsnAddress: JSON.parse(loggedUser.jsnAddress),
            jsnClientPayment: JSON.parse(loggedUser.jsnClientPayment),
            jsnFullName: JSON.parse(loggedUser.jsnFullName),
            strEmail: loggedUser.strEmail,
            jsnLocation: JSON.parse(loggedUser.jsnLocation),
          };
          appState.systemInfo.bigSystemID = loggedSystem.bigSystemID;
          appState.systemInfo.jsnSystemName = JSON.parse(loggedSystem.jsnSystemName);
          appState.systemInfo.strSystemPathURL = loggedSystem.strSystemPathURL;
          appState.systemInfo.jsnSystemAddress = JSON.parse(loggedSystem.jsnSystemAddress);
          appState.systemInfo.jsnSystemLocation = JSON.parse(loggedSystem.jsnSystemLocation);
          appState.systemInfo.jsnSystemContact = JSON.parse(loggedSystem.jsnSystemContact);
          appState.systemInfo.lstSystemTeam = JSON.parse(loggedSystem.lstSystemTeam);
          appState.systemInfo.jsnSystemSections = JSON.parse(loggedSystem.jsnSystemSections);
          appState.systemInfo.lstSystemReviews = JSON.parse(loggedSystem.lstSystemReviews);
          appState.systemInfo.strLogoPath =loggedSystem.strLogoPath;
          appDispatch({...appState});
          if(appState.systemInfo.bigSystemID&&appState.userInfo.bigUserID){
            if(appState.userInfo.bigUserRoleID===objRoleID['Admin']){
              navigate(`/admin/${loggedSystem.strSystemPathURL}`);
            }
            if(appState.userInfo.bigUserRoleID===objRoleID['Customer']){
              navigate(`/customer/${loggedSystem.strSystemPathURL}`);
            }
          }
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
