import React from "react";
import {
  Grid,
} from "@basetoolkit/ui";
import bgImg from "assets/image/footer.png";
import Info from "./info/Info";
import About from "./about/About";
import Menu from "./menu/Menu";
import Contact from "./contact/Contact";
import Copyrights from "./copyright/Copyright";

const styles = {
  container: {
    lg: {height:"fit-content"}, xs: {height:"fit-content"},
    background: "#f5f8fd",
    paddingTop: "50px",
  },
  containerItem: {
    height: "100%",
    background: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default function Footer({
  jsnSystemContact,
  jsnSystemLocation,
  websiteLogo,
  lang,
  dir,
  blnAdmin
}) {
  const aboutList = [
    {eng:"weekly Special",arb:"افضل طبق اسبوعي"},
    {eng:"most ordered",arb:"الاكثر طلبا"},
    {eng:"featured",arb:"الاطباق المميزة"},
    {eng:"Reservation",arb:"حجز"},
    {eng:"Reviews",arb:"التقاييم"},
  ];
  const menuList = [
    {eng:"dessert",arb:"حلويات"},
    {eng:"drinks",arb:"مشروبات"},
    {eng:"traditional",arb:"طبخات"},
    {eng:"pizza",arb:"بيتزا"},
    {eng:"burger",arb:"برغر"}
  ];
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        xs={12}
        container
        justifyContent={"center"}
        sx={styles.containerItem}
      >
        <Grid item container lg={10} xs={12}>
          <Grid container item xs={12} px={1}>
            <Info
            dir={dir}
            jsnSystemLocation={jsnSystemLocation}
            websiteLogo={websiteLogo}
            lang={lang}
            />
           <About
           aboutList={aboutList}
           dir={dir}
           lang={lang}
           />
           <Menu
           menuList={menuList}
           dir={dir}
           lang={lang}
           />
            <Contact 
            jsnSystemContact={jsnSystemContact}
            lang={lang}
            dir={dir}
            blnAdmin={blnAdmin}
            />
          </Grid>
          <Grid container item xs={12} py={1}>
            <Copyrights
            lang={lang}
            dir={dir}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
