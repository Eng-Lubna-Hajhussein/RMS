import React from "react";
import { Box, Grid, Paper, Typography } from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  paper: {
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    borderRadius: "30px !important",
    lg: { minHeight: "250px !important",height: "auto" },
    xs: { minHeight: "120px" },
    width: "100%",
    border: `6px solid #f3274c !important`,
    padding: "20px !important",
  },
  title: {
    lg: { fontSize: "25px !important" },
    xs: { fontSize: "12px" },
    fontWeight: "800 !important",
    color: "#000",
    textTransform: "capitalize",
    fontFamily: "sans-serif",
  },
  subtitle: {
    color: "#555",
    lg: { fontSize: "15px !important" },
    xs: { fontSize: "12px" },
  },
  crossBox: {
    backgroundColor: "#ffd40d",
    borderRadius: "50% !important",
    lg: { width: "150px !important", height: "150px !important" },
    xs: { width: "100px", height: "100px" },
    textAlign: "center",
  },
  price: {
    color: "#f3274c",
    lg: { fontSize: "25px !important" },
    xs: { fontSize: "15px" },
    fontFamily: "sans-serif",
    fontWeight: "800 !important",
  },
  perPerson: {
    color: "#212529",
    fontWeight: "800 !important",
    lg: { fontSize: "12px !important" },
    xs: { fontSize: "10px" },
    fontFamily: "sans-serif",
    textTransform: "capitalize !important",
  },
  fullHeight: {
    height: "100%",
  },
  itemImg: {
    lg: { height: "180px" },
    xs: { height: "100px" },
  },
  crossBoxGrid: {
    lg: { mt: "-80px" },
    xs: { mt: "-60px" },
  },
};

function MostOrderedCard({ item, lang, dir }) {
  return (
    <Grid container item>
      <Grid item xs={12} container px={2}>
        <Paper sx={styles.paper}>
          <Grid container item sx={styles.fullHeight} alignItems={"start"}>
            <Grid item xs={7} container>
              <Grid item lg={12}>
                <Typography sx={styles.title}>{item?.jsnName[lang]}</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography sx={styles.subtitle}>
                  {item?.jsnCategoryInfo?.jsnDescription[lang]}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              sx={styles.fullHeight}
              alignContent={"center"}
              xs={5}
            >
              <Box
                src={item?.jsnCategoryInfo?.strImgPath}
                component={"img"}
                width={"100%"}
                sx={styles.itemImg}
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid
          item
          lg={12}
          sx={{
            ...styles.crossBoxGrid,
            marginLeft: dir === "ltr" && "30px",
            marginRight: dir === "rtl" && "30px",
          }}
        >
          <Box
            sx={{
              ...styles.crossBox,
              border: item?.jsnCategoryInfo?.blnOnSale && "5px solid #f3274c",
            }}
          >
            <Grid
              container
              sx={styles.fullHeight}
              alignItems={"center"}
              alignSelf={"center"}
            >
              <Grid item xs={12}>
                <Grid container>
                  <Grid item lg={12} container justifyContent={"center"} px={1}>
                    <Typography
                      sx={{
                        ...styles.price,
                        color: item?.jsnCategoryInfo?.blnOnSale
                          ? "#555"
                          : "#f3274c",
                        textDecoration:
                          item?.jsnCategoryInfo?.blnOnSale && "line-through",
                        lg: {
                          fontSize: item?.jsnCategoryInfo?.blnOnSale
                            ? "15px"
                            : "25px",
                        },
                        xs: {
                          fontSize: item?.jsnCategoryInfo?.blnOnSale
                            ? "12px"
                            : "15px",
                        },
                      }}
                    >
                      ${item.jsnCategoryInfo.strPrice}
                    </Typography>
                  </Grid>
                  {item?.jsnCategoryInfo?.blnOnSale && (
                    <Grid item lg={12} container justifyContent={"center"}>
                      <Typography
                        component={"caption"}
                        sx={{ ...styles.price }}
                      >
                        ${item.jsnCategoryInfo.strSalePrice}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item lg={12} container justifyContent={"center"}>
                    <Typography sx={styles.perPerson}>
                      {dictionary.typography.perPerson[lang]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MostOrderedCard;
