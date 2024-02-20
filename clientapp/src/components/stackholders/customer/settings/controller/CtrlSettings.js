import {
  CITIES,
  COUNTRIES,
  initialAppState,
} from "appHelper/appVariables";
import { customerDeleteAccount, customerUpdateSettings } from "appHelper/fetchapi/tblUser/tblUser";
import moment from "moment";
import { ctrlRouteCustomer } from "../../controller/CtrlRouteCustomer";

export const ctrlSittings = {
  handelSubmit: async ({
    appState,
    appDispatch,
    setIsLoading,
    formData,
    address,
    deliveryAddress
  }) => {
    try {
        setIsLoading(true);
        const jsnCountry = address.countryID? deliveryAddress?.regionName[address.countryID]:{}
        const jsnCity = address.cityID? deliveryAddress?.regionName[address.cityID]:{}
        const jsnTown = address.townID? deliveryAddress?.regionName[address.townID]:{}
        const jsnAddress = {
          jsnCountry: {...jsnCountry,bigID:address.countryID||0},
          jsnCity:{...jsnCity,bigID:address.cityID||0},
          jsnTown:{...jsnTown,bigID:address.townID||0},
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
        dtmUpdatedDate: new Date().toISOString()//moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
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
  }) => {
    try {
      setIsLoading(true);
      const deletedAccount = await customerDeleteAccount(appState.userInfo.bigUserID)
      if(deletedAccount?.blnIsDeleted){
        ctrlRouteCustomer.onLogout({
          appState:appState,
          appDispatch:appDispatch
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
