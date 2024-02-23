import { useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import Carousel from "components/sharedUI/Carousel/Carousel";
import MostOrderedCard from "components/sharedUI/MostOrderedCard/MostOrderedCard";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    height: "fit-content",
    marginY: { lg: "100px", xs: "20px" },
    paddingX: { lg: "60px", xs: "10px" },
  },
  mainTitle: {
    fontSize: { lg: "50px !important", xs: "30px" },
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    textTransform: "capitalize",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  titleContainer: {
    marginBottom: { lg: "50px", xs: "20px" },
  },
};

export default function MostOrdered({ lstMostOrdered, lang, dir }) {
  const slides = useMemo(() => {
    return lstMostOrdered.map((item) => ({
      slideContent: <MostOrderedCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstMostOrdered, lang, dir]);
  return (
    <Grid
      container
      justifySelf={"center"}
      justifyItems={"center"}
      justifyContent={"center"}
      sx={styles.container}
    >
      <Grid
        item
        lg={12}
        sx={styles.titleContainer}
        container
        justifyContent={"center"}
      >
        <Grid item lg={12} container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>
            {dictionary.mostOrderedSection.title[lang]}
          </Typography>
        </Grid>
        <Grid item lg={3} xs={6} sx={styles.line} />
      </Grid>
      <Grid item xs={12} display={{ lg: "flex", xs: "none" }}>
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
        <Grid item xs={12} display={{ lg: "none", xs: "flex" }}>
        <Carousel
          slides={slides}
          activeSlides={1}
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
