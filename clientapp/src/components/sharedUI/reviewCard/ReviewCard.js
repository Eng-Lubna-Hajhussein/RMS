import { Box, Grid, Rating, Typography } from "@mui/material";
import quoteIcon from "assets/image/quote.png";
import { Link, useParams } from "react-router-dom";

const styles = {
  box: {
    paddingY: { lg: "40px", xs: "40px" },
    paddingX: { lg: "40px", xs: "20px" },
    border: "5px solid #ffd40d",
    borderRadius: "30px",
    minHeight: { lg: "300px", xs: "200px" },
    height: { lg: "300px", xs: "200px" },
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  review: {
    fontSize: { lg: "20px", xs: "12px" },
    color: "#555",
    fontWeight: "400",
  },
  username: {
    fontSize: { lg: "26px", xs: "15px" },
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  quoteIconBox: {
    height: "70px",
    width: "70px",
    textAlign: "center",
    background: "#ffd40d",
    borderRadius: "100%",
  },
  quoteIcon: {
    height: "30px",
    width: "30px",
  },
  reviewContainer: {
    height: {lg:"150px",xs:"50px"},
    overflow: "auto",
  },
  lgDisplay: {
    display: { lg: "flex", xs: "none" },
  },
};

function ReviewCard({ review, lang, dir }) {
  const {systemName,systemID} = useParams();
  return (
    <Box sx={styles.box}>
      <Grid
        item
        container
        xs={12}
        sx={styles.fullHeight}
        alignContent={"flex-start"}
      >
        <Grid item xs={12} sx={styles.reviewContainer}>
          <Typography sx={styles.review}>
            {review?.jsnComment[lang]
              ? review?.jsnComment[lang]
              : lang === "arb"
              ? "لم يقم هذا المستخدم بالتعليق باللغة العربية"
              : "user did not comment in english language"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          pt={2}
          container
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            {systemID&&<Link to={`/profile/${review?.bigUserID}/${systemName}/${systemID}`}>
            <Typography sx={styles.username}>
              {review?.jsnUserName[lang]}
            </Typography>
            </Link>}
            {!systemID&&<Typography sx={styles.username}>
              {review?.jsnUserName[lang]}
            </Typography>}
          </Grid>
          <Grid item xs={12} container alignContent={"center"}>
            <Rating value={review?.intRating} readOnly />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignContent={"end"}
          alignItems={"end"}
          justifyContent={"flex-end"}
          justifyItems={"flex-end"}
          sx={styles.lgDisplay}
        >
          <Box sx={styles.quoteIconBox}>
            <Grid
              container
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box component={"img"} src={quoteIcon} sx={styles.quoteIcon} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReviewCard;
