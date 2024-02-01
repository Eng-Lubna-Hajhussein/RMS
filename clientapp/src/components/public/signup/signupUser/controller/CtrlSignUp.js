import { formateDBStr, generateRandomID } from "appHelper/appFunctions";
import { CITIES, COUNTRIES, Demo_jsnSystemInfo, objRoleID } from "appHelper/appVariables";
import { createSystem, findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { signup } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlSignUp = {
  handelSubmit: async ({
    appState,
    appDispatch,
    navigate,
    isLoading,
    setIsLoading,
    regSystem,
    formData,
    address,
    mapLocation,
  }) => {
    try {
      const bigSystemID = regSystem.bigSystemID;
      const jsnUserAddress = {
        jsnCountry: COUNTRIES[address.countryIndex],
        jsnCity:
          CITIES[COUNTRIES[address.countryIndex]["eng"]][address.cityIndex],
      };
      const bigUserID = generateRandomID(10);
      const jsnFullName = {
        eng: formData.nameEng,
        arb: formData.nameArb,
      };
      const jsnUserLocation = await mapLocation.getLocation();
      const objInputUser = {
        bigUserID: bigUserID,
        bigSystemID: bigSystemID,
        bigUserRoleID: objRoleID["Customer"],
        jsnFullName: jsnFullName,
        strEmail: formData.email,
        strPassword: formData.password,
        jsnLocation: jsnUserLocation,
        jsnAddress: jsnUserAddress,
        jsnClientPayment:{}
      };
      const regUser = await signup(objInputUser);
      if(!regUser?.bigUserID){
        alert("Registration failed");
        return;
      }
      const system = await findSystem(regUser?.bigSystemID);
      if(regUser?.bigUserID&&system?.bigSystemID){
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
        appState.systemInfo.bigSystemID = system.bigSystemID;
        appState.systemInfo.jsnSystemName = JSON.parse(system.jsnSystemName);
        appState.systemInfo.strSystemPathURL = system.strSystemPathURL;
        appState.systemInfo.jsnSystemAddress = JSON.parse(system.jsnSystemAddress);
        appState.systemInfo.jsnSystemLocation = JSON.parse(system.jsnSystemLocation);
        appDispatch({...appState});
        if(appState?.clientInfo?.blnUserLogin===true){
          navigate(`/${system.strSystemPathURL}`);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
