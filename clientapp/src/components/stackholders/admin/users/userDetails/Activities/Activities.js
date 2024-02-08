import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import menuIcon from "assets/image/menu-icon.svg";
import revenueIcon from "assets/image/revenue-icon.svg";
import ordersIcon from "assets/image/orders-icon.svg";
import customersIcon from "assets/image/customers-icon.svg";

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

export default function Activities() {
  const statisticsList = [
    { title: "Total Menus", description: "683", icon: menuIcon },
    {
      title: "Total Revenue",
      description: "$56,234",
      icon: revenueIcon,
    },
    {
      title: "Total Orders",
      description: "4,982",
      icon: ordersIcon,
    },
    {
      title: "Total Customer",
      description: "12,094",
      icon: customersIcon,
    },
  ];
  return (
    <Grid container py={1} justifyContent={"center"}>
      {statisticsList.map(({ title, description, icon }) => (
        <Grid
          item
          xs="6"
          justifyContent={"center"}
          alignContent={"center"}
          sx={{ height: "fit-content" }}
          px={3}
          pb={3}
        >
          <Box sx={style.box}>
            <Grid container alignContent={"center"} justifyContent={'center'} sx={{ height: "100%" }}>
              <Grid item xs="10">
                <Grid container>
                  <Grid item xs="12">
                    <Typography sx={style.title}>{title}</Typography>
                  </Grid>
                  <Grid item xs="12">
                    <Typography sx={style.description}>
                      {description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="2">
                <img src={icon} style={style.icon} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
