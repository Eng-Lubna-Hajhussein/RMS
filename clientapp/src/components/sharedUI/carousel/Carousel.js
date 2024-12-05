import React, { useState } from "react";
import { Grid, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import AnimationBG from "../AnimationBG/AnimationBG";
import "./Carousel.css";

const styles = {
  container: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    content: '""',
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "-1",
    lg:{height:"600px"},
    xs:{height:"900px"}
  },
  lgDisplay: {
    lg:{display:"flex !important"},
    xs:{display:"none !important"}
  },
  insetIndicators: {
    marginTop: "-80px",
    lg:{px:"600px !important"},
    xs:{px:"15px !important"}
  },
  outsetIndicators: {
    marginTop: "10px",
    background: "red",
  },
};

export const Carousel = ({
  slides,
  activeSlides,
  activeColor,
  inactiveColor,
  justify,
  inset,
  lang,
  dir,
  editable,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const indicators = Math.ceil(slides.length / activeSlides);
  const theme = useTheme();
  const isLargeAndDown = useMediaQueryMatch(theme.breakpoints.down("lg"));
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));

  return (
    <Grid container mx={0} className="custom-carousel-container">
      <Grid item container xs={12}>
        {slides.map((slide, index) => {
          return (
            <div
              className={activeSlide === index ? "custom-slide" : "custom-slide custom-slide-hidden"}
              key={index}
            >
              <AnimationBG type={slide?.bgAnimation || "none"}>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    ...slide.sxStyle,
                    "&:before": slide?.image && {
                      background: `url(${slide?.image})`,
                      transform: dir === "rtl" && "scaleX(-1)",
                      ...styles.container,
                    },
                  }}
                >
                  {activeSlides === 1 && slide?.slideContent}
                  {activeSlides === 2 && index === 0 && (
                    <>
                      <Grid item container xs={12} lg={6}>
                        {slide?.slideContent}
                      </Grid>
                      {slides[index + 1] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={6}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 1]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 2 && index !== 0 && (
                    <>
                      {slides[index * activeSlides]?.slideContent && (
                        <Grid item lg={6} sx={styles.lgDisplay}>
                          {slides[index * activeSlides]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 1]?.slideContent && (
                        <Grid item lg={6} sx={styles.lgDisplay}>
                          {slides[index * activeSlides + 1]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 3 && index === 0 && (
                    <>
                      <Grid item container xs={12} lg={4}>
                        {slide?.slideContent}
                      </Grid>
                      {slides[index + 1] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={4}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 1]?.slideContent}
                        </Grid>
                      )}
                      {slides[index + 2] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={4}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 2]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 3 && index !== 0 && (
                    <>
                      {slides[index * activeSlides]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {slides[index * activeSlides]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 1]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {slides[index * activeSlides + 1]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 2]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {index === 0
                            ? slides[index + 2]?.slideContent
                            : slides[index * activeSlides + 2]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </AnimationBG>
            </div>
          );
        })}
      </Grid>
      {indicators > 1 && (
        <Grid
          item
          container
          xs={12}
          justifyContent={justify}
          display={isExtraSmallAndDown?"none":"flex"}
          sx={inset && styles.insetIndicators}
          className="custom-indicators"
          py={!inset && 3}
        >
          {Array(indicators)
            .fill(1)
            .map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeSlide === index
                      ? "custom-indicator"
                      : "custom-indicator custom-indicator-inactive"
                  }
                  style={{
                    borderColor: activeColor,
                    backgroundColor:
                      activeSlide == index ? "transparent" : inactiveColor,
                  }}
                  onClick={() => setActiveSlide(index)}
                ></button>
              );
            })}
        </Grid>
      )}
      {slides.length > 1 && (
        <Grid
          item
          container
          xs={12}
          justifyContent={justify}
          display={isExtraSmallAndDown?"flex":"none"}
          sx={inset && styles.insetIndicators}
          className="custom-indicators"
          py={!inset && 2}
        >
          {Array(indicators)
            .fill(1)
            .map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeSlide === index
                      ? "custom-indicator"
                      : "custom-indicator custom-indicator-inactive"
                  }
                  style={{
                    borderColor: activeColor,
                    backgroundColor:
                      activeSlide == index ? "transparent" : inactiveColor,
                  }}
                  onClick={() => setActiveSlide(index)}
                ></button>
              );
            })}
        </Grid>
      )}
    </Grid>
  );
};
export default Carousel;
