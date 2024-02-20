import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";

export const ctrlOrders = {
  installData: async ({
    setIsLoading,
    appState,
    setOrders
  }) => {
    setIsLoading(true);
    const objInput = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInput);
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
    setIsLoading(false);
  },
};
