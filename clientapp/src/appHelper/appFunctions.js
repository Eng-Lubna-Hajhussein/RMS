import { chatbotData } from "./chatbotData";

export const generateID =()=>Math.random();

export function generateRandomID(n) {
    let add = 1,
      max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.
    if (n > max) {
      return generateRandomID(max) + generateRandomID(n - max);
    }
    max = Math.pow(10, n + add);
    let min = max / 10; // Math.pow(10, n) basically
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    const strNum = ("" + number);
    return strNum.substring(0,strNum.length-add)
  }

export function formateDBStr(str){
  return str.toLowerCase().trim()
}

export const orderRegions = ({ Regions: regions }) => {
  const appRegionsID = {};
  const ccID = {};
  const regionName = {};
  const sub = {};
  const categories = regions;
  regions.forEach(({ bigID, jsnName, bigParentID }) => {
    regionName[bigID] = jsnName;
    if (bigParentID === 0) {
      appRegionsID[bigID] = {};
    } else if (appRegionsID[bigParentID]) {
      appRegionsID[bigParentID][bigID] = [];
      ccID[bigID] = bigParentID;
      sub[bigParentID] = sub[bigParentID] ? ++sub[bigParentID] : 1;
    } else if (appRegionsID[ccID[bigParentID]]) {
      appRegionsID[ccID[bigParentID]][bigParentID].push(bigID);
      sub[bigParentID] = sub[bigParentID] ? ++sub[bigParentID] : 1;
    }
  });
  return { appRegionsID, regionName, ccID, sub, categories };
};

export const getBotMsg = (userMsg) => {
  return chatbotData.find((msg)=>{
      if(userMsg.type==="constant"){
          return msg.keywords.includes(userMsg.msg);
      }
      if(userMsg.type==="dynamic"){
          return msg.keywords.some((keyword)=>{
              return userMsg.msg.includes(keyword);
          });
      }
  })
}