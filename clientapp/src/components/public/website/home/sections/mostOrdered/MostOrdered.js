import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import mostOrderedCardOneImg from "assets/image/bbq.jpg";
import mostOrderedCardTwoImg from "assets/image/cocktail.jpg";
import Carousel from "components/sharedUI/carousel/Carousel";
import MostOrderedCard from "components/sharedUI/mostOrderedCard/MostOrderedCard";
import MostOrderedCarousel from "components/sharedUI/mostOrderedCarousel/MostOrderedCarousel";
import { useMemo } from "react";

const style = {
    container: {
      paddingTop: "100px !important",
      height: "fit-content !important",
      xs: {
        paddingTop: "40px !important",
      },
    },
    title: {
      color: "#f3274c !important",
      fontSize: "18px !important",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "800 !important",
      xs: {
        fontSize: "15px !important",
      },
    },
    subtitle: {
      fontSize: "40px !important",
      color: "#000 !important",
      fontWeight: "800 !important",
      lineHeight: "1.2",
      fontFamily: "sans-serif",
      xs: {
        fontSize: "25px !important",
      },
    },
    description: {
      fontSize: "15px !important",
      lineHeight: "30px !important",
      color: "#555 !important",
      fontWeight: "400 !important",
    },
    ownerName: {
      fontSize: "23px !important",
      color: "#000",
      display: "block !important",
      fontWeight: "900 !important",
      xs: {
        fontSize: "20px !important",
      },
    },
    avatar: {
      width: "100% !important",
      height: "90px !important",
      backgroundSize: "100% 100% !important",
      xs: {
        height: "80px !important",
      },
    },
    ownerPosition: {
      display: "block !important",
      fontSize: "16px !important",
      lineHeight: "30px !important",
      color: "#555 !important",
      fontWeight: "400 !important",
      xs: {
        fontSize: "12px !important",
        lineHeight: "20px !important",
      },
    },
    positionRelative: {
      position: "relative",
    },
    menuImg: {
      position: "absolute",
      right: "50%",
      zIndex: "1",
    },
    menuPaper: {
      height: "500px !important",
      background: "#f3fbfb",
      width: "100%",
      borderRadius: "20px !important",
    },
    cardMostOrderedPaper: {
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      borderRadius: "30px !important",
      height: "250px !important",
      // position: "relative",
      width: "100%",
    },
    discoverMenu: {
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
    },
    cardMostOrderedTitle: {
      fontSize: "40px !important",
      fontWeight: "800 !important",
      color: "#fff",
      textTransform: "capitalize",
      fontFamily: "sans-serif",
      display: "block !important",
      xs:{
        fontSize: "25px !important",
      }
      // width: "100% !important",
    },
    cardMostOrderedSubtitle: {
      // width: "60% !important",
      display: "block !important",
      color: "#fff",
      fontSize: "18px !important",
      lineHeight: "30px !important",
      xs:{
        fontSize: "14px !important",
      }
    },
    cardMostOrderedCrossBox: {
      backgroundColor: "#ffd40d !important",
      borderRadius: "50% !important",
    //   padding:"35px 5px !important",

      width: "120px !important",
      height: "120px !important",
    //   position: "absolute",
    //   top: "60%",
    //   left: "50px",
      textAlign:"center"
    },
    cardMostOrderedPrice: {
      color: "#f3274c",
      fontSize: "25px !important",
      fontFamily: "sans-serif",
      fontWeight: "800 !important",
    },
    perPerson: {
      color: "#212529",
      fontWeight: "800 !important",
      fontSize: "12px !important",
      fontFamily: "sans-serif",
      textTransform: "capitalize !important",
      // display: "inline-block !important",
      // width: "100%",
    },
  };

export default function MostOrdered({lstMostOrdered,lang,dir}){
  const slides = useMemo(() => {
    return lstMostOrdered.map((item) => ({
      slideContent: (
        <MostOrderedCard
          lang={lang}
          dir={dir}
          item={item}
        />
      ),
      sxStyle: {height: { lg: "fit-content", xs: "fit-content" }},
    }));
  }, [lstMostOrdered]);
    return (
        <Grid
        container
        justifySelf={'center'} justifyItems={'center'} justifyContent={'center'}
        py-3
        
        sx={{
          height: "fit-content",
          marginTop:"50px",
          marginBottom:"50px",
          // paddingLeft: {lg:"60px !important",xs:'15px'},
          // paddingRight: {lg:"60px !important",xs:'15px'},
        }}
      >
        <Grid item container lg={'12'} xs={'12'}>
            {/* <Grid container spacing={4}> */}
            <Carousel slides={slides} activeSlides={2} justify={'center'} activeColor={'#f3274c'} inactiveColor={'#b5b5b5'} lang={lang} dir={dir}  />
        {/* <MostOrderedCarousel list={lstMostOrdered} lang={lang} dir={dir}  /> */}
            {/* </Grid> */}
        </Grid>
     
      </Grid>
    )
}