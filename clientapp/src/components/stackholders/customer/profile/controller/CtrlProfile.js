import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { findAvailableTables, findUserTables, reserveTable } from "appHelper/fetchapi/tblReservation/tblReservation";

export const ctrlProfile = {
  installData: async ({
    setIsLoading,
    appState,
    setOrders,
    setTables
  }) => {
    setIsLoading(true);
    const objInputOrder = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInputOrder);
    if (jsnOrdersData?.length) {
      const ordersData = jsnOrdersData.map((order) => ({
        ...order,
        lstProduct: JSON.parse(order?.lstProduct || []),
        jsnAddress: JSON.parse(order?.jsnAddress || {}),
        jsnLocation: JSON.parse(order?.jsnLocation || {}),
        jsnClientPayment: JSON.parse(order?.jsnClientPayment || {}),
      }));
      setOrders([...ordersData]);
    }
    const objInputTables = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInputTables);
    console.log({ jsnUserTables });
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table) => ({
        ...table,
        jsnClientPayment: JSON.parse(table?.jsnClientPayment || {}),
      }));
      setTables([...userTables]);
    }
    setIsLoading(false);
  },
};
