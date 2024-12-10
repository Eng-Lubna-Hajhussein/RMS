import React from "react";
import { Grid, Rating, TextField, Typography, useTheme } from "@basetoolkit/ui";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    background: "#f4fcfc",
    height: "fit-content",
    borderRadius: "20px",
    lg: { my: "50px", px: "20px !important" },
    lg: { my: "20px", px: "5px !important" },
  },
  title: {
    textTransform: "uppercase",
    lg: { fontSize: "24px" },
    xs: { fontSize: "16px" },
    fontWeight: "bold",
    color: "primary",
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
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
  const theme = useTheme();
  return (
    <Grid item xs={12} p={0} m={0} container>
      <Grid
        item
        xs={12}
        px={1}
        py={3}
        justifyContent={"center"}
        sx={styles.container}
      >
        <Grid container>
          <Grid item xs={12} container px={2} justifyContent={"start"}>
            <Typography sx={styles.title}>
              {dictionary.customerReview.title[lang]} !
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent={"start"}>
            <Grid item xs={12} container pt={3}>
              <Grid item lg={6} xs={12} pb={2} px={2}>
                <Rating value={intRating} onChange={onChangeRating} />
              </Grid>
              <Grid item xs={12} container>
                <Grid item lg={6} xs={12} p={2}>
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
                <Grid item lg={6} xs={12} p={2}>
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
              <Grid item xs={12} container justifyContent={"end"} px={2} pt={2}>
                {!userReview && (
                  <Grid item lg={4} xs={6}>
                    <AnimButton0001
                      onClick={handleAdd}
                      label={dictionary.buttons.add[lang]}
                      fullWidth={true}
                      color={theme.palette.primary.main}
                    />
                  </Grid>
                )}
                {userReview && (
                  <Grid item lg={4} xs={6}>
                    <AnimButton0001
                      onClick={handleDelete}
                      label={dictionary.buttons.delete[lang]}
                      fullWidth={true}
                      color={theme.palette.secondary.main}
                    />
                  </Grid>
                )}
                {userReview && (
                  <Grid item lg={4} xs={6}>
                    <AnimButton0001
                      onClick={handleEdit}
                      label={dictionary.buttons.edit[lang]}
                      fullWidth={true}
                      color={theme.palette.primary.main}
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
