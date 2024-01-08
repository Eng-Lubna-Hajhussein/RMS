import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import chef1Img from "assets/image/chef-1.png";
import chef2Img from "assets/image/chef-2.png";
import chef3Img from "assets/image/chef-3.png";
import chefSine from "assets/image/sine.png";
import "./Team.css";
import React, { useState } from "react";
import { Facebook, FacebookOutlined, FacebookSharp, Instagram, Twitter } from "@mui/icons-material";
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
    marginTop: "-140px",
    zIndex: "222 !important",
    xs: {},
  },
  specialization: {
    color: "#f3274c",
    fontSize: "18px !important",
    fontWeight: "800 !important",
    xs: {},
  },
  name: {
    fontSize: "30px !important",
    transition: "3s ease-in-out",
    color: "#000",
    fontWeight: "900 !important",
    transition: ".3s ease-in-out",
    fontFamily: "san-serif",
    xs: {},
  },
  social: {
    transition: ".3s ease-in-out",
    // padding: "15px !important",
    backgroundColor: "#f5f8fd !important",
    borderRadius: "50%",
    height:"50px",
    width:"50px",
    ":hover":{backgroundColor:"#ffd40d !important"}
    // root: {
    //   '&:hover': {
    //     backgroundColor: '#000 !important'
    //   }}  
    // xs: {},
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
    xs: {},
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
  };
  const handleOpenChefDetails = () => {
    setChefDetailsOpen(true);
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={"center"}
        sx={{
          paddingLeft: "100px",
          paddingRight: "100px",
          marginTop: "100px",
          marginBottom: "100px",
          minHeight: "800px",
        }}
      >
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
                  px={4}
                  container
                  alignItems={"center"}
                  justifyContent={"center"}
                  alignSelf={"center"}
                  sx={{ position: "relative",height:"fit-content" }}
                >
                  <Grid item xs="12" sx={{ zIndex: "-1" ,height:"fit-content"}}>
                    <Box
                      component={"img"}
                      src={img}
                      width={"100%"}
                      height={"450px"}
                    />
                  </Grid>
                  <Grid item xs="12" container sx={{ zIndex: "111",height:"fit-content" }}>
                    <Box
                      className="chef-content"
                      sx={{
                        ...style.chefContent,
                        position: "absolute",
                        height: "300px",
                        width: "80%",
                        top: "400px",
                        paddingY:"50px"
                      }}
                    >
                      <Grid container item xs="12" alignItems={'center'} justifyContent={'center'}  sx={{ height: "100%" }}>
                        <Grid
                          item
                          xs="12"
                          container
                          justifyContent={"center"}
                        >
                          <Typography sx={style.specialization}>
                            {specialization}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs="12"
                          container
                          justifyContent={"center"}
                        >
                          <Typography sx={style.name}>
                            {name}
                          </Typography>
                        </Grid>
                        <Grid item xs='12' container  justifyContent={'center'} >
                          <Grid item xs='3' container justifyContent={'center'}>
                            <Box sx={{...style.social}}>
                              <Grid container item xs='12' justifyContent={'center'} alignContent={'center'} sx={{height:"100%",width:"100%"}}>
                              <FacebookSharp />
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs='3' container justifyContent={'center'}>
                            <Box sx={style.social}>
                              <Grid container item xs='12' justifyContent={'center'} alignContent={'center'} sx={{height:"100%",width:"100%"}}>
                              <Twitter />
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs='3' container justifyContent={'center'}>
                            <Box sx={style.social}>
                              <Grid container item xs='12' justifyContent={'center'} alignContent={'center'} sx={{height:"100%",width:"100%"}}>
                              <Instagram />
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid item xs={"12"}  container  justifyContent={'center'}>
                              <img src={sign} />
                            </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              )
            )}
      </Grid>
    </React.Fragment>
  );
}