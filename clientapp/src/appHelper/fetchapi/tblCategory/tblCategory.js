import { createSystemQuery,findSystemQuery,updateSystemQuery } from "appHelper/appQueries/systemQueries/systemQueries"
import { fetchData } from "../appFetch";
import { bulkCategoriesQuery, createCategoryQuery, deleteCategoryQuery, findCategoriesQuery, findDeliveryAddressCategoriesQuery, findMenuCategoriesQuery, updateCategoryQuery, updateCategoryReviewsQuery } from "appHelper/appQueries/categoryQueries/categoryQueries";

export const createCategory = async(objInput) => {
   const query = createCategoryQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.createCategory;
}

export const updateCategory = async(objInput) => {
    const query = updateCategoryQuery(objInput);
    const requestBody = {
       query: query
     }
    const result = await fetchData(requestBody);
    return result?.data?.updateCategory;
 }

export const findCategories = async(bigSystemID)=>{
    const query = findCategoriesQuery(bigSystemID);
    const requestBody = {
       query: query
     }
    const result = await fetchData(requestBody);
    return result?.data?.findCategories;
}

export const bulkCategories = async(categories,onDeleteIDs)=>{
   console.log(onDeleteIDs)
   const query = bulkCategoriesQuery(categories,onDeleteIDs);
   console.log(categories)
   console.log(query)
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.bulkCategories;
}

export const deleteCategory = async(bigID)=>{
    const query = deleteCategoryQuery(bigID);
    const requestBody = {
       query: query
     }
    const result = await fetchData(requestBody);
    return result?.data?.deleteCategory;
}

export const updateCategoryReviews = async(objInput) => {
   const query = updateCategoryReviewsQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateCategory;
}

export const findMenuCategories = async(objInput) => {
   const query = findMenuCategoriesQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findMenuCategories;
}

export const findDeliveryAddressCategories = async(objInput) => {
   const query = findDeliveryAddressCategoriesQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findDeliveryAddressCategories;
}