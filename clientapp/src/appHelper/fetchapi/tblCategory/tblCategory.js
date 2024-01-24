import { createSystemQuery,findSystemQuery,updateSystemQuery } from "appHelper/appQueries/systemQueries/systemQueries"
import { fetchData } from "../appFetch";
import { createCategoryQuery, deleteCategoryQuery, findCategoriesQuery, updateCategoryQuery } from "appHelper/appQueries/categoryQueries/categoryQueries";

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

export const deleteCategory = async(bigID)=>{
    const query = deleteCategoryQuery(bigID);
    const requestBody = {
       query: query
     }
    const result = await fetchData(requestBody);
    return result?.data?.deleteCategory;
}