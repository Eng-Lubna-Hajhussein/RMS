import { generateRandomID } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
import {
  createTable,
  deleteTable,
  findUserTables,
  freeTable,
  updateTable,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlTables = {
  installData:async ({
    appState,
    setIsLoading,
    setTables
  }) => {
    setIsLoading(true);
    const objInput = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInput);
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table) => ({
        ...table,
        jsnClientPayment: JSON.parse(table?.jsnClientPayment || {}),
      }));
      setTables([...userTables]);
    }
    setIsLoading(false);
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
        const userTables = tables.filter((table)=>table.bigTableID!==updatedTable.bigTableID);
        setTables([...userTables]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
