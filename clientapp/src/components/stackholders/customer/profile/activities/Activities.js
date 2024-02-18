import React from "react";
import {Grid } from "@mui/material";
import Box001 from "components/sharedUI/Box001/Box001";

const style = {
  box: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "100px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: "14px !important",
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: "25px !important",
    fontWeight: "800 !important",
  },
  icon: {
    padding: "18px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
};

function Activities({activities}) {
  return (
    <Grid item xs="12" py={5} container justifyContent={"center"}>
      {activities.map(({ title, description, img }, index) => (
        <Grid
          item
          xs="6"
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
