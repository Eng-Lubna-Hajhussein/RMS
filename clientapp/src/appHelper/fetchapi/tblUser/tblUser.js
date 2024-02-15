import { activateCustomerQuery, adminUpdateSettingsQuery, banCustomerQuery, customerDeleteAccountQuery, customerUpdateSettingsQuery, deactivateCustomerQuery, findUsersQuery, loginQuery, signupQuery, unBanCustomerQuery, userUploadImgQuery } from "appHelper/appQueries/userQueries/userQueries"
import { fetchData } from "../appFetch";

export const signup = async(objInput) => {
   const query = signupQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.signup;
}

export const login = async(objInput) => {
   const query = loginQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.login;
}

export const findUsers = async(bigSystemID) => {
   const query = findUsersQuery(bigSystemID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.findUsers;
}

export const customerUpdateSettings = async (objInput)=>{
   const query = customerUpdateSettingsQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const adminUpdateSettings = async (objInput)=>{
   const query = adminUpdateSettingsQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const customerDeleteAccount = async (bigUserID)=>{
   const query = customerDeleteAccountQuery(bigUserID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const banCustomer= async (bigUserID)=>{
   const query = banCustomerQuery(bigUserID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const unBanCustomer= async (bigUserID)=>{
   const query = unBanCustomerQuery(bigUserID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const deactivateCustomer = async (bigUserID)=>{
   const query = deactivateCustomerQuery(bigUserID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const activateCustomer = async (bigUserID)=>{
   const query = activateCustomerQuery(bigUserID);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}

export const userUploadImg = async (objInput)=>{
   const query = userUploadImgQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.updateUser;
}