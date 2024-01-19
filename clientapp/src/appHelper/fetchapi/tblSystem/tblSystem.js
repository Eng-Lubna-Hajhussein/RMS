import { createSystemQuery } from "appHelper/appQueries/systemQueries/systemQueries"
import { fetchData } from "../appFetch";

export const createSystem = async(objInput) => {
   const query = createSystemQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.createSystem;
}