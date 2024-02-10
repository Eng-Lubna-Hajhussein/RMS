import {
  CITIES,
  COUNTRIES,
  initialAppState,
} from "appHelper/appVariables";
import { customerDeleteAccount, customerUpdateSettings } from "appHelper/fetchapi/tblUser/tblUser";
import moment from "moment";

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
      const jsnAddress = {
        jsnCountry: COUNTRIES[address.countryIndex],
        jsnCity:
          CITIES[COUNTRIES[address.countryIndex]["eng"]][address.cityIndex],
      };
      const jsnFullName = {
        eng: formData.nameEng,
        arb: formData.nameArb,
      };
      const jsnClientPayment = {
        strCardNumber: formData.cardNumber,
        strCVV: formData.cvv,
        strNameOnCard: formData.cardName,
      };
      const objInputUser = {
        bigUserID: appState.userInfo.bigUserID,
        jsnFullName: jsnFullName,
        jsnClientPayment: jsnClientPayment,
        jsnAddress: jsnAddress,
        dtmUpdatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };
      const updatedUser = await customerUpdateSettings(objInputUser);
      if(updatedUser){
          appState.userInfo = {
            ...appState.userInfo,
            jsnFullName: JSON.parse(updatedUser?.jsnFullName||{}),
            jsnClientPayment: JSON.parse(updatedUser?.jsnClientPayment||{}),
            jsnAddress: JSON.parse(updatedUser?.jsnAddress||{}),
            dtmUpdatedDate:updatedUser.dtmUpdatedDate
          }
          appDispatch({...appState});
      }
      setIsLoading(false);
     
    } catch (err) {
      console.log({ err });
    }
  },
  deleteAccount: async ({
    appState,
    appDispatch,
    navigate,
    setIsLoading,
    systemName,
    systemID,
    onLogout
  }) => {
    try {
      setIsLoading(true);
      const deletedAccount = await customerDeleteAccount(appState.userInfo.bigUserID)
      if(deletedAccount?.blnIsDeleted){
        onLogout();
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
