import React from "react";
import { Grid, Rating, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    background: "#f4fcfc",
    height: "fit-content",
    marginY: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    paddingY: "20px",
    paddingX: { lg: "20px", xs: "5px" },
  },
  title: {
    textTransform: "uppercase",
    fontSize: { lg: "28px", xs: "16px" },
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
  },
};

function ProductReview({
  intRating,
  onChangeRating,
  reviewTextEng,
  reviewTextArb,
  userReview,
  handleAdd,
  handleEdit,
  handleDelete,
  lang,
  dir,
}) {
  return (
    <Grid item xs="12" p={0} m={0} container>
      <Grid
        item
        xs="12"
        px={1}
        pb={10}
        justifyContent={"center"}
        sx={styles.container}
      >
        <Grid container>
          <Grid item xs="12" container px={2} justifyContent={"start"}>
            <Typography sx={styles.title}>{dictionary.customerReview.title[lang]} !</Typography>
          </Grid>
          <Grid item xs="12" container justifyContent={"start"}>
            <Grid item xs="12" container pt={3}>
              <Grid item lg="6" xs="12" pb={2} px={2}>
                <Rating value={intRating} onChange={onChangeRating} />
              </Grid>
              <Grid item xs="12" container>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    dir="ltr"
                    inputRef={reviewTextEng}
                    defaultValue={userReview?.jsnComment["eng"]}
                    label={dictionary.labels.reviewEng[lang]}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    defaultValue={userReview?.jsnComment["arb"]}
                    dir="rtl"
                    inputRef={reviewTextArb}
                    label={dictionary.labels.reviewArb[lang]}
                  />
                </Grid>
              </Grid>
              <Grid item xs="12" container justifyContent={"end"} px={2} pt={2}>
                {!userReview && (
                  <Grid item lg="4" xs="6">
                    <AnimButton0001
                      onClick={handleAdd}
                      label={dictionary.buttons.add[lang]}
                      fullWidth={true}
                      color={App_Primary_Color}
                    />
                  </Grid>
                )}
                {userReview && (
                  <Grid item lg="4" xs="6">
                    <AnimButton0001
                      onClick={handleDelete}
                      label={dictionary.buttons.delete[lang]}
                      fullWidth={true}
                      color={App_Second_Color}
                    />
                  </Grid>
                )}
                {userReview && (
                  <Grid item lg="4" xs="6">
                    <AnimButton0001
                      onClick={handleEdit}
                      label={dictionary.buttons.edit[lang]}
                      fullWidth={true}
                      color={App_Primary_Color}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductReview;
