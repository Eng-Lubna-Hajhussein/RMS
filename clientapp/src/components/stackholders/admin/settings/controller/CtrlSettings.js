import { CITIES, COUNTRIES, initialAppState } from "appHelper/appVariables";
import { systemUpdateSettings } from "appHelper/fetchapi/tblSystem/tblSystem";
import {
  adminUpdateSettings,
} from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlSittings = {
  handelSubmit: async ({
    appState,
    appDispatch,
    setIsLoading,
    formData,
    address,
  }) => {
    try {
      setIsLoading(true);
      const addressInfo = {
        jsnCountry: COUNTRIES[address.countryIndex],
        jsnCity:
          CITIES[COUNTRIES[address.countryIndex]["eng"]][address.cityIndex],
      };
      const paymentInfo = {
        strCardNumber: formData.cardNumber,
        strCVV: formData.cvv,
        strNameOnCard: formData.cardName,
      };
      const objInputUser = {
        bigUserID: appState.userInfo.bigUserID,
        jsnClientPayment: paymentInfo,
        jsnAddress: addressInfo,
      };
      const updatedUser = await adminUpdateSettings(objInputUser);
      if (updatedUser) {
        appState.userInfo.jsnAddress = JSON.parse(
          updatedUser?.jsnAddress || {}
        );
        appState.userInfo.jsnClientPayment = JSON.parse(
          updatedUser?.jsnClientPayment || {}
        );
      }
      const objInputSystem = {
        bigSystemID: appState.systemInfo.bigSystemID,
        jsnSystemAddress: addressInfo,
      };
      const updatedSystem = await systemUpdateSettings(objInputSystem);
      if (updatedSystem) {
        appState.systemInfo.jsnSystemAddress = JSON.parse(
          updatedSystem?.jsnSystemAddress || {}
        );
      }
      appDispatch({ ...appState });
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
