import { Box, Grid, Typography } from "@mui/material";
import ReviewCard from "components/sharedUI/ReviewCard/ReviewCard";
import Carousel from "components/sharedUI/Carousel/Carousel";
import { useMemo } from "react";

const styles = {
  container: {
    height: "fit-content",
    marginY: "100px",
    paddingX: { lg: "60px", xs: "15px" },
  },
  title: {
    textTransform: "uppercase",
    color: "#f3274c",
    fontSize: { lg: "25px", xs: "15px" },
    fontWeight: "800",
  },
  subtitle: {
    color: "#000",
    fontSize: { lg: "50px", xs: "20px" },
    fontWeight: "800",
    textTransform: "capitalize",
  },
  leftItemContainer: {
    position: "relative",
    height: "fit-content",
    minHeight: "600px",
    display: { lg: "flex", xs: "none" },
  },
  img1: {
    position: "absolute",
    top: "0",
    left: "300px",
    borderRadius: "30px",
    width: "200px",
    height: "200px",
  },
  img2: {
    position: "absolute",
    top: "160px",
    left: "80px",
    zIndex: "-1",
    borderRadius: "30px",
    width: "280px",
    height: "300px",
  },
  img3: {
    position: "absolute",
    top: "280px",
    left: "80px",
    left: "330px",
    borderRadius: "30px",
    width: "280px",
    height: "300px",
  },
};

function Testimonial({ lang, dir, lstSystemReviews, jsnTestimonialSection }) {
  const slides = useMemo(() => {
    return lstSystemReviews.map((item) => ({
      slideContent: <ReviewCard lang={lang} dir={dir} review={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstSystemReviews]);
  const images = [
    { src: jsnTestimonialSection.strImg1Path, sx: styles.img1 },
    { src: jsnTestimonialSection.strImg2Path, sx: styles.img2 },
    { src: jsnTestimonialSection.strImg3Path, sx: styles.img3 },
  ];
  return (
    <Grid
      container
      sx={styles.container}
      alignContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Grid item container lg={6} xs={12}>
        <Grid item xs={12}>
          <Typography sx={styles.title}>
            {jsnTestimonialSection?.jsnTitle[lang]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={styles.subtitle}>
            {jsnTestimonialSection?.jsnSubtitle[lang]}
          </Typography>
        </Grid>
        <Grid item container pt={3} lg={10} xs={12}>
          <Carousel
            slides={slides}
            activeSlides={1}
            justify={"start"}
            activeColor={"#f3274c"}
            inactiveColor={"#b5b5b5"}
            lang={lang}
            dir={dir}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs="6"
        alignContent={"center"}
        alignItems={"center"}
        sx={styles.leftItemContainer}
      >
        {images.map(({ src, sx }, index) => (
          <Grid item xs="12">
            <Box component={"img"} src={src} sx={sx} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Testimonial;
