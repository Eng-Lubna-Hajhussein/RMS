import React from "react";
import { Box, Grid, Typography, Rating } from "@mui/material";
import shoppingIcon from "assets/image/shopping.svg";

const styles = {
  fullHeight: {
    height: "100%",
  },
  cardPaper: {
    width: "100%",
    height: "500px !important",
    minHeight: "500px !important",
    maxHeight: "500px !important",
    borderRadius: "30px !important",
    position: "relative !important",
    overflow: "hidden",
  },
  cardContent: {
    border: "4px solid #ffd40d",
    height: "100%",
    borderRadius: "30px",
    position: "relative",
    padding: "0 !important",
    margin: "0 !important",
  },
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    width: "60px !important",
    height: "60px !important",
    position: "absolute",
    textAlign: "center",
    top: "9px",
    left: "15px",
    zIndex: "111",
  },
  saleTitle: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "800 !important",
  },
  itemImg: {
    zIndex: "1",
  },
  itemRating: {
    height: "30px !important",
    minHeight: "30px !important",
  },
  itemName: {
    color: "#000",
    fontSize: "19px",
    fontWeight: "800",
    textTransform: "capitalize",
    fontFamily: "sans-serif",
    textTransform: "capitalize",
  },
  dollarSign: {
    color: "#f3274c",
    fontSize: "22px",
    fontWeight: "800",
    fontFamily: "sans-serif",
  },
  price: {
    fontSize: "22px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
  salePrice: {
    textDecoration: "line-through",
    fontSize: "14px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
  shoppingIcon: {
    padding: "10px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
};

function FeaturedCard({ item, lang }) {
  return (
    <Box px={2} sx={styles.cardPaper}>
      <Grid
        container
        sx={styles.fullHeight}
        alignItems={"center"}
        alignSelf={"center"}
      >
        <Grid
          item
          xs="12"
          container
          justifyContent={"center"}
          alignItems={"center"}
          alignSelf={"center"}
          sx={styles.cardContent}
        >
          {item?.jsnCategoryInfo?.blnOnSale && (
            <Box sx={styles.saleBox}>
              <Grid container sx={{ height: "100%" }} alignItems={"center"}>
                <Grid item xs="12" justify={"center"}>
                  <Typography sx={styles.saleTitle}>Sale</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Grid container>
            <Grid
              item
              xs="12"
              container
              sx={{ height: "fit-content" }}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Box
                component={"img"}
                src={item?.jsnCategoryInfo?.strImgPath}
                height={"180px"}
                width={"250px"}
                style={styles.itemImg}
              />
            </Grid>
            <Grid item xs="12">
              <Grid container px={5}>
                <Grid item xs="12">
                  <Typography sx={styles.itemName}>
                    {item?.jsnName[lang]}
                  </Typography>
                </Grid>
                <Grid item xs="12">
                  <Typography
                    sx={{
                      color: "#555",
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    {item?.jsnCategoryInfo?.jsnDescription[lang]}
                  </Typography>
                </Grid>
                <Grid item xs="12">
                  <Grid
                    container
                    alignContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "fit-content" }}
                  >
                    <Grid item xs="12" container>
                      <Grid item>
                        <Typography sx={styles.dollarSign}>$</Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={styles.price}>
                          {item?.jsnCategoryInfo?.blnOnSale
                            ? item?.jsnCategoryInfo?.strSalePrice
                            : item?.jsnCategoryInfo?.strPrice}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {item?.jsnCategoryInfo?.blnOnSale && (
                          <Typography
                            component={"caption"}
                            px-1
                            sx={styles.salePrice}
                          >
                            ${item?.jsnCategoryInfo?.strPrice}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs="12" container justifyContent={"end"}>
                      <img src={shoppingIcon} style={styles.shoppingIcon} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeaturedCard;
