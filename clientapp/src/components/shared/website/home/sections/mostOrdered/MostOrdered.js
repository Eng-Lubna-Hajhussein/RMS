import { useMemo } from "react";
import { Grid, Typography, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import Carousel from "components/sharedUI/carousel/Carousel";
import MostOrderedCard from "components/sharedUI/mostOrderedCard/MostOrderedCard";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    height: "fit-content",
    lg:{my:"100px",px:"60px"},
    xs:{my:"20px",px:"10px"}
  },
  mainTitle: {
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    textTransform: "capitalize",
    lg:{fontSize:"50px !important"},
    xs:{fontSize:"30px"}
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  titleContainer: {
    lg: {mb:"50px"}, xs: {mb:"20px"} 
  },
};

export default function MostOrdered({ lstMostOrdered, lang, dir }) {
  const theme = useTheme();
  const isLargeAndDown = useMediaQueryMatch(theme.breakpoints.down("lg"));
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  const slides = useMemo(() => {
    return lstMostOrdered.map((item) => ({
      slideContent: <MostOrderedCard lang={lang} dir={dir} item={item} />,
      sxStyle: { height: "fit-content" },
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
      <Grid item xs={12}
      display={isExtraSmallAndDown?"none":"flex"}
       >
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
  );
}
