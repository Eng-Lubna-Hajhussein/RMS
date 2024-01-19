import { signupQuery } from "appHelper/appQueries/userQueries/userQueries"
import { fetchData } from "../appFetch";

export const signup = async(objInput) => {
   const query = signupQuery(objInput);
   const requestBody = {
      query: query
    }
   const result = await fetchData(requestBody);
   return result?.data?.signup;
}