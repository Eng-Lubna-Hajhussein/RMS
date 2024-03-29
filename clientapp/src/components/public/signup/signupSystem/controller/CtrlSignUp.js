import { formateDBStr, generateRandomID } from "appHelper/appFunctions";
import {
  CITIES,
  COUNTRIES,
  Demo_jsnSystemInfo,
  Demo_objSystemLocation,
  objRoleID,
} from "appHelper/appVariables";
import { createSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { signup } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlSignUp = {
  handelSubmit: async ({
    appState,
    appDispatch,
    navigate,
    isLoading,
    setIsLoading,
    formData,
    address,
    mapLocation,
  }) => {
    try {
      const bigSystemID = generateRandomID(10);
      const jsnSystemAddress = {
        jsnCountry: COUNTRIES[address.countryIndex],
        jsnCity:
          CITIES[COUNTRIES[address.countryIndex]["eng"]][address.cityIndex],
      };
      const jsnSystemLocation = await mapLocation.getLocation();
      //#region demo customize system location for testing
      const demoTestingSystemLocation = Demo_objSystemLocation;
      //#endregion
      const jsnSystemName = {
        eng: formData.restaurantNameEng,
        arb: formData.restaurantNameArb,
      };
      const strSystemPathURL =
        formateDBStr(jsnSystemName["eng"]).replace(" ", "-") +
        "/" +
        bigSystemID;

      const objInputSystem = {
        bigSystemID: bigSystemID,
        jsnSystemAddress: jsnSystemAddress,
        jsnSystemName: jsnSystemName,
        strSystemPathURL: strSystemPathURL,
        jsnSystemLocation: demoTestingSystemLocation,
        jsnSystemContact: Demo_jsnSystemInfo.jsnSystemContact,
        lstSystemTeam: Demo_jsnSystemInfo.lstSystemTeam,
        jsnSystemSections: {...Demo_jsnSystemInfo.jsnSystemSections,
          jsnOwnerSection:{...Demo_jsnSystemInfo.jsnSystemSections.jsnOwnerSection,
            jsnOwnerName:{
              eng: formData.ownerNameEng,
              arb: formData.ownerNameArb,
            }
          }
        },
        strLogoPath: Demo_jsnSystemInfo.strLogoPath,
      };
      const regSystem = await createSystem(objInputSystem);
      console.log({ regSystem });
      const bigUserID = generateRandomID(10);
      const jsnFullName = {
        eng: formData.ownerNameEng,
        arb: formData.ownerNameArb,
      };
      const jsnClientPayment = {
        strCardNumber: formData.cardNumber,
        strCVV: formData.cvv,
        strNameOnCard: formData.cardName,
      };
      const jsnUserLocation = await mapLocation.getLocation();
      const objInputUser = {
        bigUserID: bigUserID,
        bigSystemID: regSystem.bigSystemID,
        bigUserRoleID: objRoleID["Admin"],
        jsnFullName: jsnFullName,
        jsnClientPayment: jsnClientPayment,
        strEmail: formData.email,
        strPassword: formData.password,
        jsnLocation: jsnUserLocation,
        jsnAddress: jsnSystemAddress,
      };
      const regUser = await signup(objInputUser);
      if (!regUser?.bigUserID) {
        alert("Registration failed");
        return;
      }
      if (regUser?.bigUserID && regSystem?.bigSystemID) {
        appState.clientInfo.blnUserLogin = true;
        appState.userInfo = {
          bigUserID: regUser.bigUserID,
          bigUserRoleID: regUser.bigUserRoleID,
          jsnAddress: JSON.parse(regUser.jsnAddress),
          jsnClientPayment: JSON.parse(regUser.jsnClientPayment),
          jsnFullName: JSON.parse(regUser.jsnFullName),
          strEmail: regUser.strEmail,
          jsnLocation: JSON.parse(regUser.jsnLocation),
          blnIsDeleted: regUser.blnIsDeleted,
          blnIsActive: regUser.blnIsActive,
          dtmCreatedDate: regUser.dtmCreatedDate,
          dtmUpdatedDate: regUser.dtmUpdatedDate,
        };
        appState.systemInfo.bigSystemID = regSystem.bigSystemID;
        appState.systemInfo.jsnSystemName = JSON.parse(regSystem.jsnSystemName);
        appState.systemInfo.strSystemPathURL = regSystem.strSystemPathURL;
        appState.systemInfo.jsnSystemAddress = JSON.parse(
          regSystem.jsnSystemAddress
        );
        appState.systemInfo.jsnSystemLocation = JSON.parse(
          regSystem.jsnSystemLocation
        );
        appState.systemInfo.jsnSystemContact = JSON.parse(
          regSystem.jsnSystemContact
        );
        appState.systemInfo.lstSystemTeam = JSON.parse(regSystem.lstSystemTeam);
        appState.systemInfo.jsnSystemSections = JSON.parse(
          regSystem.jsnSystemSections
        );
        appState.systemInfo.lstSystemReviews = JSON.parse(
          regSystem.lstSystemReviews
        );
        appState.systemInfo.strLogoPath = regSystem.strLogoPath;
        appDispatch({ ...appState });
        if (appState.systemInfo.bigSystemID && appState.userInfo.bigUserID) {
          // navigate(`/${regSystem.strSystemPathURL}`);
          if (appState.userInfo.bigUserRoleID === objRoleID["Admin"]) {
            navigate(`/admin/${regSystem.strSystemPathURL}`);
          }
          if (appState.userInfo.bigUserRoleID === objRoleID["Customer"]) {
            navigate(`/customer/${regSystem.strSystemPathURL}`);
          }
        }
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
