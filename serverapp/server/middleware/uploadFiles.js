const multer = require("multer");
const { generateRandomID } = require("../appHelper/appFunctions");
const uploadDir = "server/assets/";

let aryResponse = [];

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,uploadDir);
  },
  filename: async function (req, file, cb) {
    cb(null,file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    aryResponse.push({blnsUploaded:true,strFileName:file.originalname,strFileFullPath:'http://localhost:4000/assets/'+file.originalname});
    cb(null, true);
  },
});

module.exports = {upload,aryResponse};
