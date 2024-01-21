import "./Carousel.css";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const styles = {};

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

  return (
    <Grid container mx={0} className="carousel-container">
      <Grid item container xs="12">
        {slides.map((slide, index) => {
          return (
            <div
              className={activeSlide === index ? "slide" : "slide slide-hidden"}
            >
              <Grid
                container
                item
                xs="12"
                sx={{
                  ...slide.sxStyle,
                  ":before": slide?.image && {
                    background: `url(${slide?.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transform: dir === "rtl" && "scaleX(-1)",
                    height: { lg: "600px", xs: "700px" },
                    width: "100%",
                    content: '""',
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    zIndex: "-1",
                  },
                }}
              >
                {activeSlides === 1 && slide?.slideContent}
                {activeSlides === 2 && (
                  <>
                    <Grid item container xs={"12"} lg="6">
                      {slide?.slideContent}
                    </Grid>
                    {slides[index + 1] && (
                      <Grid
                        item
                        container
                        xs={"12"}
                        lg="6"
                        sx={{ display: { lg: "flex", xs: "none" } }}
                      >
                        {slides[index + 1]?.slideContent}
                      </Grid>
                    )}
                  </>
                )}
                {activeSlides === 3 && (
                  <>
                    <Grid item container xs={"12"} lg="4">
                      {slide.slideContent}
                    </Grid>
                    {slides[index + 1] && (
                      <Grid
                        item
                        container
                        xs={"12"}
                        lg="4"
                        sx={{ display: { lg: "flex", xs: "none" } }}
                      >
                        {slides[index + 1]?.slideContent}
                      </Grid>
                    )}
                    {slides[index + 2] && (
                      <Grid
                        item
                        container
                        xs={"12"}
                        lg="4"
                        sx={{ display: { lg: "flex", xs: "none" } }}
                      >
                        {slides[index + 2]?.slideContent}
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </div>
          );
        })}
      </Grid>
      {indicators > 1 && (
        <Grid
          item
          container
          xs="12"
          justifyContent={justify}
          display={{ lg: "flex", xs: "none" }}
          sx={
            inset && {
              marginTop: "-80px",
              paddingX: { lg: "60px !important", xs: "15px" },
            }
          }
          className="indicators"
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
                      ? "indicator"
                      : "indicator indicator-inactive"
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
          xs="12"
          justifyContent={justify}
          display={{ lg: "none", xs: "flex" }}
          sx={
            inset && {
              marginTop: "-50px",
              paddingX: { lg: "60px !important", xs: "15px" },
            }
          }
          className="indicators"
        >
          {Array(indicators)
            .fill(1)
            .map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeSlide === index
                      ? "indicator"
                      : "indicator indicator-inactive"
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
