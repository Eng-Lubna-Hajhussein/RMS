import { Box, Grid, Rating, Typography } from "@basetoolkit/ui";
import quoteIcon from "assets/image/quote.png";
import { Link, useParams } from "react-router-dom";

const styles = {
  box: {
    border: "5px solid #ffd40d",
    borderRadius: "30px",
    width: "100%",
    lg: { p: "10px", minHeight: "350px", height: "350px" },
    xs: { py: "20px", px: "20px", minHeight: "200px", height: "200px" },
  },
  fullHeight: {
    height: "100%",
  },
  review: {
    lg: { fontSize: "20px" },
    xs: { fontSize: "12px" },
    color: "#555",
    fontWeight: "400",
  },
  username: {
    lg: { fontSize: "26px" },
    xs: { fontSize: "15px" },
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
    lg: { height: "150px" },
    xs: { height: "50px" },
    overflow: "auto",
  },
  lgDisplay: {
    lg: { display: "flex !important" },
    xs: { display: "none !important" },
  },
};

function ReviewCard({ review, lang, dir }) {
  const { systemName, systemID } = useParams();
  return (
    <Box sx={styles.box}>
      <Grid
        item
        container
        xs={12}
        sx={styles.fullHeight}
        alignContent={"start"}
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
            {systemID && (
              <Link
                to={`/profile/${review?.bigUserID}/${systemName}/${systemID}`}
              >
                <Typography sx={styles.username}>
                  {review?.jsnUserName[lang]}
                </Typography>
              </Link>
            )}
            {!systemID && (
              <Typography sx={styles.username}>
                {review?.jsnUserName[lang]}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} container p={0} m={0} alignContent={"center"}>
            <Rating value={review?.intRating} readOnly />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignContent={"end"}
          alignItems={"end"}
          justifyContent={"end"}
          justifyItems={"end"}
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
