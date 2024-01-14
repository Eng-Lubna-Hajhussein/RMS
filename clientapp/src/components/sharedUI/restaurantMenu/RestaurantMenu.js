import React, {  useMemo, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import * as appFunctions from "../../../appHelper/appFunctions";
import "./RestaurantMenu.css";

const styles = {
  addDish: {
    padding: "20px !important",
    borderRadius: "50%",
    backgroundColor: "#ffd40d !important",
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
    width: { lg: "40px", xs: "100%" },
  },
  menuContainer: {
    position: "relative",
    minHeight: "600px",
  },
};

export default function RestaurantMenu({
  categories,
  funAddCategory,
  funEditCategory,
  funDeleteCategory,
  blnOnSaveCategory,
  blnOnSaveAction,
  onSaveAction,
  readOnly,
  lang,
  dir,
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
  }, [categories]);

  const [objTabs, setObjTabs] = useState(initialObjTabs);
  const [addTabOpen, setAddTabOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);

  const funAddTab = ({ bigID, strName }) => {
    const tab = { bigID: bigID, strName: strName, bigParentID: 0 };
    setObjTabs({
      ...objTabs,
      tabs: [...objTabs.tabs, tab],
      tabsContent: { ...objTabs.tabsContent, [bigID]: [] },
    });
    funAddCategory(tab);
  };
  const funDeleteTab = (tab) => {
    if (objTabs.tabsContent[tab.bigID].length) {
      setObjTabs({ ...objTabs, categoryOnAction: null });
      Alert.viewAlert("You Can't Delete A Tab That Has Items!", "error");
      return;
    }
    objTabs.categoryOnAction = null;
    objTabs.tabs = objTabs.tabs.filter(({ bigID }) => tab.bigID !== bigID);
    delete objTabs.tabsContent[tab.bigID];
    setObjTabs({ ...objTabs });
    funDeleteCategory(tab);
  };
  const funAddItem = ({ strName, strDescription, strPrice }) => {
    const bigID = appFunctions.generateID(10);
    const bigParentID = objTabs.activeTab.bigID;
    const item = {
      bigID: bigID,
      bigParentID: bigParentID,
      strName: strName,
      jsnProductInfo: {
        strDescription: strDescription,
        strPrice: strPrice,
      },
    };
    objTabs.tabsContent[bigParentID].push(item);
    funAddCategory(item);
  };
  const funEditItem = (item) => {
    const itemIndex = objTabs.tabsContent[item.bigParentID].findIndex(
      ({ bigID }) => item.bigID === bigID
    );
    objTabs.categoryOnAction = null;
    objTabs.tabsContent[item.bigParentID][itemIndex] = item;
    setObjTabs({ ...objTabs });
    funEditCategory(item);
  };
  const funDeleteItem = (item) => {
    objTabs.tabsContent[item.bigParentID] = objTabs.tabsContent[
      item.bigParentID
    ].filter(({ bigID }) => item.bigID !== bigID);
    setObjTabs({ ...objTabs });
    objTabs.categoryOnAction = null;
    funDeleteCategory(item);
  };

  return (
      <Grid container className="menu" justifyContent={"center"}>
        <Grid item container xs="12" justifyContent={"center"}>
          {objTabs.tabs.map((tab, index) => (
            <Grid item container lg="2" xs={"4"} py={3} px={2}>
              <Grid
                container
                item
                xs="12"
                justifyItems={"center"}
                className={
                  `${tab.bigID}` === `${objTabs.activeTab.bigID}`
                    ? "nav-link active"
                    : "nav-link nav"
                }
                onClick={() => {
                  setObjTabs({
                    ...objTabs,
                    activeTab: tab,
                    categoryOnAction: null,
                  });
                }}
              >
                <Grid
                  item
                  lg="12"
                  sx={{ display: { lg: "flex", xs: "none" } }}
                  className="icon-container"
                >
                  <img
                    src={tab?.jsnProductInfo?.strIconPath}
                    height={"50px"}
                    className={
                      `${tab.bigID}` === `${objTabs.activeTab.bigID}`
                        ? "tab-icon active"
                        : "tab-icon"
                    }
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
        </Grid>

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
            sx={{
              position: "absolute",
              height: "100%",
              right: dir === "rtl" && "10px",
              left: dir === "ltr" && "10px",
              top: "60px",
              display: { lg: "flex", xs: "none" },
            }}
          >
            <Box
              component={"img"}
              src={objTabs.activeTab.jsnProductInfo.strImgPath}
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
                    src={objTabs.activeTab.jsnProductInfo.strImgPath}
                    width={"200px"}
                    height={"200px"}
                    sx={styles.menuImgCat}
                  />
                </Grid>
                <Grid item lg="11" xs={"12"} px-0>
                  <Grid container justify={"start"}>
                    <Grid item xs={blnOnSaveCategory ? "10" : "12"}>
                      <Typography sx={styles.menuTitle}>
                        {objTabs.activeTab.jsnName[lang]}
                      </Typography>
                    </Grid>
                    {objTabs?.tabsContent[objTabs.activeTab.bigID].map(
                      (item, index, tabContent) => (
                        <Grid item xs="12" px-0>
                          <Grid
                            container
                            justify={"start"}
                            alignItems={"center"}
                            alignSelf={"flex-start"}
                            py={2}
                            sx={{
                              borderBottom:
                                index !== tabContent.length - 1 &&
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
                                src={item.jsnProductInfo.strImgPath}
                                sx={styles.catImg}
                              />
                            </Grid>

                            <Grid item xs={blnOnSaveAction ? "5" : "7"} px={1}>
                              <Typography sx={styles.dishName}>
                                {item.jsnName[lang]}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              container
                              xs={blnOnSaveAction ? "4" : "4"}
                              justifySelf={"flex-end"}
                              justifyContent={"flex-end"}
                              justifyItems={"flex-end"}
                            >
                              <Typography sx={styles.dishPrice}>
                                ${item.jsnProductInfo.strPrice}
                              </Typography>
                            </Grid>
                            <Grid item xs={"9"} p-0 m-0>
                              <Typography sx={styles.dishDescription}>
                                {item.jsnProductInfo.jsnDescription[lang]}
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
      </Grid>
  );
}
