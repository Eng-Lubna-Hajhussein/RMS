import {
    CITIES,
    COUNTRIES,
    initialAppState,
  } from "appHelper/appVariables";
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
          bigUserID: appState.userInfo.bigUserID,
          strImgPath: img
        };
        const updatedUser = await userUploadImg(objInput);
        if(updatedUser){
            const savedImg = updatedUser?.strImgPath
            appState.userInfo = {
              ...appState.userInfo,
              strImgPath:savedImg
            }
            appDispatch({...appState});
        }
       
      } catch (err) {
        console.log({ err });
      }
    },
  };
  