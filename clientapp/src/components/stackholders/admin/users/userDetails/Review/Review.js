import { useContext, useMemo } from "react";
import { Box, Grid, Rating, Typography } from "@basetoolkit/ui";
import noReviewImg from "assets/image/no-review.png";
import { AppContext } from "contextapi/context/AppContext";
import moment from "moment";

const styles = {
  reviewBox: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "200px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  username: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  reviewDate: {
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#555",
  },
  reviewComment: {
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  noReviewBox: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "200px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  noReviewNote: {
    fontSize: "15px",
    fontWeight: "800",
  },
};

function Review({ bigUserID, lang }) {
  const { appState } = useContext(AppContext);
  const lstSystemReviews = appState.systemInfo.lstSystemReviews;
  const userReview = useMemo(() => {
    return lstSystemReviews?.find((review) => review.bigUserID === bigUserID);
  }, []);
  return (
    <Grid container justifyContent={"center"} py={1} px={3}>
      {userReview && (
        <Box sx={styles.reviewBox}>
          <Grid container item xs="12" py={2}>
            <Grid item xs="12">
              <Typography color={"primary"} sx={styles.username}>
                {userReview?.jsnUserName[lang]}
              </Typography>
            </Grid>
            <Grid item xs="8">
              <Typography sx={styles.reviewDate}>
                {moment(new Date(userReview?.dtmReviewDate)).format(
                  "MMM DD,YYYY"
                )}
              </Typography>
            </Grid>
            <Grid item xs="4" container justifyContent={"end"}>
              <Rating value={userReview?.intRating} readOnly />
            </Grid>
            <Grid item xs="12" container py={3}>
              <Typography sx={styles.reviewComment}>
                {userReview?.jsnComment[lang]}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      {!userReview && (
        <Box sx={styles.noReviewBox}>
          <Grid container item xs="12">
            <Grid item xs="8" py={2}>
              <Typography sx={styles.noReviewNote}>
                User Did Not Review The Restaurant Yet!
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Box
                component={"img"}
                height={"200px"}
                width={"100%"}
                src={noReviewImg}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default Review;
