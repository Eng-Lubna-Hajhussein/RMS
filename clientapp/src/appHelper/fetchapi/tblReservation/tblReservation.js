import { fetchData } from "../appFetch";
import {
  findAvailableTablesQuery,
  findTablesQuery,
  reserveTableQuery,
} from "appHelper/appQueries/reservationQueries/reservationQueries";

export const findTables = async (bigSystemID) => {
  const query = findTablesQuery(bigSystemID);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.findTables;
};

export const findAvailableTables = async (bigSystemID) => {
  const query = findAvailableTablesQuery(bigSystemID);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.findAvailableTables;
};

export const reserveTable = async (objInput) => {
  const query = reserveTableQuery(objInput);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.updateTable;
};
