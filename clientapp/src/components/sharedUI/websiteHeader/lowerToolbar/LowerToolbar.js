import React from "react";
import {
  Toolbar,
  Grid,
  Box,
  Badge,
  IconButton,
  Avatar,
  SvgIcon,
  useMediaQueryMatch,
  useTheme,
} from "@basetoolkit/ui";
import NavList from "../../navList/NavList";
import { dictionary } from "appHelper/appDictionary";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { App_Primary_Color } from "appHelper/appColor";
import useLanguage from "hooks/useLanguage/useLanguage";
import { Link, useParams } from "react-router-dom";
import { badgeClasses } from "@basetoolkit/ui/classes";

const styles = {
  lowerToolBar: {
    background: "#fff",

    height: "100px",
    minHeight: "100px",
    xs: { px: "5px !important" },
    lg: { px: "50px" },
    "&": {
    },
  },
  langBadge: {
    [`&.${badgeClasses.badge}`]: {
      background: "transparent",
      color: "#f3274c",
      fontWeight: "800",
      borderRadius: "100%",
    },
  },
  shoppingBadge: {
    [`&.${badgeClasses.badge}`]: {
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
    xs: { width: "100%" },
    lg: { width: "150px" },
    height: "30px",
  },
  shoppingIcon: {
    fill: "#000000",
  },
  reverseBtnTypography: { fontWeight: "800", width: "100%" },
  regIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
    border: "2px solid #000",
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
  const theme = useTheme();
  const isLargeAndDown = useMediaQueryMatch(theme.breakpoints.down("lg"));
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <Toolbar sx={styles.lowerToolBar} width={"100%"} height={"100px"}>
      <Grid container alignItems={"center"} width={"100%"}>
        <Grid item lg={1} xs={2}>
          <Badge
            badgeContent={lang === "eng" ? "ar" : "en"}
            sx={styles.langBadge}
            anchorOrigin={{
              vertical: "top",
              horizontal: dir === "ltr" ? "right" : "left",
            }}
          >
            <SvgIcon
              icon="language"
              size="large"
              color="black"
              sx={styles.languageIcon}
              onClick={onLangChange}
            />
          </Badge>
        </Grid>
        <Grid item container justifyContent={"center"} lg={2} xs={3}>
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
          display={isExtraSmallAndDown ? "none" : "flex"}
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
          xs={7}
          alignItems={"center"}
          justifySelf={"end"}
          justifyContent={"end"}
          justifyItems={"end"}
        >
          <Grid
            item
            container
            xs={12}
            alignItems={"center"}
            justifySelf={"end"}
            justifyContent={"end"}
            justifyItems={"end"}
          >
            {customerEditMode && (
              <Grid item lg={2} display={isExtraSmallAndDown ? "none" : "flex"}>
                <Badge badgeContent={intCartProduct} sx={styles.shoppingBadge}>
                  <SvgIcon
                    icon="shopping_cart"
                    size="large"
                    sx={styles.shoppingIcon}
                  />
                </Badge>
              </Grid>
            )}
            {
              <Grid
                item
                lg={2}
                xs={9}
                display={isExtraSmallAndDown ? "flex" : "none"}
                container
                justifyContent={"start"}
              >
                <Grid
                  item
                  container
                  xs={12}
                  display={isExtraSmallAndDown?"flex":"none"}
                  justifyContent={"start"}
                >
                  <Grid item px={1}>
                    {!blnUserLogin && (
                      <NavList
                        nav={
                          <Box sx={styles.regIconBox}>
                            <SvgIcon icon="how_to_reg" color="#000" />
                          </Box>
                        }
                        navList={userNavList}
                        lang={lang}
                      />
                    )}
                  </Grid>
                  {blnUserLogin && (
                    <Grid item alignSelf={"center"}>
                      <NavList
                        nav={
                          <Avatar src={userImg} height="50px" width="50px" />
                        }
                        navList={userNavList}
                        lang={lang}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            }

            <Grid item lg={9} display={isExtraSmallAndDown ? "none" : "flex"}>
              <AnimButton0001
                label={
                  editable
                    ? dictionary.buttons.addTableBtn[lang]
                    : dictionary.buttons.reverseTableBtn[lang]
                }
                fullWidth={true}
                color={App_Primary_Color}
              />
            </Grid>
            <Grid
              item
              lg={2}
              xs={3} 
              container
              justifyContent={"end"}
              display={isExtraSmallAndDown ? "flex" : "none"}
              sx={styles.menuIconContainer}
            >
              <IconButton
                edge="start"
                aria-label="menu"
                sx={{ m: 0 }}
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                <SvgIcon icon="menu" size="large" color="common.black" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default LowerToolbar;
