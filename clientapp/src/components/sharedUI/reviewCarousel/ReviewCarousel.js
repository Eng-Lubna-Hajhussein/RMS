import "./ReviewCarousel.css";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import React, { useState } from "react";
import { Grid, Typography, Button, Box, Icon, Rating } from "@mui/material";
import mealImg from "assets/image/pizze-img.png";
import { dictionary } from "appHelper/appDictionary";
import quoteIcon from "assets/image/quote.png";

export const ReviewCarousel = ({ lstSystemReviews, lang, dir }) => {
  const [slide, setSlide] = useState(0);
  return (
    <Grid container item xs='12' className="review-carousel">
      {lstSystemReviews.map((review, idx) => {
        return (
          <div
            className={slide === idx ? "slide" : "slide slide-hidden"}
          >
            <Grid item container xs='12'
            sx={{
              minHeight:"fit-content",
            }}
            >
            <Box
              sx={{
                paddingY: { lg: "40px", xs: "40px" },
                paddingX: { lg: "40px", xs: "20px" },
                border: "5px solid #ffd40d",
                borderRadius: "30px",
                minHeight: { lg: "300px", xs: "200px" },
                height: "fit-content",
                width: "100%",
              }}
            >
              <Grid
                item
                container
                xs="12"
                sx={{ height: "100%" }}
                alignContent={"flex-start"}
              >
                <Grid
                  item
                  xs="12"
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "20px", xs: "12px" },
                      color: "#555",
                      fontWeight: "400",
                    }}
                  >
                    {review?.jsnComment[lang]
                      ? review?.jsnComment[lang]
                      : lang === "arb"
                      ? "لم يقم هذا المستخدم بالتعليق باللغة العربية"
                      : "user did not comment in english language"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs="12"
                  pt={2}
                  container
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs="12">
                    <Typography
                      sx={{
                        fontSize: { lg: "26px", xs: "15px" },
                        color: "#000",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      {review?.jsnUserName[lang]}
                    </Typography>
                  </Grid>
                  <Grid item xs="12" container alignContent={"center"}>
                    <Rating value={review?.intRating} />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs="12"
                  container
                  alignContent={"end"}
                  alignItems={"end"}
                  justifyContent={"flex-end"}
                  justifyItems={"flex-end"}
                  sx={{ display: { lg: "flex", xs: "none" } }}
                >
                  <Box
                    sx={{
                      height: "70px",
                      width: "70px",
                      textAlign: "center",
                      background: "#ffd40d",
                      borderRadius: "100%",
                    }}
                  >
                    <Grid
                      container
                      sx={{ height: "100%" }}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Box
                        component={"img"}
                        src={quoteIcon}
                        sx={{ height: "30px", width: "30px" }}
                      />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            </Grid>
          </div>
        );
      })}
      <Grid
        item
        container
        xs="12"
        px={2}
        justifyContent={"start"}
        className="review-carousel-indicators"
      >
        {lstSystemReviews.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx
                  ? "review-carousel-indicator"
                  : "review-carousel-indicator review-carousel-indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default ReviewCarousel;
