import React from "react";
import { Grid, Typography } from "@mui/material";
import SystemMenu from "components/sharedUI/SystemMenu/SystemMenu";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    marginY: { lg: "100px", xs: "20px" },
  },
  mainTitle: {
    fontSize: { lg: "50px !important", xs: "30px" },
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    textTransform: "capitalize",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  titleContainer: {
    marginBottom: { lg: "10px", xs: "2px" },
  },
};

function Menu({
  categories,
  lang,
  dir,
  editable,
  addMenuCategory,
  deleteMenuCategory,
  systemID,
  editMenuCategory,
  addWS,
  removeWS,
  ws,
  customerEditMode,
  adminEditMode,
  loggedIn,
  userCart,
  addOrderProduct,
  removeOrderProduct,
}) {
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        lg={12}
        sx={styles.titleContainer}
        container
        justifyContent={"center"}
      >
        <Grid item lg={12} container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>
            {dictionary.menuSection.title[lang]}
          </Typography>
        </Grid>
        <Grid item lg={3} xs={6} sx={styles.line} />
      </Grid>
      <SystemMenu
        categories={categories}
        blnOnSaveCategory={true}
        lang={lang}
        dir={dir}
        funAddCategory={addMenuCategory}
        funDeleteCategory={deleteMenuCategory}
        funEditCategory={editMenuCategory}
        systemID={systemID}
        ws={ws}
        addWS={addWS}
        userCart={userCart}
        addOrderProduct={addOrderProduct}
        removeOrderProduct={removeOrderProduct}
        removeWS={removeWS}
        editable={editable}
        customerEditMode={customerEditMode}
        adminEditMode={adminEditMode}
        loggedIn={loggedIn}
      />
    </Grid>
  );
}

export default Menu;
