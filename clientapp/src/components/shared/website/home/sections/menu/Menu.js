import React from "react";
import { Grid, Typography } from "@mui/material";
import RestaurantMenu from "components/sharedUI/restaurantMenu/RestaurantMenu";

const styles = {
  container: {
    marginY: "100px",
  },
  mainTitle: {
    fontSize: "50px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
};

function Menu({ categories, lang, dir }) {
  return (
    <Grid container sx={styles.container}>
      <Grid item lg="12" mb={4} container justifyContent={"center"}>
        <Grid item lg="12" container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>Discover Menu</Typography>
        </Grid>
        <Grid item lg="3" xs={"6"} pt-0 sx={styles.line} />
      </Grid>
      <RestaurantMenu
        categories={categories}
        blnOnSaveCategory={true}
        lang={lang}
        dir={dir}
      />
    </Grid>
  );
}

export default Menu;