import { generateRandomID } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
import { updateCategoryReviews } from "appHelper/fetchapi/tblCategory/tblCategory";
import { setOrderDelivered } from "appHelper/fetchapi/tblOrder/tblOrder";
import {
  createTable,
  deleteTable,
  freeTable,
  updateTable,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import {
  findSystem,
  updateSystem,
  updateSystemReviews,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlOrder = {
  orderDelivered: async ({
    appState,
    appDispatch,
    isLoading,
    setIsLoading,
    setOrderedCategories,
    bigOrderID
  }) => {
    try {
      setIsLoading(true);
      const deliveredOrder = await setOrderDelivered(bigOrderID);
      if (deliveredOrder?.blnDelivered) {
        appState.userInfo.userOrder = {
            lstProduct: [],
            strTotalPrice: "",
          }
        appDispatch({...appState});
        setOrderedCategories([]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
