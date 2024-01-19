import { App_Server_URL_GraphQL } from "appHelper/appVariables";
const querify = obj => {

    // Make sure we don't alter integers.
    if( typeof obj === 'number' ) {
      return obj;
    }
  
    // Stringify everything other than objects.
    if( typeof obj !== 'object' || Array.isArray( obj ) ) {
      return JSON.stringify( obj );
    }
  
    // Iterate through object keys to convert into a string
    // to be interpolated into the query.
    let props = Object.keys( obj ).map( key =>
      `${key}:${querify( obj[key] )}`
    ).join( ',' );
  
    return `{${props}}`;
  
  }
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
      console.log({ resData });
      return resData;
    })
    .catch((err) => {
      console.log(err);
    });
};
