import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";

const styles = {
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    width: "60px",
    height: "60px",
  },
  saleTitle: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "800 !important",
  },
  price: {
    fontSize: "32px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
  salePrice: {
    textDecoration: "line-through",
    fontSize: "24px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
  container: {
    marginY: "5px",
  },
  itemContainer: {
    marginY: "50px",
  },
  box: {
    height: "310px",
    width: "100%",
    border: `4px solid ${App_Second_Color}`,
    borderRadius: "20px",
  },
  fullHeight: {
    height: "100%",
  },
  productImg: {
    height: "200px",
    width: "250px",
    padding: "40px 20px",
    background: App_Primary_Color,
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  productDetailsBox: {
    background: "#f4fcfc",
    height: "230px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  productName: {
    color: "#000",
    fontSize: "40px",
    fontWeight: "800",
  },
  productDescription: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "150px",
    width: "200px",
  },
};

function ProductDetails({ product, lang, dir }) {
  return (
    <Grid item xs="12" container sx={styles.itemContainer}>
      <Grid item xs="4" px={4}>
        <Box sx={styles.box}>
          <Grid
            container
            sx={styles.fullHeight}
            justifyContent={"center"}
            p={2}
          >
            <Grid item xs="12">
              {product?.jsnCategoryInfo?.blnOnSale && (
                <Box sx={styles.saleBox}>
                  <Grid
                    container
                    sx={styles.fullHeight}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <Typography sx={styles.saleTitle}>Sale</Typography>
                  </Grid>
                </Box>
              )}
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Box
                src={product?.jsnCategoryInfo?.strImgPath}
                component={"img"}
                sx={styles.productImg}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs="8"
        px={4}
        container
        alignContent={"start"}
        justifyContent={"end"}
      >
        <Grid item xs="12" container>
          <Grid item>
            <Rating
              readOnly
              value={Number(product?.jsnCategoryInfo?.intRating)}
            />
          </Grid>
          <Grid item px={3}>
            <Typography sx={styles.reviewsNum}>{`( ${
              product?.jsnCategoryInfo?.lstReviews?.length || 0
            } Reviews ) `}</Typography>
          </Grid>
        </Grid>
        <Grid item xs="12" container>
          <Grid
            item
            xs="12"
            px={1}
            pb={10}
            justifyContent={"center"}
            sx={styles.productDetailsBox}
          >
            <Grid item xs="12">
              <Typography sx={styles.productName}>
                {product?.jsnName[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <Typography sx={styles.productDescription}>
                {product?.jsnCategoryInfo?.jsnDescription[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" container>
              <Grid item>
                <Typography sx={styles.price}>
                  $
                  {product?.jsnCategoryInfo?.blnOnSale
                    ? product?.jsnCategoryInfo?.strSalePrice
                    : product?.jsnCategoryInfo?.strPrice}
                </Typography>
              </Grid>
              <Grid item>
                {product?.jsnCategoryInfo?.blnOnSale && (
                  <Typography component={"caption"} sx={styles.salePrice}>
                    ${product?.jsnCategoryInfo?.strPrice}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
