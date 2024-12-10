import React from "react";
import {
  Box,
  Grid,
  Rating,
  Typography,
  useMediaQueryMatch,
  useTheme,
} from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    lg: { width: "60px", height: "60px" },
    xs: { width: "50px", height: "50px" },
  },
  saleTitle: {
    color: "#000",
    lg: { fontSize: "18px !important" },
    xs: { fontSize: "12px" },
    fontWeight: "800 !important",
  },
  price: {
    lg: { fontSize: "32px" },
    xs: { fontSize: "16px" },
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "green",
  },
  salePrice: {
    textDecoration: "line-through",
    lg: { fontSize: "24px" },
    xs: { fontSize: "12px" },
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "red",
  },
  container: {
    marginY: "5px",
  },
  itemContainer: {
    lg: { my: "50px" },
    xs: { my: 0 },
  },
  imgBox: {
    lg: { height: "430" },
    xs: { height: "fit-content" },
    width: "100%",
    border: (theme) => `4px solid ${theme.palette.secondary.main}`,
    borderRadius: "20px",
  },
  fullHeight: {
    height: "100%",
  },
  productImg: {
    bgcolor: "primary",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
    lg: { height: "300px", width: "250px", p: "50px 30px" },
    xs: { height: "160px", width: "150px", p: "10px" },
  },
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
    fontSize: { lg: "16px", xs: "14px" },
  },
  productDetailsBox: {
    borderRadius: "20px",
    lg: {
      bgcolor: "#f4fcfc",
      height: "230px",
      my: "50px",
      py: "20px",
      px: "20px",
    },
    xs: {
      bgcolor: "#fff",
      height: "fit-content",
      my: "5px",
      py: 0,
      px: "10px",
    },
  },
  productName: {
    color: "#000",
    lg: { fontSize: "40px" },
    xs: { fontSize: "16px" },
    fontWeight: "800",
  },
  productDescription: {
    fontWeight: "800",
    textTransform: "capitalize",
    lg: { fontSize: "25px" },
    xs: { fontSize: "12px" },
    color: "#4e4e4e",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "150px",
    width: "200px",
  },
};

function ProductDetails({ product, lang, dir }) {
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <Grid item xs={12} container sx={styles.itemContainer}>
      <Grid item lg={4} xs={12} px={isExtraSmallAndDown ? "10px" : "20px"}>
        <Box sx={styles.imgBox}>
          <Grid
            container
            sx={styles.fullHeight}
            justifyContent={"center"}
            p={2}
          >
            <Grid item xs={12}>
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
            <Grid item xs={12} container justifyContent={"center"}>
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
        lg={8}
        xs={12}
        px={isExtraSmallAndDown ? "10px" : "20px"}
        container
        alignContent={"start"}
        justifyContent={"end"}
      >
        <Grid item xs={12} py={isExtraSmallAndDown ? "10px" : 0} container>
          <Grid item>
            <Rating
              readOnly
              value={Number(product?.jsnCategoryInfo?.intRating)}
            />
          </Grid>
          <Grid item px={3}>
            <Typography dir={dir} sx={styles.reviewsNum}>
              (
              {(product?.jsnCategoryInfo?.lstReviews?.length || 0) +
                " " +
                dictionary.reviews.reviews[lang]}
              )
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid
            item
            xs={12}
            px={1}
            pb={10}
            justifyContent={"center"}
            sx={styles.productDetailsBox}
          >
            <Grid item xs={12}>
              <Typography sx={styles.productName}>
                {product?.jsnName[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={styles.productDescription}>
                {product?.jsnCategoryInfo?.jsnDescription[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} container>
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
