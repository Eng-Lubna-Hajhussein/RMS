import React, { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SvgIcon,
  Typography,
} from "@basetoolkit/ui";
import "./SystemMenu.css";
import { objAppActions, tabsOptions } from "appHelper/appVariables";
import { Add, MoreVert } from "@mui/icons-material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AddTab from "./AddTab/AddTab";
import OptionList from "../optionList/OptionList";
import AddItem from "./AddItem/AddItem";
import EditItem from "./EditItem/EditItem";
import shoppingIcon from "assets/image/shopping.svg";
import { Link, useParams } from "react-router-dom";
import { badgeClasses, selectClasses } from "@basetoolkit/ui/classes";

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
    textTransform: "capitalize",
    color: "#000",
    fontFamily: "sans-serif",
    fontWeight: "800 !important",
    lineHeight: "1.2 !important",
    lg: { fontSize: "40px !important" },
    xs: { fontSize: "20px" },
  },
  menuPaper: {
    minHeight: "500px",
    height: "500px",
    background: "#f3fbfb !important",
    width: "100%",
    borderRadius: "20px",
    paddingY: "50px",
    overflowY: "auto",
  },
  shoppingBadge: {
    [`&.${badgeClasses.badge}`]: {
      background: App_Primary_Color,
      color: "#fff",
      fontWeight: "800",
    },
  },
  tabName: {
    width: "100%",
    textAlign: "center",
    fontWeight: "800 !important",
    textTransform: "capitalize",
    lg: { fontSize: "15px" },
    xs: { fontSize: "9px" },
  },
  menuImgCat: {
    zIndex: "111",
  },
  dishName: {
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
    textTransform: "capitalize",
    lg: { fontSize: "16px !important" },
    xs: { fontSize: "9px" },
  },
  dishDescription: {
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    textTransform: "capitalize",
    lg: { fontSize: "18px !important", lineHeight: "30px !important" },
    xs: { fontSize: "10px", lineHeight: "20px" },
  },
  dishPrice: {
    fontWeight: "800 !important",
    color: "#f3274c",
    fontFamily: "sans-serif",
    lg: { fontSize: "22px !important" },
    xs: { fontSize: "13px" },
  },
  catImg: {
    lg: { height: "50px", width: "90%" },
    xs: { height: "40px", width: "100%" },
  },
  menuContainer: {
    position: "relative",
    minHeight: "600px",
    height: "600px",
    maxHeight: "600px",
  },
  addTabIcon: {
    background: "transparent",
    width: "100%",
    border: "2px dashed #e4e4e4",
    borderRadius: "10px",
    cursor: "pointer",

    lg: { height: "166px !important" },
    xs: { height: "90px !important" },
  },
  tabOptionListContainer: {
    marginBottom: "-50px",
  },
  lgDisplay: {
    lg: { display: "flex" },
    xs: { display: "none !important" },
  },
  addIcon: {
    color: "#e4e4e4",
  },
  tabImg: {
    position: "absolute",
    height: "100%",
    top: "50px",
    lg: { display: "flex" },
    xs: { display: "none !important" },
  },
  fullHeight: {
    height: "100%",
  },
  xsDisplay: {
    lg: { display: "none !important" },
    xs: { display: "flex" },
  },
  addItemBox: {
    height: "54px",
    width: "54px",
    textAlign: "center",
    borderRadius: "50%",
    background: App_Second_Color,
    cursor: "pointer",
  },
  tab: {
    lg: { pt: "30px" },
    xs: { pt: "20px" },
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

  const { systemName } = useParams();

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
      <Grid container item xs={12} className="menu" justifyContent={"center"}>
        <Grid item container xs={12} justifyContent={"center"}>
          {objTabs?.tabs?.map((tab, index) => (
            <Grid
              item
              container
              key={index}
              lg={2}
              xs={4}
              sx={styles.tab}
              px={2}
            >
              <Grid
                container
                item
                xs={12}
                justifyItems={"center"}
                justifyContent={"center"}
                alignContent={"center"}
                sx={{
                  xs: { height: "90px !important" },
                  lg: { height: "fit-content !important", minHeight: "170px" },
                }}
                className={
                  `${tab?.bigID}` === `${objTabs?.activeTab?.bigID}`
                    ? "nav-link active"
                    : "nav-link nav"
                }
              >
                <Grid
                  item
                  lg={!adminEditMode ? 12 : 10}
                  xs={!adminEditMode ? 12 : 9}
                  container
                  justifyContent="center"
                >
                  <Grid
                    item
                    lg={12}
                    className="icon-container"
                    container
                    justifyContent={"start"}
                    mb={0}
                    pb={0}
                  >
                    <Box
                      component={"img"}
                      src={tab?.jsnCategoryInfo?.strIconPath}
                      sx={{
                        lg: { height: "auto !important" },
                        xs: { height: "40px !important" },
                      }}
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

                  <Grid
                    item
                    lg={12}
                    container
                    mt={0}
                    pt={0}
                    alignContent="center"
                    justifyContent={"center"}
                  >
                    <Typography sx={styles.tabName} className="title">
                      {tab.jsnName[lang]}
                    </Typography>
                  </Grid>
                </Grid>
                {adminEditMode &&
                  `${tab?.bigID}` !== `${objTabs?.activeTab?.bigID}` && (
                    <Grid
                      item
                      lg={1}
                      xs={3}
                      container
                      alignContent={"start"}
                      justifyContent={"end"}
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
              </Grid>
            </Grid>
          ))}
          {adminEditMode && tabsOptions?.length > objTabs?.tabs?.length && (
            <Grid
              item
              container
              lg={2}
              xs={4}
              sx={{ lg: { pt: "30px" }, xs: { pt: "20px" } }}
              px={2}
            >
              <Grid
                container
                item
                xs={12}
                alignItems={"center"}
                justifyContent={"center"}
                sx={styles.addTabIcon}
                onClick={() => setAddTabOpen(true)}
              >
                <Add sx={styles.addIcon} />
              </Grid>
            </Grid>
          )}
        </Grid>
        {!!objTabs?.activeTab && (
          <Grid
            item
            container
            lg={10}
            xs={12}
            alignItems={"center"}
            sx={styles.menuContainer}
            justifyContent={"end"}
            px={2}
          >
            <Grid
              item
              lg={5}
              justifySelf={"center"}
              alignSelf={"center"}
              alignContent={"center"}
              sx={{
                right: dir === "rtl" && "10px",
                left: dir === "ltr" && "10px",
                ...styles.tabImg,
              }}
            >
              <Box
                component={"img"}
                src={objTabs?.activeTab?.jsnCategoryInfo?.strImgPath}
                width={"100%"}
                height={"500px"}
                sx={styles.menuImgCat}
              />
            </Grid>
            <Grid item lg="9" xs={12} justifySelf={"end"}>
              <Paper elevation={0} outline={0} sx={styles.menuPaper}>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems={"start"}
                  alignSelf={"start"}
                  sx={{
                    ...styles.fullHeight,
                    lg: {
                      pl: dir === "ltr" && "180px !important",
                      pr: dir === "rtl" && "180px !important",
                    },
                    xs: { px: "10px !important" },
                  }}
                >
                  <Grid
                    item
                    lg={0}
                    xs={12}
                    container
                    justifyContent={"center"}
                    sx={styles.xsDisplay}
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
                  <Grid item lg={11} xs={12}>
                    <Grid
                      container
                      justifyContent={"start"}
                      sx={{ height: "100%" }}
                      // alignItems={"center"}
                    >
                      <Grid
                        item
                        px={adminEditMode ? 2 : 0}
                        xs={adminEditMode ? 10 : 12}
                      >
                        <Typography sx={styles.menuTitle}>
                          {objTabs.activeTab.jsnName[lang]}
                        </Typography>
                      </Grid>
                      {adminEditMode && (
                        <Grid item xs={2}>
                          <Box
                            sx={styles.addItemBox}
                            onClick={() => setAddItemOpen(true)}
                          >
                            <Grid
                              container
                              sx={styles.fullHeight}
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
                            key={index}
                            xs={12}
                            container
                            alignItems={"start"}
                            sx={{ height: "fit-content" }}
                            alignContent={"start"}
                          >
                            <Grid
                              container
                              item
                              xs={adminEditMode ? 11 : 12}
                              justify={"start"}
                              alignItems={"center"}
                              px={0}
                              alignSelf={"start"}
                              py={2}
                              sx={{
                                borderBottom:
                                  index !== tabsContent.length - 1 &&
                                  "1px dotted #555",
                              }}
                            >
                              <Grid
                                item
                                xs={2}
                                container
                                px={0}
                                alignContent={"center"}
                                sx={{ height: "fit-content" }}
                              >
                                <Box
                                  component={"img"}
                                  src={item.jsnCategoryInfo.strImgPath}
                                  sx={styles.catImg}
                                />
                              </Grid>
                              <Grid item xs={adminEditMode ? 7 : 5} px={"4px"}>
                                {customerEditMode && (
                                  <Link
                                    to={`/customer/product/${item.bigID}/${systemName}/${systemID}`}
                                  >
                                    <Typography sx={styles.dishName}>
                                      {item.jsnName[lang]}
                                    </Typography>
                                  </Link>
                                )}
                                {adminEditMode && (
                                  <Link
                                    to={`/admin/product/${item.bigID}/${systemName}/${systemID}`}
                                  >
                                    <Typography sx={styles.dishName}>
                                      {item.jsnName[lang]}
                                    </Typography>
                                  </Link>
                                )}
                                {!adminEditMode && !customerEditMode && (
                                  <Link
                                    to={`/product/${item.bigID}/${systemName}/${systemID}`}
                                  >
                                    <Typography sx={styles.dishName}>
                                      {item.jsnName[lang]}
                                    </Typography>
                                  </Link>
                                )}
                              </Grid>
                              <Grid
                                item
                                container
                                xs={3}
                                justifySelf={"end"}
                                justifyContent={"end"}
                                justifyItems={"end"}
                              >
                                <Typography sx={styles.dishPrice}>
                                  $
                                  {item.jsnCategoryInfo?.blnOnSale
                                    ? item.jsnCategoryInfo.strSalePrice
                                    : item.jsnCategoryInfo.strPrice}
                                </Typography>
                              </Grid>
                              {customerEditMode && (
                                <Grid
                                  item
                                  xs={2}
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
                              <Grid item xs={9}>
                                <Typography sx={styles.dishDescription}>
                                  {item.jsnCategoryInfo.jsnDescription[lang]}
                                </Typography>
                              </Grid>
                            </Grid>
                            {adminEditMode && (
                              <Grid
                                item
                                xs={1}
                                container
                                justifyContent={"start"}
                                alignItems={"center"}
                                alignContent="center"
                                alignSelf={"start"}
                                sx={{
                                  lg: { py: "20px !important" },
                                  xs: { py: "15px !important" },
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setObjTabs({
                                      ...objTabs,
                                      categoryOnAction: item,
                                    });
                                    setEditItemOpen(true);
                                  }}
                                >
                                  <SvgIcon
                                    icon="edit"
                                    size="small"
                                    variant="filled"
                                  />
                                </IconButton>
                              </Grid>
                            )}
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
          lg={10}
          xs={12}
          alignItems={"center"}
          alignContent={"center"}
          sx={styles.menuContainer}
          justifyContent={"end"}
        >
          <Grid item lg={9} xs={12} justifySelf={"end"}>
            <Paper elevation={0} outline={0} sx={styles.menuPaper}>
              <Grid
                container
                item
                xs={12}
                alignItems={"center"}
                alignSelf={"center"}
                sx={{
                  ...styles.fullHeight,
                  lg: {
                    pl: dir === "ltr" && "180px !important",
                    pr: dir === "rtl" && "180px !important",
                  },
                  xs: { px: "25px !important" },
                }}
              >
                <Grid item lg={11} xs={12}>
                  <Grid container justify={"start"}>
                    <Grid item xs={adminEditMode ? 10 : 12}>
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
          tabsKey={objTabs.tabs.map((tab) => tab.jsnName["eng"])}
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
          onDelete={funDeleteItem}
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
