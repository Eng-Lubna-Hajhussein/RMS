import React from "react";
import { Grid, Rating, Typography } from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";

const styles = {
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
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
    lg: { fontSize: "16px" },
    xs: { fontSize: "14px" },
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
};

function ProductDetails({ product, lang, dir }) {
  return (
    <Grid item xs={12} container p={0} m={0}>
      <Grid item xs={12} container>
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
  );
}

export default ProductDetails;
