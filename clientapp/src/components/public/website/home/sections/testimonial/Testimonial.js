import { Box, Grid, Rating, Typography } from "@mui/material";
import quoteIcon from "assets/image/quote.png";
import img1 from "assets/image/bratlee-hamint-1.jpg";
import img2 from "assets/image/bratlee-hamint-2.jpg";
import img3 from "assets/image/bratlee-hamint-3.jpg";
import ReviewCarousel from "components/sharedUI/reviewCarousel/ReviewCarousel";
import ReviewCard from "components/sharedUI/reviewCard/ReviewCard";
import Carousel from "components/sharedUI/carousel/Carousel";
import { useMemo } from "react";

const style = {
  container: {
    height: "114vh",
    marginTop: "50px !important",
    xs: {
      height: "fit-content",
    },
  },
  containerItem: {
    height: "100%",
    xs: {},
  },
  fullHeight: {
    height: "100%",
  },
  title: {
    color: "#f3274c !important",
    fontSize: "18px !important",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800 !important",
    width: "100%",
    xs: {},
  },
  subtitle: {
    color: "#000 !important",
    fontSize: "40px !important",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800 !important",
    width: "100%",
    fontFamily: "sans-serif",
    xs: {
      fontSize: "20px !important",
      letterSpacing: "0px",
    },
  },
  img1: {
    position: "absolute",
    top: "0",
    left: "300px",
    borderRadius: "30px",
    xs: {},
  },
  img2: {
    position: "absolute",
    top: "160px",
    left: "80px",
    zIndex: "-1",
    borderRadius: "30px",
    xs: {},
  },
  img3: {
    position: "absolute",
    top: "280px",
    left: "80px",
    left: "330px",
    borderRadius: "30px",
    xs: {},
  },
};

function Testimonial({ lang, dir, lstSystemReviews, jsnTestimonialSection }) {
  const slides = useMemo(() => {
    return lstSystemReviews.map((item) => ({
      slideContent: <ReviewCard lang={lang} dir={dir} review={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstSystemReviews]);
  return (
    <Grid
      container
      sx={{
        height: "fit-content",
        marginTop: "50px",
        marginBottom: "50px",
      }}
      alignContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Grid item container lg="6" xs="12">
        <Grid item xs="12">
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#f3274c",
              fontSize: { lg: "25px", xs: "15px" },
              letterSpacing: dir === "ltr" && "2px",
              fontWeight: "800",
            }}
          >
            {jsnTestimonialSection?.jsnTitle[lang]}
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography
            sx={{
              color: "#000",
              fontSize: { lg: "50px", xs: "20px" },
              fontWeight: "800",
              textTransform: "capitalize",
            }}
          >
            {jsnTestimonialSection?.jsnSubtitle[lang]}
          </Typography>
        </Grid>
        <Grid item container pt={3} lg="10" xs="12">
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
        sx={{
          position: "relative",
          height: "fit-content",
          minHeight: "600px",
          display: { lg: "flex", xs: "none" },
        }}
      >
        <Grid item xs="12">
          <img
            src={jsnTestimonialSection?.strImg1Path}
            width={"200px"}
            height={"200px"}
            style={style.img1}
          />
        </Grid>
        <Grid item xs="12">
          <img
            src={jsnTestimonialSection?.strImg2Path}
            width={"280px"}
            style={style.img2}
            height={"300px"}
          />
        </Grid>
        <Grid item xs="12">
          <img
            src={jsnTestimonialSection?.strImg3Path}
            width={"280px"}
            height={"300px"}
            style={style.img3}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Testimonial;
