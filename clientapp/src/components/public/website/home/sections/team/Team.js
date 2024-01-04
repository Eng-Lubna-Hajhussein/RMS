import { Box, Grid, Icon, Typography } from "@mui/material";
import chef1Img from "assets/image/chef-1.png";
import chef2Img from "assets/image/chef-2.png";
import chef3Img from "assets/image/chef-3.png";
import chefSine from "assets/image/sine.png";
import "./Team.css";
import React, { useState } from "react";
// import ChefDetails from "../chefDetails/ChefDetails";

const style = {
  chefContent: {
    width: "280px !important",
    height: "280px !important",
    borderRadius: "50% !important",
    transition: ".3s ease-in-out",
    backgroundColor: "#fff !important",
    border: "7px solid #f5f8fd !important",
    pointer: "cursor",
    marginTop:"-140px",
    xs: {
    },
  },
  specialization: {
    color: "#f3274c",
    fontSize: "18px !important",
    width: "100%",
    fontWeight: "800 !important",
    xs: {
    },
  },
  name: {
    fontSize: "30px !important",
    transition: "3s ease-in-out",
    color: "#000",
    fontWeight: "900 !important",
    transition: ".3s ease-in-out",
    fontFamily: "san-serif",
    xs: {
    },
  },
  social: {
    transition: ".3s ease-in-out",
    padding: "15px !important",
    backgroundColor: "#f5f8fd !important",
    borderRadius: "50%",
    xs: {
    },
  },
    title: {
    fontSize: "50px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    xs: {
      fontSize: "30px !important",
    },
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
    xs: {
    },
  },
  
};

export default function Team() {
  const [chefDetailsOpen, setChefDetailsOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState(null);
  const teamList = [
    {
      img: chef1Img,
      name: "Thomas Walim",
      specialization: "Dessert specialist",
      facebook: "",
      linkedin: "",
      twitter: "",
      sign: chefSine,
    },
    {
      img: chef2Img,
      name: "James Jhonson",
      specialization: "Chef Master",
      facebook: "",
      linkedin: "",
      twitter: "",
      sign: chefSine,
    },
    {
      img: chef3Img,
      name: "Room Minal",
      specialization: "Dessert specialist",
      facebook: "",
      linkedin: "",
      twitter: "",
      sign: chefSine,
    },
  ];
  const handleCloseChefDetails = () => {
    setChefDetailsOpen(false);
  }
  const handleOpenChefDetails = () => {
    setChefDetailsOpen(true);
  }

  return (
    <React.Fragment>
      <Grid container justifyContent={"center"}>
        <Grid item lg="10" xs={"12"}>
          <Grid container justify={"center"}>
              {teamList.map(
                ({
                  name,
                  specialization,
                  img,
                  sign,
                  facebook,
                  twitter,
                  linkedin,
                }) => (
                  <Grid
                    item
                    lg="4"
                    xs={"12"}
                    px-4
                    alignItems={"center"}
                    justify={"center"}
                    alignSelf={"center"}
                  >
                    <img src={img} width={"100%"} />
                    <Box className="chef-content" sx={style.chefContent}>
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        justify={"center"}
                        alignItems={"center"}
                        alignSelf={"center"}
                      >
                        <Grid item xs="12">
                          <Grid container justify={"center"}>
                            <Grid item xs="12" alignSelf={"center"}>
                              <Typography sx={style.specialization}>
                                {specialization}
                              </Typography>
                              <Typography
                                className="chef-name"
                                sx={style.name}
                                onClick={() => {
                                  setSelectedChef({
                                    name,
                                    specialization,
                                    img,
                                    sign,
                                    facebook,
                                    twitter,
                                    linkedin,
                                  });
                                  handleOpenChefDetails();
                                }}
                              >
                                {name}
                              </Typography>
                            </Grid>
                            <Grid item xs="10">
                              <Grid container justify={"center"}>
                                <Grid
                                  item
                                  xs="3"
                                  mx-2
                                  className="chef-social"
                                  sx={style.social}
                                >
                                  <Icon icon={"facebookOutlined"} />
                                </Grid>
                                <Grid
                                  item
                                  xs="3"
                                  mx-2
                                  className="chef-social"
                                  sx={style.social}
                                >
                                  <Icon icon={"twitter"} />
                                </Grid>
                                <Grid
                                  item
                                  xs="3"
                                  mx-2
                                  className="chef-social"
                                  sx={style.social}
                                >
                                  <Icon icon={"linkedIn"} />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={"12"} pt-5>
                              <img src={sign} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )
              )}
          </Grid>
        </Grid>
      </Grid>
      {/* <ChefDetails
        chefDetailsOpen={chefDetailsOpen}
        handleCloseChefDetails={handleCloseChefDetails}
        handleOpenChefDetails={handleOpenChefDetails}
        selectedChef={selectedChef}
      /> */}
    </React.Fragment>
  );
}
