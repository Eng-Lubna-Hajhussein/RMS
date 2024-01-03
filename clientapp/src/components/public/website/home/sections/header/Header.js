import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Grid,
  Icon,
  Box,
  Typography,
  Link,
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import {
  PhoneAndroidOutlined,
  EmailOutlined,
  HowToRegOutlined,
  ShoppingBagOutlined,
  Menu,
} from "@mui/icons-material";
import logoIcon from "assets/image/logo.png";
import CustomizedMenus from "./ResponsiveAppBar";
import Drawer from "./Drawer";
import DrawerComp from "./Drawer";

const styles = {
  appBar: {
    boxShadow: "none",
  },
  upperToolbar: {
    backgroundColor: "#ffd40d",
    boxShadow: "none",
    "&": {
      minHeight: "50px",
      paddingLeft: "80px",
      paddingRight: "80px",
    },
    display: {
      xs: "none",
      lg: "flex",
    },
  },
  contactIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    background: "#f3274c",
    borderRadius: "50%",
  },
  font: {
    fontSize: "14px",
    fontWeight: "800",
  },
  socialLink: {
    color: "#000",
    fontSize: "14px",
    textDecoration: "underline #000",
    fontWeight: "600",
  },
  socialIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    background: "#f3274c",
    borderRadius: "50%",
  },
  regIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
    border: "2px solid #000",
  },
  lowerToolBar: {
    background: "#fff",
    "&": {
      minHeight: "100px",
      paddingLeft: { lg: "80px", xs: "20px" },
      paddingRight: { lg: "80px", xs: "10px" },
    },
  },
};

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listSystemContact = [
    {
      ContactIcon: PhoneAndroidOutlined,
      name: "phone",
      value: "+1 (850) 344 0 66",
    },
    { ContactIcon: EmailOutlined, name: "email", value: "info@domain.com" },
  ];
  const listSystemSocial = [
    { name: "facebook", path: "" },
    { name: "instagram", path: "" },
    { name: "youtube", path: "" },
  ];
  const navList = [
    { nav: "home" },
    { nav: "menus" },
    {
      nav: "shop",
      navList: [
        { nav: "our product" },
        { nav: "product details" },
        { nav: "shop cart" },
        { nav: "cart checkout" },
      ],
    },
    { nav: "news", navList: [{ nav: "our blog" }, { nav: "blog details" }] },
    {
      nav: "pages",
      navList: [
        { nav: "about" },
        { nav: "our services" },
        { nav: "chef details" },
        { nav: "login" },
      ],
    },
    { nav: "contact" },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.upperToolbar}>
          <Grid container direction={"row"} alignItems={"center"}>
            {listSystemContact.map(({ ContactIcon, name, value }) => (
              <Grid container item xs="3" key={name} spacing={"3"}>
                <Grid item>
                  <Box sx={styles.contactIconBox}>
                    <Icon>{<ContactIcon fontSize="small" />}</Icon>
                  </Box>
                </Grid>

                <Grid item alignSelf={"center"}>
                  <Typography component={"p"} sx={styles.font} color={"#000"}>
                    {name}: {value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <Grid container item xs="3" justifyContent={"center"} spacing={"3"}>
              {listSystemSocial.map(({ name, path }) => (
                <Grid item xs="4">
                  <Link href="#" sx={styles.socialLink}>
                    {name}
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              item
              xs="3"
              spacing={"3"}
              justifyContent={"flex-end"}
            >
              <Grid item>
                <Box sx={styles.regIconBox}>
                  <Icon>
                    <HowToRegOutlined sx={{ color: "#000000" }} />
                  </Icon>
                </Box>
              </Grid>
              <Grid item alignSelf={"center"}>
                <Typography component={"p"} sx={styles.font} color={"#000"}>
                  Login / Register
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar sx={styles.lowerToolBar}>
          <Grid container alignItems={"center"}>
            <Grid item lg="3" xs="9">
              <Box
                component={"img"}
                sx={{
                  width: "150px",
                }}
                src={logoIcon}
              />
            </Grid>
            <Grid
              item
              container
              lg="6"
              sx={{ display: { lg: "flex", xs: "none" } }}
            >
              {navList.map(({ nav, navList }) => (
                <Grid item xs="2">
                  <CustomizedMenus nav={nav} navList={navList} />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              container
              xs="3"
              alignItems={"center"}
              justifySelf={"flex-end"}
              justifyContent={"flex-end"}
              justifyItems={"flex-end"}
              m={0}
            >
              <Grid item mx={2}>
                <Badge
                  badgeContent={0}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#ffd40d",
                      color: "#000000",
                      fontWeight: "800",
                    },
                  }}
                >
                  <ShoppingBagOutlined
                    fontSize="large"
                    sx={{ color: "#000000" }}
                  />
                </Badge>
              </Grid>
              <Grid item sx={{ display: { lg: "flex", xs: "none" } }}>
                <Button>
                  <Typography
                    className="animated-btn-001"
                    sx={{ fontWeight: "800" }}
                  >
                    Reverse A Table
                  </Typography>
                </Button>
              </Grid>
              <Grid item sx={{ display: { lg: "none", xs: "flex" } }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ m: 0 }}
                  onClick={()=>{setOpenDrawer(true)}}
                >
                  <Menu sx={{ color: "#000" }} fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DrawerComp openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </React.Fragment>
  );
}

export default Header;
