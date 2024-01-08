import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Grid,
  Icon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";
// import AddTab from "./AddTab";
// import AddContentItem from "./AddItem";
import * as appFunctions from "../../../appHelper/appFunctions";
import * as appVariables from "../../../appHelper/appVariables";
import "./RestaurantMenu.css";
// import EditItem from "./EditItem";
// import AddItem from "./AddItem";
import shoppingIcon from "assets/image/shopping.svg";

const style = {
  addDish: {
    padding: "20px !important",
    borderRadius: "50%",
    backgroundColor: "#ffd40d !important",
    cursor: "pointer",
  },
  menuTitle: {
    fontSize: "40px !important",
    textTransform: "capitalize",
    color: "#000",
    fontFamily: "sans-serif",
    fontWeight: "800 !important",
    lineHeight: "1.2 !important",
    xs: {
      fontSize: "30px !important",
    },
  },
  container: {
    height: "100vh",
    paddingTop: "100px !important",
  },
  title: {
    color: "#f3274c !important",
    fontSize: "18px !important",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800 !important",
  },
  subtitle: {
    fontSize: "40px !important",
    color: "#000 !important",
    fontWeight: "800 !important",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
  },
  description: {
    fontSize: "15px !important",
    lineHeight: "30px !important",
    color: "#555 !important",
    fontWeight: "400 !important",
  },
  ownerName: {
    fontSize: "23px !important",
    color: "#000",
    display: "block !important",
    fontWeight: "900 !important",
  },
  avatar: {
    width: "80px !important",
    height: "80px !important",
    backgroundSize: "100% 100% !important",
  },
  ownerPosition: {
    display: "block !important",
    fontSize: "16px !important",
    lineHeight: "30px !important",
    color: "#555 !important",
    fontWeight: "400 !important",
  },
  positionRelative: {
    position: "relative",
  },
  menuImg: {
    position: "absolute",
    right: "70%",
    zIndex: "1",
    xs: {
      position: "inherit",
    },
  },
  menuPaper: {
    height: "fit-content !important",
    minHeight: "500px !important",
    background: "#f3fbfb",
    width: "100%",
    borderRadius: "20px !important",
    // paddingLeft: "180px !important",
    paddingRight: "180px !important",
    paddingTop: "50px",
    paddingBottom: "50px",
    xs: {
      paddingLeft: "15px !important",
    },
  },
  actionMenu: {
    position: "absolute",
    zIndex: "112",
    borderRadius: "10px !important",
  },
  moreActionContainer: {
    position: "relative",
    marginBottom: "-50px !important",
  },
  tabName: {
    width: "100%",
    textAlign: "center",
    fontWeight: "800 !important",
  },
  addTabIcon: {
    background: "transparent",
    width: "100%",
    height: "183px !important",
    border: "2px dashed #e4e4e4",
    borderRadius: "10px",
    cursor: "pointer",
  },
  menuContainer: {
    position: "relative !important",
    height: "500px",
    marginTop: "50px",
    paddingLeft: "100px",
    paddingRight: "50px",
  },
  menuImgItem: {
    position: "absolute",
    top: "5%",
    bottom: "5%",
    // left: "-50px",
    // right:"50px",
    height: "100%",
  },
  menuImgCat: {
    zIndex: "111",
  },
  dishName: {
    fontSize: "16px !important",
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
    xs: {
      fontSize: "13px !important",
    },
  },
  dishDescription: {
    fontSize: "18px !important",
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: "30px !important",
    xs: {
      fontSize: "12px !important",
      lineHeight: "20px !important",
    },
  },
  dishPrice: {
    fontSize: "22px !important",
    fontWeight: "800 !important",
    color: "#f3274c",
    fontFamily: "sans-serif",
    xs: {
      fontSize: "14px !important",
    },
  },
  shoppingIcon: {
    padding: "10px",
    background: "#ffd40d",
    borderRadius: "10px",
    xs: {},
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
  dir
}) {
  const tabsAssets = appVariables.objTabsAssets;
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
    <React.Fragment>
      <Grid
        container
        sx={{
          marginTop: "100px",
          marginBottom: "100px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
        className="menu"
        justifyContent={"center"}
      >
        <Grid item container xs="12" spacing={2} justifyContent={"center"}>
          {objTabs.tabs.map((tab, index) => (
            <Grid item lg="2" xs={"4"} py={3}>
              <Grid
                container
                justifyItems={"center"}
                className={
                  `${tab.bigID}` === `${objTabs.activeTab.bigID}`
                    ? "nav-link active"
                    : "nav-link nav"
                }
              >
                <Grid item lg="12" xs="0" className="icon-container">
                  <img
                    src={tab?.jsnProductInfo?.strIconPath}
                    height={"50px"}
                    className={
                      `${tab.bigID}` === `${objTabs.activeTab.bigID}`
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
                  <Typography sx={style.tabName} className="title">
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
          xs="10"
          alignItems={"center"}
          alignContent={"center"}
          sx={{ position: "relative", height: "600px" }}
          justifyContent={"end"}
          pt={5}
          py={10}
        >
          <Grid
            item
            lg={"5"}
            justifySelf={"center"}
            alignSelf={"center"}
            sx={{
              position: "absolute",
              height: "100%",
              right: "10px",
              top: "60px",
            }}
          >
            <img
              src={objTabs.activeTab.jsnProductInfo.strImgPath}
              width={"100%"}
              height={"80%"}
              style={style.menuImgCat}
            />
          </Grid>
          <Grid item lg="9" xs={"12"} justifySelf={"end"}>
            <Paper elevation={0} outline={0} sx={style.menuPaper}>
              <Grid
                container
                alignItems={"center"}
                alignSelf={"center"}
                sx={{ height: "100%" }}
              >
                <Grid item lg={"0"} xs={"12"}>
                  <img
                    src={objTabs.activeTab.jsnProductInfo.strImgPath}
                    width={"100%"}
                    height={"90%"}
                    style={style.menuImgCat}
                  />
                </Grid>
                <Grid item lg="11" xs={"12"} px-0>
                  <Grid container justify={"start"}>
                    <Grid item xs={blnOnSaveCategory ? "10" : "12"} py-4>
                      <Typography sx={style.menuTitle}>
                        {objTabs.activeTab.jsnName[lang]}
                      </Typography>
                    </Grid>
                    {objTabs?.tabsContent[objTabs.activeTab.bigID].map(
                      (item, index, tabContent) => (
                        <Grid item xs="12" px-0>
                          <Grid
                            container
                            justify={"start"}
                            alignItems={"flex-start"}
                            alignSelf={"flex-start"}
                            py={2}
                            sx={{
                              borderBottom:
                                index !== tabContent.length - 1 &&
                                "1px dotted #555",
                            }}
                          >
                            <Grid item xs='1'>
                              <img src={item.jsnProductInfo.strImgPath} height={'30px'} width={'30'} />
                            </Grid>
                            <Grid item xs={blnOnSaveAction ? "5" : "7"} p-0 m-0>
                              <Typography sx={style.dishName}>
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
                              <Typography sx={style.dishPrice}>
                                ${item.jsnProductInfo.strPrice}
                              </Typography>
                            </Grid>
                            <Grid item xs={"9"} p-0 m-0>
                              <Typography sx={style.dishDescription}>
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
    </React.Fragment>
  );
}
