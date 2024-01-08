//dependencies-------------------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
var path = require('path');

const dir = path.join(__dirname, 'assets');

const PORT = process.env.PORT || 4000;

const app = express();



//Routes--------------------------------------------------------------------------------------------
const fileRoutes = require("./routes/upload");

//middleware----------------------------------------------------------------------------------------
app.use('/assets', express.static(dir));
//middleware to parse req body from a json format
app.use(express.json());
//middleware to allow cors origin requests from client
app.use(cors());
//Routes middleware
app.use("/file", fileRoutes);


  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
