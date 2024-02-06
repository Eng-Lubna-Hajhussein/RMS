import { fetchData } from "../appFetch";
import {
  createTableQuery,
  deleteTableQuery,
  findAvailableTablesQuery,
  findTablesQuery,
  freeTableQuery,
  reserveTableQuery,
  updateTableQuery,
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

export const createTable = async (objInput) => {
  const query = createTableQuery(objInput);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.createTable;
};

export const deleteTable = async (bigTableID) => {
  const query = deleteTableQuery(bigTableID);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.deleteTable;
};

export const freeTable = async (bigTableID) => {
  const query = freeTableQuery(bigTableID);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.updateTable;
};

export const updateTable = async (objInput) => {
  const query = updateTableQuery(objInput);
  const requestBody = {
    query: query,
  };
  const result = await fetchData(requestBody);
  return result?.data?.updateTable;
};