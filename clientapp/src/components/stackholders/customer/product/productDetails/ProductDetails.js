import React from "react";
import { Grid, Rating, Typography } from "@mui/material";

const styles = {
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
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
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
};

function ProductDetails({
  product,
  lang,
  dir,
}) {
  return (
    <Grid item xs="12" container p={0} m={0}>
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
  );
}

export default ProductDetails;
