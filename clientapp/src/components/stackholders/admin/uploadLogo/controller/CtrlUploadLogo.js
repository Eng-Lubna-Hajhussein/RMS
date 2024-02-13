import {
    CITIES,
    COUNTRIES,
    initialAppState,
  } from "appHelper/appVariables";
import { systemUploadLogo } from "appHelper/fetchapi/tblSystem/tblSystem";
  import { customerDeleteAccount, customerUpdateSettings, userUploadImg } from "appHelper/fetchapi/tblUser/tblUser";
  import moment from "moment";
  
  export const ctrlUploadPicture = {
    handelSubmit: async ({
      appState,
      appDispatch,
      setIsLoading,
      img,
    //   setImg
    }) => {
      try {
        const objInput = {
          bigSystemID: appState.systemInfo.bigSystemID,
          strLogoPath: img
        };
        const updatedSystem = await systemUploadLogo(objInput);
        if(updatedSystem){
            const savedLogo = updatedSystem?.strLogoPath
            appState.systemInfo = {
              ...appState.systemInfo,
              strLogoPath:savedLogo
            }
            appDispatch({...appState});
        }
       
      } catch (err) {
        console.log({ err });
      }
    },
  };