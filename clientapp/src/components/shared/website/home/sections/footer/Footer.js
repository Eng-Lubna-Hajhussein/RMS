import React from "react";
import {
  Button,
  Grid,
  //   Icon,
  Typography,
  TextField,
} from "@mui/material";
import bgImg from "assets/image/footer.png";
import logo from "assets/image/logo-white.png";
import tripaLogo from "assets/image/tripa.png";
import { Link } from "react-router-dom";
import {  ArrowForwardIos } from "@mui/icons-material";

const style = {
  navListTitle: {
    fontSize: "26px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    borderBottom: "6px solid #ffd40d",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  container: {
    height: {lg:"98vh",xs:"fit-content"},
    background: "#f5f8fd",
    paddingTop: "100px",
  },
  containerItem: {
    height: "100%",
    background: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  box: {
    padding: "40px",
    borderRadius: "30px",
    background: "#f3274c",
    width: "90%",
  },
  date: {
    color: "#fff",
    fontSize: {lg:"16px",xs:"14px"},
    lineHeight: "30px !important",
    display: "inline !important",
    fontWeight:{xs:"800"}
  },
  closedDateBtn: {
    fontSize: "16px",
    lineHeight: "30px",
    display: "inline",
    borderBottom: "1px solid #000",
  },
  tripaReview: {
    fontSize: "16px !important",
    color: "#fff",
    fontWeight: "800 !important",
  },
  nav: {
    color: "#fff",
    fontSize: "16px !important",
    lineHeight: "30px !important",
    borderWidth: "80% !important",
    cursor: "pointer !important",
    display: "inline !important",
    transition: ".3 ease-in-out",
  },
  copyRights: {
    fontSize: "18px !important",
    fontWeight: "800 !important",
  },
  line: {
    borderBottom: "6px solid #ffd40d",
    width: "100%",
  },
  socialLink: {
    fontSize: "15px",
    marginLeft: "15px",
    transition: ".3 ease-in-out",
    textDecoration: "underline",
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
    cursor: "pointer",
  },
};

export default function Footer() {
  const aboutList = ["Information", "Special Dish", "Reservation", "Contact"];
  const menuList = ["Steaks", "Burgers", "Coctails", "Bar B Q", "Desserts"];
  const socialLinkList = ["facebook", "twitter", "instagram", "youtube"];
  return (
    <Grid
      container
      sx={style.container}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
    >
      <Grid item xs={12} sx={style.containerItem}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Grid
            item
            lg={10}
            xs={12}
            alignItems={"flex-start"}
            alignSelf={"flex-start"}
          >
            <Grid
              container
              px={2}
              alignItems={"flex-start"}
              alignSelf={"flex-start"}
            >
              <Grid
                item
                lg={4}
                xs={12}
                alignItems={"flex-start"}
                alignSelf={"flex-start"}
              >
                <div style={style.box}>
                  <Grid container>
                    <Grid item xs={12}>
                      <img src={logo} />
                    </Grid>
                    <Grid item xs={12} container pb={2}>
                      <Grid item>
                        <Typography sx={style.date}>
                          Tuesday - Saturday: 12:00pm - 23:00pm
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={style.closedDateBtn}>
                          Closed on Sunday
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <img src={tripaLogo} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={style.tripaReview}>
                        5 star rated on TripAdvisor
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid
                item
                lg={2}
                xs={12}
                justify={"start"}
                alignItems={"flex-start"}
                alignSelf={"flex-start"}
              >
                <Grid
                  container
                  justify={"start"}
                  alignItems={"flex-start"}
                  alignSelf={"flex-start"}
                >
                  <Grid item xs={12}>
                    <Grid container justify={"start"} alignItems={"flex-start"}>
                      <Grid item xs={12} justify={"start"}>
                        <Typography sx={style.navListTitle}>About</Typography>
                      </Grid>
                      <Grid item xs={12} pt={2}>
                        {aboutList.map((nav) => (
                          <Grid container py={1}>
                            <Grid item p-0 m-0 justify={"start"}>
                              <ArrowForwardIos
                                sx={{ color: "#555" }}
                                fontSize="small"
                              />
                            </Grid>
                            <Grid item p-0 m-0>
                              <Link
                                style={{
                                  color: "#555",
                                  transition: ".3s ease-in-out",
                                  fontSize: "19px !important",
                                }}
                              >
                                <Typography>{nav}</Typography>
                              </Link>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={2}
                xs={12}
                justify={"start"}
                alignItems={"flex-start"}
                alignSelf={"flex-start"}
              >
                <Grid
                  container
                  justify={"start"}
                  alignItems={"flex-start"}
                  alignSelf={"flex-start"}
                >
                  <Grid item xs={12}>
                    <Grid container justify={"start"} alignItems={"flex-start"}>
                      <Grid item xs={12} justify={"start"}>
                        <Typography sx={style.navListTitle}>Menu</Typography>
                      </Grid>
                      <Grid item xs={12} pt={2}>
                        {menuList.map((nav) => (
                          <Grid container py={1}>
                            <Grid item p-0 m-0 justify={"start"}>
                              <ArrowForwardIos
                                sx={{ color: "#555" }}
                                fontSize="small"
                              />
                            </Grid>
                            <Grid item p-0 m-0>
                              <Link
                                style={{
                                  color: "#555",
                                  transition: ".3s ease-in-out",
                                  fontSize: "19px !important",
                                }}
                              >
                                <Typography>{nav}</Typography>
                              </Link>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
                justify={"start"}
                alignItems={"flex-start"}
                alignSelf={"flex-start"}
              >
                <Grid
                  container
                  justify={"start"}
                  alignItems={"flex-start"}
                  alignSelf={"flex-start"}
                >
                  <Grid item xs={12}>
                    <Grid container justify={"start"} alignItems={"flex-start"}>
                      <Grid item xs={12} justify={"start"} py={2}>
                        <Typography sx={style.navListTitle}>
                          Newsletter
                        </Typography>
                      </Grid>
                      <Grid item xs={12} justify={"start"} py={2}>
                        <Typography>Get recent news and updates.</Typography>
                      </Grid>
                      <Grid item xs={12} py={2}>
                        <TextField
                          color="warning"
                          label="Enter Your Email Address..."
                        />
                      </Grid>
                      <Grid item lg={7} xs={12}>
                        <Button
                          className="header-nav-001"
                        >
                          <Typography className="animated-btn-001">
                            Subscribe
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container py={5}>
              <Grid item xs={12}>
                <div style={style.line} />
              </Grid>
              <Grid item lg={6} container xs={12} pt={5}>
                <Grid item>
                  <Typography color="#f3274c" sx={style.copyRights}>
                    © 2023 Foodio
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="#000" sx={style.copyRights}>
                    {" "}
                    | Restaurant and BBQ.
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={6} container justifyContent={"end"} pt={5}>
                {socialLinkList.map((link) => (
                  <a style={style.socialLink}>{link}</a>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
