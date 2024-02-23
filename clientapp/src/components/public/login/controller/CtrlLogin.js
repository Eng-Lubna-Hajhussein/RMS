import { objRoleID } from "appHelper/appVariables";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlLogin = {
  installData: async ({ systemID, setSystemInfo, setIsLoading }) => {
    try {
      setIsLoading(true);
      const system = await findSystem(systemID);
      if (system) {
        const jsnSystemContact = JSON.parse(system.jsnSystemContact || {});
        const strLogoPath = system?.strLogoPath;
        setSystemInfo({
          jsnSystemContact: jsnSystemContact,
          strLogoPath: strLogoPath,
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  },
  handelSubmit: async ({ appState, appDispatch, navigate, formData }) => {
    try {
      const objInputUser = {
        strEmail: formData.email,
        strPassword: formData.password,
      };
      const loggedUser = await login(objInputUser);
      if (!loggedUser?.bigUserID) {
        alert("logged in failed");
        return;
      }
      const loggedSystem = await findSystem(loggedUser?.bigSystemID);
      if (!loggedSystem?.bigSystemID) {
        alert("logged in failed");
        return;
      }
      if (loggedUser?.blnIsDeleted) {
        alert("your account has been deleted or banned");
        return;
      }
      if (loggedUser?.blnIsActive) {
        alert("your account has been deactivated");
        return;
      }
      if (loggedUser?.bigUserID && loggedSystem?.bigSystemID) {
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
          strImgPath: loggedUser.strImgPath,
          blnIsDeleted: loggedUser.blnIsDeleted,
          blnIsActive: loggedUser.blnIsActive,
          dtmCreatedDate: loggedUser.dtmCreatedDate,
          dtmUpdatedDate: loggedUser.dtmUpdatedDate,
        };
        appState.systemInfo.bigSystemID = loggedSystem.bigSystemID;
        appState.systemInfo.jsnSystemName = JSON.parse(
          loggedSystem.jsnSystemName
        );
        appState.systemInfo.strSystemPathURL = loggedSystem.strSystemPathURL;
        appState.systemInfo.jsnSystemAddress = JSON.parse(
          loggedSystem.jsnSystemAddress
        );
        appState.systemInfo.jsnSystemLocation = JSON.parse(
          loggedSystem.jsnSystemLocation
        );
        appState.systemInfo.jsnSystemContact = JSON.parse(
          loggedSystem.jsnSystemContact
        );
        appState.systemInfo.lstSystemTeam = JSON.parse(
          loggedSystem.lstSystemTeam
        );
        appState.systemInfo.jsnSystemSections = JSON.parse(
          loggedSystem.jsnSystemSections
        );
        appState.systemInfo.lstSystemReviews = JSON.parse(
          loggedSystem.lstSystemReviews
        );
        appState.systemInfo.strLogoPath = loggedSystem.strLogoPath;
        appDispatch({ ...appState });
        if (appState.systemInfo.bigSystemID && appState.userInfo.bigUserID) {
          if (appState.userInfo.bigUserRoleID === objRoleID["Admin"]) {
            navigate(`/admin/${loggedSystem.strSystemPathURL}`);
          }
          if (appState.userInfo.bigUserRoleID === objRoleID["Customer"]) {
            navigate(`/customer/${loggedSystem.strSystemPathURL}`);
          }
        }
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
