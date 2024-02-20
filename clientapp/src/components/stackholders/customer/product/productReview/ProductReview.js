import React from "react";
import { Grid, Rating, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";

const styles = {
  container: {
    background: "#f4fcfc",
    height: "380px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
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
            <Typography sx={styles.title}>Your Review !</Typography>
          </Grid>
          <Grid item xs="12" container justifyContent={"start"}>
            <Grid item xs="12" container py={3}>
              <Grid item xs="6" pb={2} px={2}>
                <Rating value={intRating} onChange={onChangeRating} />
              </Grid>
              <Grid item xs="12" container>
                <Grid item xs="6" px={2}>
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
                    label="Review English"
                  />
                </Grid>
                <Grid item xs="6" px={2}>
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
                    label="Review Arabic"
                  />
                </Grid>
              </Grid>
              <Grid item xs="12" container justifyContent={"end"} p={2}>
                {!userReview && (
                  <AnimButton0001
                    onClick={handleAdd}
                    label={"Add Review"}
                    color={App_Primary_Color}
                  />
                )}
                {userReview && (
                  <AnimButton0001
                    onClick={handleDelete}
                    label={"Delete Review"}
                    color={App_Second_Color}
                  />
                )}
                {userReview && (
                  <AnimButton0001
                    onClick={handleEdit}
                    label={"Edit Review"}
                    color={App_Primary_Color}
                  />
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
