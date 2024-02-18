import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import {
  findAvailableTables,
  findUserTables,
  reserveTable,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import { findUserPublic } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlProfile = {
  installData: async ({
    setIsLoading,
    appState,
    setOrders,
    setTables,
    setUserInfo,
    bigUserID,
    bigSystemID
  }) => {
    setIsLoading(true);
    const jsnUser = await findUserPublic(bigUserID);
    if(jsnUser){
      const user = {
        ...jsnUser,
        jsnFullName: JSON.parse(jsnUser?.jsnFullName||{}),
        jsnLocation: JSON.parse(jsnUser?.jsnLocation || {}),
        jsnAddress: JSON.parse(jsnUser?.jsnAddress || {}),
      };
      setUserInfo({...user});
    }
    const objInputOrder = {
      bigUserID: bigUserID,
      bigSystemID:bigSystemID,
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
      bigUserID: bigUserID,
      bigSystemID:bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInputTables);
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
