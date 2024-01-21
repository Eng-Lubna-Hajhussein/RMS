import { formateDBStr, generateRandomID } from "appHelper/appFunctions";
import { CITIES, COUNTRIES, objRoleID } from "appHelper/appVariables";
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
      jsnSystemLocation.lat = jsnSystemLocation.lat * 2;
      jsnSystemLocation.long = jsnSystemLocation.long * 2;
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
        jsnSystemLocation: jsnSystemLocation,
      };
      const regSystem = await createSystem(objInputSystem);
      const bigUserID = generateRandomID(10);
      const jsnFullName = {
        eng: formData.ownerNameEng,
        arb: formData.ownerNameArb,
      };
      const jsnClientPayment = {
        strCardNumber: formData.cardNumber,
        strCVV: formData.cvv,
        strNmeOnCard: formData.cardName,
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
      appState.clientInfo.blnUserLogin = true;
      appState.userInfo = {
        bigUserID: regUser.bigUserID,
        bigUserRoleID: regUser.bigUserRoleID,
        jsnAddress: JSON.parse(regUser.jsnAddress),
        jsnClientPayment: JSON.parse(regUser.jsnClientPayment),
        jsnFullName: JSON.parse(regUser.jsnFullName),
        strEmail: regUser.strEmail,
        jsnLocation: JSON.parse(regUser.jsnLocation),
      };
      appState.systemInfo.bigSystemID = regSystem.bigSystemID;
      appState.systemInfo.jsnSystemName = JSON.parse(regSystem.jsnSystemName);
      appState.systemInfo.strSystemPathURL = regSystem.strSystemPathURL;
      appState.systemInfo.jsnSystemAddress = JSON.parse(regSystem.jsnSystemAddress);
      appState.systemInfo.jsnSystemLocation = JSON.parse(regSystem.jsnSystemLocation);
      appDispatch({ ...appState });
      navigate(`/${regSystem.strSystemPathURL}`);
    } catch (err) {
      console.log({ err });
    }
  },
};
