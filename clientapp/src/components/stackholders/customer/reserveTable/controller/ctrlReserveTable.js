import { findAvailableTables, reserveTable } from "appHelper/fetchapi/tblReservation/tblReservation";

export const ctrlReserveTable = {
  installData: async ({
    appState,
    setIsLoading,
    setTables
  }) => {
    setIsLoading(true);
    const systemTables = await findAvailableTables(
      appState.systemInfo.bigSystemID
    );
    if (systemTables.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  },
  reserveTable: async ({
    appState,
    startDate,
    endDate,
    table,
    cardNumber,
    cvv,
    cardName,
    tables,
    setTables,
    startTime,
    endTime,
  }) => {
    try {
      const dtmReservationStart =
        startDate.current.value + " " + startTime.current.value + ":00";
      const dtmReservationEnd =
        endDate.current.value + " " + endTime.current.value + ":00";
      const objInput = {
        bigTableID: table.bigTableID,
        bigUserID: appState.userInfo.bigUserID,
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
        dtmReservationStart: new Date(dtmReservationStart).toISOString(),
        dtmReservationEnd: new Date(dtmReservationEnd).toISOString(),
        blnTableAvailable: false,
      };
      const reservedTable = await reserveTable(objInput);
      if (reservedTable) {
        const unreservedTables = tables.filter(
          (table) => table.bigTableID !== reservedTable.bigTableID
        );
        setTables(unreservedTables);
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
