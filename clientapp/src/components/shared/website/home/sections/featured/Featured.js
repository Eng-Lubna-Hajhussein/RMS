import { useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import FeaturedCard from "components/sharedUI/featuredCard/FeaturedCard";
import Carousel from "components/sharedUI/carousel/Carousel";

const styles = {
  container: {
    backgroundColor: "#f3fbfb",
    height: "fit-content",
    marginY: "100px",
    paddingX: { lg: "60px", xs: "15px" },
    paddingY: "50px",
  },
  mainTitle: {
    fontSize: "50px",
    color: "#000",
    fontWeight: "700",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
    width: "fit-content",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
};

export default function Featured({ lang, dir, lstFeatured }) {
  const slides = useMemo(() => {
    return lstFeatured.map((item) => ({
      slideContent: <FeaturedCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstFeatured,lang,dir]);
  return (
    <Grid
      container
      sx={styles.container}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
    >
      <Grid item lg="12" mb={4} container justifyContent={"center"}>
        <Grid item lg="12" container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>Featured</Typography>
        </Grid>
        <Grid item lg="3" xs={"6"} pt-0 sx={styles.line} />
      </Grid>
      <Grid item lg="12" xs={"12"} alignSelf={"flex-end"}>
        <Grid container alignItems={"flex-end"} alignSelf={"flex-end"}>
          <Grid item xs="12">
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
      </Grid>
    </Grid>
  );
}
