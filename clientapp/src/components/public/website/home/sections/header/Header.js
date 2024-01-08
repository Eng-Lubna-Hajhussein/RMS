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
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";

function Header({lang,dir,lstContact,lstSocial}) {

  const lstWebsiteNav= [
    { nav: {eng:"home",arb:"الرئيسية"} },
    { nav: {eng:"menus",arb:"المنيو"} },
    {
      nav: {eng:"shop",arb:"تسوق"},
      navList: [
        { nav: {eng:"shop cart",arb:"كرت التسوق"} },
        { nav: {eng:"cart checkout",arb:"الحساب"} },
      ],
    },
    { nav: {eng:"news",arb:"الاخبار"}, navList: [{ nav: {eng:"our blog",arb:"مدونتنا"} }, { nav: {eng:"blog details",arb:"تفاصيل المدونة"} }] },
    {
      nav: {eng:"pages",arb:"الصفحات"},
      navList: [
        { nav: {eng:"about",arb:"عنا"} },
        { nav: {eng:"our services",arb:"خدماتنا"} },
        { nav: {eng:"login",arb:"تسجيل الدخول"} },
      ],
    },
    { nav: {eng:"contact",arb:"تواصل معنا"} },
  ];

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={lang}
        dir={dir}
        lstContact={lstContact}
        lstSocial={lstSocial}
        navList={lstWebsiteNav}
      />
    </React.Fragment>
  );
}

export default Header;
