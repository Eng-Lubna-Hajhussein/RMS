import { useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import Carousel from "components/sharedUI/carousel/Carousel";
import MostOrderedCard from "components/sharedUI/mostOrderedCard/MostOrderedCard";

const styles = {
  container: {
    height: "fit-content",
    marginY: "100px",
    paddingX: { lg: "60px", xs: "15px" },
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

export default function MostOrdered({ lstMostOrdered, lang, dir }) {
  const slides = useMemo(() => {
    return lstMostOrdered.map((item) => ({
      slideContent: <MostOrderedCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstMostOrdered]);
  return (
    <Grid
      container
      justifySelf={"center"}
      justifyItems={"center"}
      justifyContent={"center"}
      sx={styles.container}
    >
      <Grid item lg="12" mb={4} container justifyContent={"center"}>
        <Grid item lg="12" container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>Most Ordered</Typography>
        </Grid>
        <Grid item lg="3" xs={"6"} sx={styles.line} />
      </Grid>
      <Grid item container lg={"12"} xs={"12"}>
        <Carousel
          slides={slides}
          activeSlides={2}
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
