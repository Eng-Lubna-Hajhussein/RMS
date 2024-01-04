import { Grid } from "@mui/material";
import EventCard from "components/sharedUI/eventCard/EventCard";
import React from "react";
import eventCardOneImg from "assets/image/restaurant.jpg";
import eventCardTwoImg from "assets/image/restaurant-2.jpg";
import eventCardThreeImg from "assets/image/restaurant-3.jpg";

const eventsList = [
    {
      title: "resturant",
      description:
        "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
      bgImg: eventCardOneImg,
    },
    {
      title: "coctail bar",
      description:
        "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
      bgImg: eventCardTwoImg,
    },
    {
      title: "private dining",
      description:
        "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
      bgImg: eventCardThreeImg,
    },
  ];

function Events(){
    return <React.Fragment>
            <Grid container spacing={5} sx={{paddingLeft:"80px",paddingRight:"80px",marginBottom:"50px"}}>
            {eventsList.map(({ title, description, bgImg }, index) => (
            <Grid
              item
              lg="4"
              sx={{
                paddingTop: index % 2 !== 0 ? "200px !important" : "0px",
              }}
            >
              <EventCard title={title} description={description} bgImg={bgImg} />
            </Grid>
          ))}
            </Grid>
    </React.Fragment>
}

export default Events;