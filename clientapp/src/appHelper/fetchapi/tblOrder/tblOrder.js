import { fetchData } from "../appFetch";
import { createOrderQuery } from "appHelper/appQueries/orderQueries/orderQueries";

export const createOrder = async(objInput) => {
   const query = createOrderQuery(objInput);
   console.log({query})
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.createOrder;
}