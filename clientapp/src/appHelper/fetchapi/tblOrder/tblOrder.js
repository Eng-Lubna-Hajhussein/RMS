import { updateCategoryQuery } from "appHelper/appQueries/categoryQueries/categoryQueries";
import { fetchData } from "../appFetch";
import { createOrderQuery, findUnDeliveredOrderQuery, findUserOrdersQuery } from "appHelper/appQueries/orderQueries/orderQueries";

export const createOrder = async(objInput) => {
   const query = createOrderQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.createOrder;
}

export const updateOrder = async(objInput) => {
   const query = updateCategoryQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateOrder;
}

export const findUnDeliveredOrder = async(objInput) => {
   const query = findUnDeliveredOrderQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findUnDeliveredOrder;
}

export const findUserOrders = async(objInput) => {
   const query = findUserOrdersQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findUserOrders;
}