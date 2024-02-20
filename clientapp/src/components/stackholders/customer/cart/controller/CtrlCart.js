import { generateRandomID } from "appHelper/appFunctions";
import { createOrder, findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import moment from "moment";

export const ctrlCart = {
  checkout: async ({
    appState,
    cardNumber,
    cvv,
    cardName,
    appDispatch,
    navigate
  }) => {
    const totalPrice = appState?.userInfo?.userCart?.lstProduct.reduce(
      (total, { strPrice, intQuantity }) => {
        return total + Number(strPrice) * intQuantity;
      },
      0
    );
    const bigOrderID = Number(generateRandomID(10));
    const orderDate = new Date().toISOString()//moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const objInputOrder = {
      bigOrderID: bigOrderID,
      bigSystemID: appState.systemInfo.bigSystemID,
      bigUserID: appState.userInfo.bigUserID,
      lstProduct: appState.userInfo.userCart.lstProduct,
      strTotalPrice: `${totalPrice}`,
      jsnAddress: appState.userInfo.jsnAddress,
      jsnLocation: appState.userInfo.jsnLocation,
      dtmOrderDate: orderDate,
      jsnClientInfo: {
        bigUserID: appState.userInfo.bigUserID,
        strEmail: appState.userInfo.strEmail,
        strImgPath: appState.userInfo.strImgPath,
        jsnFullName: appState.userInfo.jsnFullName,
      },
      jsnClientPayment: {
        strCardNumber: cardNumber,
        strCVV: cvv,
        strNameOnCard: cardName,
      },
      blnDelivered: false,
    };
    const order = await createOrder(objInputOrder);
    if (order.bigOrderID) {
      appState.userInfo.userCart = {
        lstProduct: [],
        strTotalPrice: "",
      };
      appState.userInfo.userOrder = {
        ...objInputOrder,
      };
      appDispatch({ ...appState });
      if (appState.userInfo.userOrder.bigOrderID) {
        navigate(`/customer/order/${appState.systemInfo.strSystemPathURL}`);
      }
    }
  },
};
