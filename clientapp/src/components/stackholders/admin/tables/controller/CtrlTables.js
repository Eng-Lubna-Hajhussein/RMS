import { generateRandomID } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
import {
  createTable,
  deleteTable,
  freeTable,
  updateTable,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlTables = {
  addTable: async ({
    appState,
    isLoading,
    setIsLoading,
    formData,
    tables,
    setTables,
    reset,
  }) => {
    try {
      setIsLoading(true);
      const bigTableID = generateRandomID(10);
      const objInputTable = {
        bigTableID: Number(bigTableID),
        bigSystemID: appState.systemInfo.bigSystemID,
        intSeatsNumber: formData.seatsNum,
        strTablePrice: formData.pricePerHour,
      };
      const table = await createTable(objInputTable);
      if (table) {
        setTables([...tables, table]);
        reset();
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  freeTable: async ({
    isLoading,
    setIsLoading,
    tables,
    setTables,
    bigTableID,
    index,
  }) => {
    try {
      setIsLoading(true);
      const updatedTable = await freeTable(bigTableID);
      if (updatedTable) {
        tables[index] = updatedTable;
        setTables([...tables]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  deleteTable: async ({
    isLoading,
    setIsLoading,
    tables,
    setTables,
    bigTableID,
  }) => {
    try {
      setIsLoading(true);
      const blnTableDeleted = await deleteTable(bigTableID);
      if (blnTableDeleted) {
        tables = tables.filter((table) => table.bigTableID !== bigTableID);
        setTables([...tables]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  updateTable: async ({
    appState,
    isLoading,
    setIsLoading,
    formData,
    tables,
    setTables,
    bigTableID,
  }) => {
    try {
      setIsLoading(true);
      const objInputTable = {
        bigTableID: bigTableID,
        intSeatsNumber: Number(formData.seatsNum),
        strTablePrice: formData.pricePerHour,
      };
      const table = await updateTable(objInputTable);
      if (table) {
        const tableIndex = tables.findIndex(
          (table) => table.bigTableID === bigTableID
        );
        tables[tableIndex] = table;
        setTables([...tables]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
