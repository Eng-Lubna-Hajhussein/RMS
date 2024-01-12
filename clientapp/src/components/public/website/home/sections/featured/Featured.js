import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import featuredDishCardImgOne from "assets/image/featured-dishes-2.png";
import featuredDishCardImgTwo from "assets/image/featured-dishes-3.png";
import featuredDishCardImgThree from "assets/image/featured-dishes-1.png";
import shoppingIcon from "assets/image/shopping.svg";
import FeaturedCarousel from "components/sharedUI/featuredCarousel/FeaturedCarousel";
import FeaturedCard from "components/sharedUI/featuredCard/FeaturedCard";
import Carousel from "components/sharedUI/carousel/Carousel";
import { useMemo } from "react";

const style = {
  container: {
    backgroundColor: "#f3fbfb !important",
      height: "fit-content",
      marginTop:"50px",
      marginBottom:"50px",
      // paddingLeft: {lg:"60px !important",xs:'15px'},
      // paddingRight: {lg:"60px !important",xs:'15px'},
      paddingY:"50px"
    },
  fullHeight: {
    height: "100%",
  },
  title: {
    fontSize: "50px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    xs: {
      fontSize: "30px !important",
    },
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
    xs: {
    },
  },
  cardPaper: {
    width: "100%",
    height: "500px !important",
    minHeight: "500px !important",
    maxHeight: "500px !important",
    borderRadius: "30px !important",
    position: "relative !important",
    overflow: "hidden",
    xs: {
    },
  },
  cardContent: {
    border: "4px solid #ffd40d",
    height: "100%",
    borderRadius: "30px",
    position: "relative",
    padding: "0 !important",
    margin: "0 !important",
    xs: {
    },
  },
  positionAbsolute: {
    position: "absolute",
  },
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    width: "60px !important",
    height: "60px !important",
    position:"absolute",
    textAlign:"center",
    top: "9px",
    left: "15px",
    zIndex: "111",
    xs: {
    },
  },
  saleTitle: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "800 !important",
    xs: {
    },
  },
  imgHighlight: {
    "root":{"&before": {
      background: "#f3274c",
      width: "100% !important",
      height: "140px !important",
      content: '""',
      position: "absolute",
      borderRadius: "111px",
      zIndex: "0",
      top: "60px !important",
    xs: {
      },
    }},
  },
  itemImg: {
    zIndex: "1",
    xs: {
    },
  },
  itemRating: {
   height: "30px !important", minHeight: "30px !important" ,
   xs:{

   }
  },
  itemName: {
    color: "#000",
    fontSize: "19px !important",
    fontWeight: "800 !important",
    textTransform: "capitalize",
    fontFamily: "sans-serif",
    textTransform: "capitalize",
    xs: {
    },
  },
  dollarSign: {
    color: "#f3274c",
    fontSize: "22px !important",
    fontWeight: "800 !important",
    fontFamily: "sans-serif",
    xs: {
    },
  },
  price: {
    fontSize: "22px !important",
    fontWeight: "800 !important",
    fontFamily: "sans-serif",
    color: "#555",
    xs: {
    },
  },
  salePrice: {
    textDecoration: "line-through",
    fontSize: "14px !important",
    fontWeight: "800 !important",
    fontFamily: "sans-serif",
    color: "#555",
    xs: {
    },
  },
  shoppingIcon: {
    padding: "10px",
    background: "#ffd40d",
    borderRadius: "10px",
    xs: {
    },
  },
};

export default function Featured({lang,dir,lstFeatured}) {
  const slides = useMemo(() => {
    return lstFeatured.map((item) => ({
      slideContent: (
        <FeaturedCard
          lang={lang}
          dir={dir}
          item={item}
        />
      ),
      sxStyle: {height: { lg: "fit-content", xs: "fit-content" }},
    }));
  }, [lstFeatured]);
  return (
    <Grid
      container
      sx={style.container}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
    >
      <Grid item lg="12" xs={"12"} alignSelf={"flex-end"}>
        <Grid container   alignItems={"flex-end"}
      alignSelf={"flex-end"}>
          <Grid item xs="12">
          <Carousel slides={slides} activeSlides={3} justify={'center'} activeColor={'#f3274c'} inactiveColor={'#b5b5b5'} lang={lang} dir={dir}  />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
