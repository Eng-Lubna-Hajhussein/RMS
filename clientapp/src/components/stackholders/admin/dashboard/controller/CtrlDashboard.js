import { initialAppState, objCategoriesType } from "appHelper/appVariables";
import {
  bulkCategories,
  findCategories,
} from "appHelper/fetchapi/tblCategory/tblCategory";
import { findSystemOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import {
  findSystem,
  updateSystem,
} from "appHelper/fetchapi/tblSystem/tblSystem";

export const ctrlDashboard = {
  installData: async ({setTables,setOrders,setIsLoading,appState}) => {
    setIsLoading(true);
    const systemOrders = await findSystemOrders(
      appState.systemInfo.bigSystemID
    );
    if (systemOrders?.length) {
      setOrders([...systemOrders]);
    }
    const systemTables = await findTables(appState.systemInfo.bigSystemID);
    if (systemTables?.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  }
};
