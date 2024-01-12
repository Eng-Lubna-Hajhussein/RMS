import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./FeaturedCarousel.css";
import FeaturedCard from "../featuredCard/FeaturedCard";


export const FeaturedCarousel = ({ list ,lang}) => {
  const [slide, setSlide] = useState(0);
  const length = Math.ceil(list.length / 3);

  return (
    <Grid
      container
      className="most-ordered-carousel"
      justifyItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs="12">
        {list.map((item, idx) => {
          return (
            <div className={slide === idx ? "slide" : "slide slide-hidden"}>
              <Grid container item >
                <Grid item lg="4" xs={"12"}>
                  <FeaturedCard item={item} lang={lang} />
                </Grid>
                {list[idx + 1] &&<Grid item lg="4" sx={{display:{lg:"flex",xs:"none"}}}>
                  <FeaturedCard item={list[idx+1]} lang={lang} />
                </Grid>}
                {list[idx + 2] &&<Grid item lg="4" sx={{display:{lg:"flex",xs:"none"}}}>
                  <FeaturedCard item={list[idx+2]} lang={lang} />
                </Grid>}
              </Grid>
            </div>
          );
        })}
      </Grid>
      {length>=2&&<Grid item xs="12" sx={{display:{lg:"flex",xs:"none"}}} justifyContent={"center"} container pt={3}>
        {Array(length)
          .fill(1)
          .map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx
                    ? "most-ordered-indicator"
                    : "most-ordered-indicator most-ordered-indicator-inactive"
                }
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
      </Grid>}
      {list.length>1&&<Grid item xs="12" sx={{display:{lg:"none",xs:"flex"}}} justifyContent={"center"} container pt={3}>
        {Array(length)
          .fill(1)
          .map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx
                    ? "most-ordered-indicator"
                    : "most-ordered-indicator most-ordered-indicator-inactive"
                }
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
      </Grid>}
      
    </Grid>
  );
};
export default FeaturedCarousel;
