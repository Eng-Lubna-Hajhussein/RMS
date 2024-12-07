import React from "react";
import {
  Grid,
  Rating,
  TextField,
  Typography,
} from "@basetoolkit/ui";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  textField: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

function CustomerReview({
  handleRatingChange,
  intRating,
  reviewTextEng,
  userReview,
  reviewTextArb,
  handleAdd,
  handleEdit,
  handleDelete,
  lang,
  dir,
}) {
  return (
    <Grid item xs={12}>
      <Grid
        item
        xs={12}
        px={1}
        container
        pb={10}
        justifyContent={"center"}
        sx={{
          background: "#f4fcfc",
          height: "fit-content",
          borderRadius: "20px",
          paddingY: "20px !important",
          lg:{mb:"50px",px:"20px !important"},
          lg:{mb:"20px",px:"10px !important"},
        }}
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
      >
        <Grid item xs={12} container px={2} justifyContent={"start"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              lg: {fontSize:"28px"}, xs: {fontSize:"18px"} ,
              fontWeight: "800",
              color: App_Primary_Color,
              borderBottom: "3px solid #ffd40d",
              width: "fit-content",
            }}
          >
            {dictionary.customerReview.title[lang]} !
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={"start"}>
          <Grid item xs={12} container pt={3}>
            <Grid item lg={6} xs={12} pb={2} px={2}>
              <Rating value={intRating} onChange={handleRatingChange} />
            </Grid>
            <Grid item xs={12} container>
              <Grid item lg={6} xs={12} px={2} py={"10px"}>
                <TextField
                  sx={styles.textField}
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
              <Grid item lg={6} xs={12} px={2} py={"10px"}>
                <TextField
                  sx={styles.textField}
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
                <Grid item lg={2} xs={6}>
                  <AnimButton0001
                    onClick={handleAdd}
                    label={dictionary.buttons.add[lang]}
                    fullWidth={true}
                    color={App_Primary_Color}
                  />
                </Grid>
              )}
              {userReview && (
                <Grid item lg={2} xs={6}>
                  <AnimButton0001
                    onClick={handleDelete}
                    label={dictionary.buttons.delete[lang]}
                    fullWidth={true}
                    color={App_Second_Color}
                  />
                </Grid>
              )}
              {userReview && (
                <Grid item lg={2} xs={6}>
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
  );
}

export default CustomerReview;
