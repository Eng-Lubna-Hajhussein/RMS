import { createSystemQuery,findSystemQuery,findSystemsQuery,updateSystemQuery } from "appHelper/appQueries/systemQueries/systemQueries"
import { fetchData } from "../appFetch";

export const createSystem = async(objInput) => {
   const query = createSystemQuery(objInput);
   console.log({query})
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.createSystem;
}

export const findSystem = async(bigSystemID) => {
   const query = findSystemQuery(bigSystemID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findSystem;
}

export const findSystems = async() => {
   const query = findSystemsQuery();
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findSystems;
}

export const updateSystem = async(objInput) => {
   const query = updateSystemQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateSystem;
}