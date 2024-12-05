import { useMemo } from "react";
import { Grid, Typography, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import FeaturedCard from "components/sharedUI/featuredCard/FeaturedCard";
import Carousel from "components/sharedUI/carousel/Carousel";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    backgroundColor: "#f3fbfb",
    height: "fit-content",
    lg: { my: "100px", px: "60px", py: "50px" },
    xs: { my: "20px", px: "100px", py: "20px" },
  },
  mainTitle: {
     lg: {fontSize:"50px !important"}, xs: {fontSize:"30px"} ,
    color: "#000",
    fontWeight: "700",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
    width: "fit-content",
    textTransform: "capitalize",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
};

export default function Featured({ lang, dir, lstFeatured }) {
  const theme = useTheme();
  const isLargeAndDown = useMediaQueryMatch(theme.breakpoints.down("lg"));
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  const slides = useMemo(() => {
    return lstFeatured.map((item) => ({
      slideContent: <FeaturedCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: "fit-content" },
    }));
  }, [lstFeatured, lang, dir]);
  return (
    <Grid
      container
      sx={styles.container}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
    >
      <Grid item lg={12} mb={4} container justifyContent={"center"}>
        <Grid item lg={12} container justifyContent={"center"}>
          <Typography sx={styles.mainTitle}>
            {dictionary.featuredSection.title[lang]}
          </Typography>
        </Grid>
        <Grid item lg={3} xs={6} pt={0} sx={styles.line} />
      </Grid>
      <Grid item lg={12} xs={12} alignSelf={"end"}>
        <Grid container alignItems={"end"} alignSelf={"end"}>
          <Grid item xs={12} 
          display={isExtraSmallAndDown?"none":"flex"}
          >
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
          <Grid item xs={12}
           display={isExtraSmallAndDown?"flex":"none"}
           >
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
      </Grid>
    </Grid>
  );
}
