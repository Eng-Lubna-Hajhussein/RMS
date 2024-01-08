import React from "react";
import {
  Toolbar,
  Grid,
  Box,
  Typography,
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import { ShoppingBagOutlined, Menu, Language } from "@mui/icons-material";
import logoIcon from "assets/image/logo.png";
import NavList from "../navList/NavList";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  lowerToolBar: {
    background: "#fff",
    "&": {
      minHeight: "100px",
      paddingLeft: { lg: "80px", xs: "20px" },
      paddingRight: { lg: "80px", xs: "10px" },
    },
  },
};

function LowerToolbar({ navList, setOpenDrawer,lang }) {
  return (
    <Toolbar sx={styles.lowerToolBar}>
      <Grid container alignItems={"center"}>
        <Grid item lg="1">
          <Badge
            badgeContent={"en"}
            sx={{
              "& .MuiBadge-badge": {
                background: "transparent",
                color: "#f3274c",
                fontWeight: "800",
                borderRadius: "100%",
              },
            }}
          >
            <Language fontSize="large" sx={{ color: "#000000" }} />
          </Badge>
        </Grid>
        <Grid item lg="2" xs="9">
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
          lg="7"
          sx={{ display: { lg: "flex", xs: "none" } }}
        >
          {navList.map(({ nav, navList }) => (
            <Grid item xs="2">
              <NavList nav={nav[lang]} navList={navList} lang={lang} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          xs="2"
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
              <ShoppingBagOutlined fontSize="large" sx={{ color: "#000000" }} />
            </Badge>
          </Grid>
          <Grid item sx={{ display: { lg: "flex", xs: "none" } }}>
            <Button fullWidth>
              <Typography
                className="animated-btn-001"
                sx={{ fontWeight: "800" }}
              >
                {dictionary.buttons.reverseTableBtn[lang]}
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
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              <Menu sx={{ color: "#000" }} fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default LowerToolbar;
