import { Box, Grid, Typography } from "@mui/material";
import noReviewImg from "assets/image/no-review.png";
import { AppContext } from "contextapi/context/AppContext";
import { useContext, useMemo } from "react";

function Review({ bigUserID }) {
  const { appState, appDispatch } = useContext(AppContext);
  const lstSystemReviews = appState.systemInfo.lstSystemReviews;
  const userReview = useMemo(() => {
      return lstSystemReviews?.find((review)=>review.bigUserID===bigUserID)
  }, []);
  return (
    <Grid container justifyContent={"center"} py={1} px={3}>
     {!userReview&&<Box
        sx={{
          width: "100%",
          background: "#f4fcfc !important",
          height: "200px",
          borderRadius: "20px",
          paddingX: "20px",
        }}
      >
        <Grid container item xs="12">
          <Grid item xs="8" py={2}>
            <Typography
            sx={{fontSize:"15px",fontWeight:"800"}}>User Did Not Review The Restaurant Yet!</Typography>
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
      </Box>}
    </Grid>
  );
}

export default Review;
