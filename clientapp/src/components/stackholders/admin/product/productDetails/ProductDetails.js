import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import arrowImg from "assets/image/arrow-2.png";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    width: { lg: "60px", xs: "50px" },
    height: { lg: "60px", xs: "50px" },
  },
  saleTitle: {
    color: "#000",
    fontSize: { lg: "18px !important", xs: "12px" },
    fontWeight: "800 !important",
  },
  price: {
    fontSize: { lg: "32px", xs: "16px" },
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "green",
  },
  salePrice: {
    textDecoration: "line-through",
    fontSize: { lg: "24px", xs: "12px" },
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "red",
  },
  container: {
    marginY: "5px",
  },
  itemContainer: {
    marginY: {lg:"50px",xs:"0px"},
  },
  imgBox: {
    height: { lg: "430px", xs: "fit-content" },
    width: "100%",
    border: `4px solid ${App_Second_Color}`,
    borderRadius: "20px",
  },
  fullHeight: {
    height: "100%",
  },
  productImg: {
    height: { lg: "300px", xs: "160px" },
    width: { lg: "250px", xs: "150px" },
    padding: { lg: "50px 30px", xs: "10px 10px" },
    background: App_Primary_Color,
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
    fontSize: { lg: "16px", xs: "14px" },
  },
  productDetailsBox: {
    background: { lg: "#f4fcfc", xs: "#fff" },
    height: { lg: "230px", xs: "fit-content" },
    marginY: { lg: "50px", xs: "5px" },
    borderRadius: "20px",
    paddingY: { lg: "20px", xs: "0px" },
    paddingX: { lg: "20px", xs: "10px" },
  },
  productName: {
    color: "#000",
    fontSize: { lg: "40px", xs: "16px" },
    fontWeight: "800",
  },
  productDescription: {
    fontWeight: "800",
    textTransform: "capitalize",
    fontSize: { lg: "25px", xs: "12px" },
    color: "#4e4e4e",
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
      <Grid
        item
        lg="4"
        xs="12"
        // sx={{
        //   paddingX: { lg: "40px", xs: "0px" },
        // }}
        // display={{ lg: "flex", xs: "none" }}
        sx={{ paddingX: { lg: "20px", xs: "10px" } }}
      >
        <Box sx={styles.imgBox}>
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
        lg="8"
        xs="12"
        sx={{ paddingX: { lg: "20px", xs: "10px" } }}
        container
        alignContent={"start"}
        justifyContent={"end"}
      >
        <Grid item xs="12"
        sx={{paddingY:{lg:"0px",xs:"10px"}}}
        container>
          <Grid item>
            <Rating
              readOnly
              value={Number(product?.jsnCategoryInfo?.intRating)}
            />
          </Grid>
          <Grid item px={3}>
            <Typography dir={dir} sx={styles.reviewsNum}>({
              (product?.jsnCategoryInfo?.lstReviews?.length || 0)+
              ' '+dictionary.reviews.reviews[lang]
           })</Typography>
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
      {/* <Grid
        item
        lg="4"
        xs={12}
        display={{ lg: "none", xs: "flex" }}
        sx={{ paddingX: { lg: "40px", xs: "10px" } }}
      >
        <Box sx={styles.imgBox}>
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
      </Grid> */}
    </Grid>
  );
}

export default ProductDetails;
