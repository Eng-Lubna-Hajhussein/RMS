import React, { useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import TeamCard from "components/sharedUI/teamCard/TeamCard";
import Carousel from "components/sharedUI/carousel/Carousel";
import "./Team.css";

const styles = {
  container: {
    height: "fit-content",
    paddingX: { lg: "60px", xs: "15px" },
    marginY: "100px",
  },
  mainTitle: {
    fontSize: "50px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
};

export default function Team({ lang, lstSystemTeam, dir }) {
  const slides = useMemo(() => {
    return lstSystemTeam.map((item) => ({
      slideContent: <TeamCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstSystemTeam]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"start"}
      sx={styles.container}
    >
      <Grid item lg="12" mb={4} container justifyContent={"center"}>
        <Grid item lg="12" container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>Meet Our Experts</Typography>
        </Grid>
        <Grid item lg="3" xs={"6"} sx={styles.line} />
      </Grid>
      <Grid container item xs="12">
        <Carousel
          slides={slides}
          activeSlides={3}
          justify={"center"}
          activeColor={"#f3274c"}
          inactiveColor={"#b5b5b5"}
          lang={lang}
          dir={dir}
        />
      </Grid>
    </Grid>
  );
}
