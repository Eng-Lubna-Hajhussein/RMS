import React from "react";
import { Toolbar, Grid, Box, Badge, IconButton } from "@mui/material";
import { ShoppingBagOutlined, Menu, Language } from "@mui/icons-material";
import logoIcon from "assets/image/logo.png";
import NavList from "../../navList/NavList";
import { dictionary } from "appHelper/appDictionary";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { App_Primary_Color } from "appHelper/appColor";
import useLanguage from "hooks/useLanguage/useLanguage";

const styles = {
  lowerToolBar: {
    background: "#fff",
    "&": {
      minHeight: "100px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
  },
  langBadge: {
    "& .MuiBadge-badge": {
      background: "transparent",
      color: "#f3274c",
      fontWeight: "800",
      borderRadius: "100%",
    },
  },
  shoppingBadge: {
    "& .MuiBadge-badge": {
      background: "#ffd40d",
      color: "#000000",
      fontWeight: "800",
    },
  },
  languageIcon: {
    color: "#000000",
    cursor: "pointer",
  },
  logo: {
    width: "150px",
  },
  navListContainer: { display: { lg: "flex", xs: "none" } },
  menuIconContainer: { display: { lg: "none", xs: "flex" } },
  shoppingIcon: {
    color: "#000000",
  },
  reverseBtnContainer: { display: { lg: "flex", xs: "none" } },
  reverseBtnTypography: { fontWeight: "800", width: "100%" },
  menuIcon: { color: "#000" },
};

function LowerToolbar({ navList, setOpenDrawer, lang, editable,adminNavList }) {
  const { onLangChange } = useLanguage();
  return (
    <Toolbar sx={styles.lowerToolBar}>
      <Grid container alignItems={"center"}>
        <Grid item lg="1" xs="2">
          <Badge
            badgeContent={lang === "eng" ? "ar" : "en"}
            sx={styles.langBadge}
          >
            <Language
              fontSize="large"
              sx={styles.languageIcon}
              onClick={onLangChange}
            />
          </Badge>
        </Grid>
        <Grid item container justifyContent={'center'} lg="2" xs="5">
          {editable&&<NavList
            nav={<Box component={"img"} sx={styles.logo} src={logoIcon} />}
            lang={lang}
            navList={adminNavList}
          />}
          {!editable&&<Box component={"img"} sx={styles.logo} src={logoIcon} />}
        </Grid>
        <Grid item container lg="6" sx={styles.navListContainer}>
          {navList.map(({ nav, navList }) => (
            <Grid item xs="2">
              <NavList nav={nav[lang]} navList={navList} lang={lang} />
            </Grid>
          ))}
        </Grid>
        <Grid  item  container  lg="3"
          xs="4"
          alignItems={"center"}
          justifySelf={"flex-end"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
        >
          <Grid item lg="2">
            <Badge badgeContent={0} sx={styles.shoppingBadge}>
              <ShoppingBagOutlined fontSize="large" sx={styles.shoppingIcon} />
            </Badge>
          </Grid>
          <Grid item lg="8" sx={styles.reverseBtnContainer}>
            <AnimButton0001
              label={dictionary.buttons.reverseTableBtn[lang]}
              fullWidth={true}
              color={App_Primary_Color}
            />
          </Grid>
          <Grid item xs="2" container sx={styles.menuIconContainer}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 0 }}
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              <Menu sx={styles.menuIcon} fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default LowerToolbar;
