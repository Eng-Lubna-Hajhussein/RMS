import React from "react";
import {Grid } from "@mui/material";
import Box001 from "components/sharedUI/Box001/Box001";

const style = {
  container: {
    paddingY:{lg:"50px",xs:"10px"}
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: {lg:"14px",xs:"10px"},
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: {lg:"25px",xs:"14px"},
    fontWeight: "800",
  },
  icon: {
    padding: "18px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
};

function Activities({activities}) {
  return (
    <Grid item xs="12" sx={style.container} container justifyContent={"center"}>
      {activities.map(({ title, description, img }, index) => (
        <Grid
          item
          lg="6"
          xs='12'
          justifyContent={"center"}
          alignContent={"center"}
          sx={style.fitContentHeight}
          px={2}
          pb={3}
        >
          <Box001 title={title} description={description} img={img} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Activities;
