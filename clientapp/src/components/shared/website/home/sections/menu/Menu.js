import React from "react";
import { Grid, Typography } from "@basetoolkit/ui";
import SystemMenu from "components/sharedUI/SystemMenu/SystemMenu";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    lg:{my:"100px"},
    xs:{my:"20px"}
  },
  mainTitle: {
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    textTransform: "capitalize",
    lg:{fontSize:"50px !important"},
    xs:{fontSize:"30px"}
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  titleContainer: {
    lg:{mb:"10px"},
    xs:{mb:"2px"}
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
    <Grid container  sx={styles.container}>
      <Grid
        item
        xs={12}
        sx={styles.titleContainer}
        container
        justifyContent={"center"}
      >
        <Grid item  xs={12} container justifyContent={"center"}>
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
