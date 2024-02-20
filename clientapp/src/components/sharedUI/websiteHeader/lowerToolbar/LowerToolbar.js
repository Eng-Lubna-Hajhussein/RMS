import React from "react";
import {
  Toolbar,
  Grid,
  Box,
  Badge,
  IconButton,
  Icon,
  Typography,
  Avatar,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  Menu,
  Language,
  HowToRegOutlined,
} from "@mui/icons-material";
import logoIcon from "assets/image/logo.png";
import NavList from "../../NavList/NavList";
import { dictionary } from "appHelper/appDictionary";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { App_Primary_Color } from "appHelper/appColor";
import useLanguage from "hooks/useLanguage/useLanguage";
import { Link, useParams } from "react-router-dom";

const styles = {
  lowerToolBar: {
    background: "#fff",
    "&": {
      minHeight: "100px",
      paddingLeft: { lg: "50px", xs: "5px" },
      paddingRight: { lg: "50px", xs: "5px" },
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
    width: { lg: "150px", xs: "100%" },
  },
  navListContainer: { display: { lg: "flex", xs: "none" } },
  menuIconContainer: { display: { lg: "none", xs: "flex" } },
  shoppingIcon: {
    color: "#000000",
  },
  reverseBtnContainer: { display: { lg: "flex", xs: "none" } },
  reverseBtnTypography: { fontWeight: "800", width: "100%" },
  menuIcon: { color: "#000" },
  regIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
    border: "2px solid #000",
  },
  regIcon: {
    color: "#000000",
  },
};

function LowerToolbar({
  navList,
  setOpenDrawer,
  customerEditMode,
  intCartProduct,
  lang,
  editable,
  adminNavList,
  websiteLogo,
  dir,
  userName,
  blnUserLogin,
  userNavList,
  userImg,
}) {
  const { onLangChange } = useLanguage();
  const { systemID, systemName } = useParams();
  return (
    <Toolbar sx={styles.lowerToolBar}>
      <Grid container alignItems={"center"}>
        <Grid item lg={1} xs={2}>
          <Badge
            badgeContent={lang === "eng" ? "ar" : "en"}
            sx={styles.langBadge}
            anchorOrigin={{
              vertical: "top",
              horizontal: dir === "ltr" ? "right" : "left",
            }}
          >
            <Language
              fontSize="large"
              sx={styles.languageIcon}
              onClick={onLangChange}
            />
          </Badge>
        </Grid>
        <Grid item container justifyContent={"center"} lg={2} xs={5}>
          {adminNavList && (
            <NavList
              nav={<Box component={"img"} sx={styles.logo} src={websiteLogo} />}
              lang={lang}
              navList={adminNavList}
            />
          )}
          {!adminNavList && (
            <Box component={"img"} sx={styles.logo} src={websiteLogo} />
          )}
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          lg={6}
          sx={styles.navListContainer}
        >
          {navList.map(({ nav, navList, path }, index) => (
            <Grid item xs={2} key={index}>
              <NavList
                nav={nav[lang]}
                path={path}
                navList={navList}
                lang={lang}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          lg={3}
          xs={5}
          alignItems={"center"}
          justifySelf={"flex-end"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
        >
          <Grid
            item
            container
            xs="12"
            alignItems={"center"}
            justifySelf={"flex-end"}
            justifyContent={"flex-end"}
            justifyItems={"flex-end"}
          >
            {customerEditMode&&(
              <Grid item lg={2} display={{lg:"flex",xs:"none"}}>
<Badge badgeContent={intCartProduct} sx={styles.shoppingBadge}>
                  <ShoppingBagOutlined
                    fontSize="large"
                    sx={styles.shoppingIcon}
                  />
                </Badge> 
              </Grid>
            )}
            { (
              <Grid item lg={2} xs={8} display={{lg:"none",xs:"flex"}} container justifyContent={"start"}>
                {/* <Badge badgeContent={intCartProduct} sx={styles.shoppingBadge}>
                  <ShoppingBagOutlined
                    fontSize="large"
                    sx={styles.shoppingIcon}
                  />
                </Badge> */}
                <Grid
                  item
                  container
                  xs={12}
                  display={{ lg: "none", xs: "flex" }}
                  justifyContent={"start"}
                >
                  <Grid item px={1}>
                    {!blnUserLogin && (
                      // <Box sx={styles.regIconBox}>
                      //   <Icon>
                      //     <HowToRegOutlined sx={styles.regIcon} />
                      //   </Icon>
                      // </Box>
                      <NavList
                        nav={
                          <Box sx={styles.regIconBox}>
                        <Icon>
                          <HowToRegOutlined sx={styles.regIcon} />
                        </Icon>
                      </Box>
                        }
                        navList={[
                          { bigNavID: 1342146478, nav: { eng: "home", arb: "الرئيسية" } },
                          { bigNavID: 2344146478, nav: { eng: "menus", arb: "المنيو" } },
                        ]}
                        lang={lang}
                      />
                    )}
                  </Grid>
                  {blnUserLogin && (
                    <Grid item alignSelf={"center"}>
                      <NavList
                        nav={
                          <Avatar
                                src={userImg}
                                height="50px"
                                width="50px"
                              />
                        }
                        navList={userNavList}
                        lang={lang}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}

            <Grid item lg={8} sx={styles.reverseBtnContainer}>
              <AnimButton0001
                label={dictionary.buttons.reverseTableBtn[lang]}
                fullWidth={true}
                color={App_Primary_Color}
              />
            </Grid>
            <Grid
              item
              lg={2}
              xs={4}
              container
              justifyContent={"end"}
              sx={styles.menuIconContainer}
            >
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
      </Grid>
    </Toolbar>
  );
}

export default LowerToolbar;
