import { App_Server_URL_GraphQL } from "appHelper/appVariables";

export const fetchData = async (requestBody) => {  
 return await fetch(App_Server_URL_GraphQL, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .then((resData) => {
      return resData;
    })
    .catch((err) => {
      console.log(err);
    });
};
