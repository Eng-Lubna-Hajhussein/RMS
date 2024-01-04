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
import DrawerNav from "./drawerNav/DrawerNav";
import UpperToolbar from "./upperToolbar/UpperToolbar";
import LowerToolbar from "./lowerToolbar/LowerToolbar";

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

function WebsiteHeader() {
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
        <UpperToolbar listSystemSocial={listSystemSocial} listSystemContact={listSystemContact}  />
        <LowerToolbar navList={navList} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </AppBar>
      <DrawerNav openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </React.Fragment>
  );
}

export default WebsiteHeader;
