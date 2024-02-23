import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";

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
  imgBox: {
    height: { lg: "430px", xs: "fit-content" },
    width: "100%",
    border: `4px solid ${App_Second_Color}`,
    borderRadius: "20px",
  },
  fullHeight: {
    height: "100%",
  },
  img: {
    height: { lg: "300px", xs: "160px" },
    width: { lg: "250px", xs: "150px" },
    padding: { lg: "50px 30px", xs: "10px 10px" },
    background: App_Primary_Color,
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
};

function ProductImage({ product, lang, dir }) {
  return (
    <Grid item container p={0} m={0} xs={12}>
      <Box sx={styles.imgBox}>
        <Grid container sx={styles.fullHeight} justifyContent={"center"} p={2}>
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
              sx={styles.img}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default ProductImage;
