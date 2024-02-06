import React, { useMemo, useState } from "react";
import { Badge, Box, Grid, Paper, Typography } from "@mui/material";
import "./SystemMenu.css";
import {
  objAppActions,
  tabsOptions,
} from "appHelper/appVariables";
import { Add, MoreVert } from "@mui/icons-material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AddTab from "./AddTab/AddTab";
import OptionList from "../OptionList/OptionList";
import AddItem from "./AddItem/AddItem";
import EditItem from "./EditItem/EditItem";
import shoppingIcon from "assets/image/shopping.svg";

const styles = {
  addDish: {
    padding: "20px !important",
    borderRadius: "50%",
    backgroundColor: "#ffd40d !important",
    cursor: "pointer",
  },
  shoppingIcon: {
    padding: "8px",
    background: "#ffd40d",
    borderRadius: "10px",
    cursor: "pointer",
  },
  menuTitle: {
    fontSize: { lg: "40px !important", xs: "20px" },
    textTransform: "capitalize",
    color: "#000",
    fontFamily: "sans-serif",
    fontWeight: "800 !important",
    lineHeight: "1.2 !important",
  },
  menuPaper: {
    height: "fit-content !important",
    minHeight: "500px !important",
    background: "#f3fbfb",
    width: "100%",
    borderRadius: "20px !important",
    paddingY: "50px",
    paddingLeft: { xs: "15px !important" },
  },
  shoppingBadge: {
    "& .MuiBadge-badge": {
      background: App_Primary_Color,
      color: "#fff",
      fontWeight: "800",
    },
  },
  tabName: {
    width: "100%",
    textAlign: "center",
    fontWeight: "800 !important",
  },
  menuImgCat: {
    zIndex: "111",
  },
  dishName: {
    fontSize: { lg: "16px !important", xs: "9px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  dishDescription: {
    fontSize: { lg: "18px !important", xs: "9px" },
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: { lg: "30px !important", xs: "20px" },
  },
  dishPrice: {
    fontSize: { lg: "22px !important", xs: "10px" },
    fontWeight: "800 !important",
    color: "#f3274c",
    fontFamily: "sans-serif",
  },
  catImg: {
    height: { lg: "40px", xs: "20px" },
    width: { lg: "90%", xs: "100%" },
  },
  menuContainer: {
    position: "relative",
    minHeight: "600px",
  },
  addTabIcon: {
    background: "transparent",
    width: "100%",
    height: "166px !important",
    border: "2px dashed #e4e4e4",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default function RestaurantMenu({
  categories = [],
  funAddCategory,
  funEditCategory,
  funDeleteCategory,
  addWS,
  removeWS,
  ws,
  systemID,
  lang,
  dir,
  customerEditMode,
  adminEditMode,
  userCart,
  addOrderProduct,
}) {
  const initialObjTabs = useMemo(() => {
    const objTabs = categories
      .sort((a, b) => a.bigParentID - b.bigParentID)
      .reduce(
        (objTabs, category) =>
          category.bigParentID === 0
            ? {
                ...objTabs,
                tabs: [...objTabs.tabs, category],
                tabsContent: { ...objTabs.tabsContent, [category.bigID]: [] },
              }
            : {
                ...objTabs,
                tabsContent: {
                  ...objTabs.tabsContent,
                  [category.bigParentID]: [
                    ...objTabs.tabsContent[category.bigParentID],
                    category,
                  ],
                },
              },
        {
          activeTab: {},
          tabsContent: {},
          tabs: [],
          categoryOnAction: null,
        }
      );
    objTabs.activeTab = objTabs.tabs[0];
    return objTabs;
  }, []);
  
  const [objTabs, setObjTabs] = useState(initialObjTabs);
  const [addTabOpen, setAddTabOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);

  const funAddTab = (tab) => {
    if (!objTabs?.tabs?.length) {
      objTabs.activeTab = tab;
    }
    objTabs.tabs = [...objTabs.tabs, tab];
    objTabs.tabsContent = { ...objTabs.tabsContent, [tab.bigID]: [] };
    setObjTabs({
      ...objTabs,
    });
    funAddCategory(tab);
  };
  const funDeleteTab = (tab) => {
    if (objTabs?.tabsContent[tab.bigID]?.length) {
      setObjTabs({ ...objTabs, categoryOnAction: null });
      alert("You Can't Delete A Tab That Has Items!");
      return;
    }
    const updatedObjTabs = JSON.parse(JSON.stringify(objTabs));
    updatedObjTabs.categoryOnAction = null;
    updatedObjTabs.tabs = updatedObjTabs.tabs.filter(
      ({ bigID }) => tab.bigID !== bigID
    );
    delete updatedObjTabs.tabsContent[tab.bigID];
    updatedObjTabs.activeTab = updatedObjTabs.tabs[0];
    setObjTabs({ ...updatedObjTabs });
    funDeleteCategory(tab.bigID);
  };
  const funAddItem = (item) => {
    objTabs?.tabsContent[item?.bigParentID]?.push(item);
    funAddCategory(item);
  };
  const funEditItem = (item) => {
    const itemIndex = objTabs.tabsContent[item.bigParentID].findIndex(
      ({ bigID }) => item.bigID === bigID
    );
    objTabs.categoryOnAction = null;
    objTabs.tabsContent[item.bigParentID][itemIndex] = item;
    setObjTabs({ ...objTabs, categoryOnAction: null });
    funEditCategory(item);
  };
  const funDeleteItem = (item) => {
    objTabs.tabsContent[item.bigParentID] = objTabs.tabsContent[
      item.bigParentID
    ].filter(({ bigID }) => item.bigID !== bigID);
    setObjTabs({ ...objTabs });
    objTabs.categoryOnAction = null;
    funDeleteCategory(item.bigID);
  };

  const funCalculateItemQuantity = (item) => {
    const product = userCart?.lstProduct?.find(
      ({ bigID }) => `${item.bigID}` === `${bigID}`
    );
    return product ? product?.intQuantity : 0;
  };

  const actionTabNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];

  const actionItemNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "تعديل" } },
  ];

  return (
    <React.Fragment>
      <Grid container className="menu" justifyContent={"center"}>
        <Grid item container xs="12" justifyContent={"center"}>
          {objTabs?.tabs?.map((tab, index) => (
            <Grid item container lg="2" xs={"4"} py={3} px={2}>
              <Grid
                container
                item
                xs="12"
                justifyItems={"center"}
                className={
                  `${tab?.bigID}` === `${objTabs?.activeTab?.bigID}`
                    ? "nav-link active"
                    : "nav-link nav"
                }
              >
                {adminEditMode && (
                  <Grid
                    item
                    lg="12"
                    px={2}
                    sx={{ marginBottom: "-50px" }}
                    container
                    justifyContent={"flex-end"}
                  >
                    <OptionList
                      nav={""}
                      onClick={() => {}}
                      navList={actionTabNavList.map((nav) => ({
                        ...nav,
                        onClick: () => {
                          if (objAppActions["Delete"] === nav.bigNavID) {
                            funDeleteTab(tab);
                          }
                        },
                      }))}
                      endIcon={<MoreVert />}
                      lang={lang}
                    />
                  </Grid>
                )}
                <Grid
                  item
                  lg="12"
                  sx={{ display: { lg: "flex", xs: "none" } }}
                  className="icon-container"
                >
                  <img
                    src={tab?.jsnCategoryInfo?.strIconPath}
                    height={"50px"}
                    className={
                      `${tab?.bigID}` === `${objTabs?.activeTab?.bigID}`
                        ? "tab-icon active"
                        : "tab-icon"
                    }
                    onClick={() => {
                      setObjTabs({
                        ...objTabs,
                        activeTab: tab,
                        categoryOnAction: null,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={"12"} justify={"center"}>
                  <Typography sx={styles.tabName} className="title">
                    {tab.jsnName[lang]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
          {adminEditMode && tabsOptions?.length > objTabs?.tabs?.length && (
            <Grid item container lg={"2"} xs={"4"} py={3} px={2}>
              <Grid
                container
                item
                xs="12"
                alignItems={"center"}
                justifyContent={"center"}
                sx={styles.addTabIcon}
                onClick={() => setAddTabOpen(true)}
              >
                <Add sx={{ color: "#e4e4e4" }} />
              </Grid>
            </Grid>
          )}
        </Grid>
        {!!objTabs?.activeTab && (
          <Grid
            item
            container
            lg="10"
            xs="12"
            alignItems={"center"}
            alignContent={"center"}
            sx={styles.menuContainer}
            justifyContent={"end"}
            pt={5}
          >
            <Grid
              item
              lg={"5"}
              justifySelf={"center"}
              alignSelf={"center"}
              alignContent={"center"}
              sx={{
                position: "absolute",
                height: "100%",
                right: dir === "rtl" && "10px",
                left: dir === "ltr" && "10px",
                top: "70px",
                display: { lg: "flex", xs: "none" },
              }}
            >
              <Box
                component={"img"}
                src={objTabs?.activeTab?.jsnCategoryInfo?.strImgPath}
                width={"100%"}
                height={"80%"}
                sx={styles.menuImgCat}
              />
            </Grid>
            <Grid item lg="9" xs={"12"} justifySelf={"end"}>
              <Paper elevation={0} outline={0} sx={styles.menuPaper}>
                <Grid
                  container
                  item
                  xs="12"
                  alignItems={"center"}
                  alignSelf={"center"}
                  sx={{
                    height: "100%",
                    paddingLeft: { lg: dir === "ltr" && "180px", xs: "25px" },
                    paddingRight: { lg: dir === "rtl" && "180px", xs: "25px" },
                  }}
                >
                  <Grid
                    item
                    lg={"0"}
                    xs={"12"}
                    container
                    justifyContent={"center"}
                    sx={{ display: { lg: "none", xs: "flex" } }}
                    pb={3}
                  >
                    <Box
                      component={"img"}
                      src={objTabs.activeTab.jsnCategoryInfo.strImgPath}
                      width={"200px"}
                      height={"200px"}
                      sx={styles.menuImgCat}
                    />
                  </Grid>
                  <Grid item lg="11" xs={"12"} px-0>
                    <Grid
                      container
                      justify={"start"}
                      sx={{ height: "100%" }}
                      alignItems={"center"}
                    >
                      <Grid item xs={adminEditMode ? "10" : "12"}>
                        <Typography sx={styles.menuTitle}>
                          {objTabs.activeTab.jsnName[lang]}
                        </Typography>
                      </Grid>
                      {adminEditMode && (
                        <Grid item xs={"2"}>
                          <Box
                            sx={{
                              height: "54px",
                              width: "54px",
                              textAlign: "center",
                              borderRadius: "50%",
                              background: App_Second_Color,
                              cursor: "pointer",
                            }}
                            onClick={() => setAddItemOpen(true)}
                          >
                            <Grid
                              container
                              sx={{ height: "100%" }}
                              justifyContent={"center"}
                              alignContent={"center"}
                            >
                              <Add fontSize="medium" />
                            </Grid>
                          </Box>
                        </Grid>
                      )}
                      {objTabs?.tabsContent[objTabs.activeTab.bigID]?.map(
                        (item, index, tabsContent) => (
                          <Grid
                            item
                            xs="12"
                            px-0
                            container
                            alignContent={"start"}
                          >
                            {adminEditMode && (
                              <Grid
                                item
                                xs="1"
                                container
                                justify={"start"}
                                alignItems={"center"}
                                alignSelf={"flex-start"}
                                py={2}
                              >
                                <OptionList
                                  nav={""}
                                  onClick={() => {
                                    setObjTabs({
                                      ...objTabs,
                                      categoryOnAction: item,
                                    });
                                  }}
                                  navList={actionItemNavList.map((nav) => ({
                                    ...nav,
                                    onClick: () => {
                                      if (
                                        objAppActions["Delete"] === nav.bigNavID
                                      ) {
                                        funDeleteItem(item);
                                      }
                                      if (
                                        objAppActions["Edit"] === nav.bigNavID
                                      ) {
                                        setEditItemOpen(true);
                                      }
                                    },
                                  }))}
                                  endIcon={<MoreVert />}
                                  lang={lang}
                                />
                              </Grid>
                            )}
                            <Grid
                              container
                              item
                              xs={adminEditMode ? "11" : "12"}
                              justify={"start"}
                              alignItems={"center"}
                              alignSelf={"flex-start"}
                              py={2}
                              sx={{
                                borderBottom:
                                  index !== tabsContent.length - 1 &&
                                  "1px dotted #555",
                              }}
                            >
                              <Grid
                                item
                                xs="1"
                                container
                                alignContent={"center"}
                                sx={{ height: "fit-content" }}
                              >
                                <Box
                                  component={"img"}
                                  src={item.jsnCategoryInfo.strImgPath}
                                  sx={styles.catImg}
                                />
                              </Grid>
                              <Grid item xs={adminEditMode ? "8" : "6"} px={1}>
                                <Typography sx={styles.dishName}>
                                  {item.jsnName[lang]}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                container
                                xs={"3"}
                                justifySelf={"flex-end"}
                                justifyContent={"end"}
                                justifyItems={"flex-end"}
                              >
                                <Typography sx={styles.dishPrice}>
                                  ${item.jsnCategoryInfo.strPrice}
                                </Typography>
                              </Grid>
                              {customerEditMode && (
                                <Grid
                                  item
                                  xs="2"
                                  px={1}
                                  container
                                  justifyContent={"end"}
                                >
                                  <Badge
                                    badgeContent={funCalculateItemQuantity(
                                      item
                                    )}
                                    sx={styles.shoppingBadge}
                                  >
                                    <Box
                                      component={"img"}
                                      onClick={() => addOrderProduct(item)}
                                      src={shoppingIcon}
                                      sx={styles.shoppingIcon}
                                    />
                                  </Badge>
                                </Grid>
                              )}
                              <Grid item xs={"9"} p-0 m-0>
                                <Typography sx={styles.dishDescription}>
                                  {item.jsnCategoryInfo.jsnDescription[lang]}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Grid>
      {!objTabs?.tabs?.length && (
        <Grid
          item
          container
          lg="10"
          xs="12"
          alignItems={"center"}
          alignContent={"center"}
          sx={styles.menuContainer}
          justifyContent={"end"}
          pt={5}
        >
          <Grid item lg="9" xs={"12"} justifySelf={"end"}>
            <Paper elevation={0} outline={0} sx={styles.menuPaper}>
              <Grid
                container
                item
                xs="12"
                alignItems={"center"}
                alignSelf={"center"}
                sx={{
                  height: "100%",
                  paddingLeft: { lg: dir === "ltr" && "180px", xs: "25px" },
                  paddingRight: { lg: dir === "rtl" && "180px", xs: "25px" },
                }}
              >
                <Grid item lg="11" xs={"12"} px-0>
                  <Grid container justify={"start"}>
                    <Grid item xs={adminEditMode ? "10" : "12"}>
                      <Typography sx={styles.menuTitle}>{"NONE"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      {adminEditMode && (
        <AddTab
          open={addTabOpen}
          handleClose={() => setAddTabOpen(false)}
          onSave={funAddTab}
          tabsKey={objTabs.tabs.map(tab=>tab.jsnName['eng'])}
          systemID={systemID}
          lang={lang}
          dir={dir}
        />
      )}
      {adminEditMode && (
        <AddItem
          open={addItemOpen}
          handleClose={() => setAddItemOpen(false)}
          onSave={funAddItem}
          activeTabID={objTabs?.activeTab?.bigID}
          addWS={addWS}
          ws={ws}
          systemID={systemID}
          lang={lang}
          dir={dir}
        />
      )}
      {adminEditMode && (
        <EditItem
          open={editItemOpen}
          handleClose={() => setEditItemOpen(false)}
          onSave={funEditItem}
          categoryOnAction={objTabs?.categoryOnAction}
          addWS={addWS}
          removeWS={removeWS}
          ws={ws}
          lang={lang}
          dir={dir}
        />
      )}
    </React.Fragment>
  );
}
