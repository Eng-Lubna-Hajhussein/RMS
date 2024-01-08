import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import featuredDishCardImgOne from "assets/image/featured-dishes-2.png";
import featuredDishCardImgTwo from "assets/image/featured-dishes-3.png";
import featuredDishCardImgThree from "assets/image/featured-dishes-1.png";
import shoppingIcon from "assets/image/shopping.svg";

const style = {
  container: {
    backgroundColor: "#f3fbfb !important",
    height:"fit-content",
    padding:"50px",
    paddingLeft:"100px",
    paddingRight:"100px",
    // paddingTop:"200px !important",
    xs: {
    },
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
  const featuredDishesList = [
    {
      name: "Parisian Hamburger",
      rating: 5,
      img: featuredDishCardImgTwo,
      price: "10.85",
      onSale: false,
      salePrice: null,
    },
    {
      name: "Brown Sandwich",
      rating: 5,
      img: featuredDishCardImgThree,
      price: "10.85",
      onSale: false,
      salePrice: null,
    },
    {
      name: "Banana Leaves",
      rating: 5,
      img: featuredDishCardImgOne,
      price: "14.50",
      onSale: true,
      salePrice: "10.85",
    },
  ];
  
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
        <Grid container justify={"center"} spacing={4} py-10>
          {lstFeatured.map(
            (item) => (
              <Grid item lg="4" xs={"12"} p-0 m-0>
                <Paper elevation={0} outline={0} sx={style.cardPaper}>
                  <Grid
                    container
                    sx={style.fullHeight}
                    alignItems={"center"}
                    alignSelf={"center"}
                  >
                    <Grid
                      item
                      xs="12"
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      alignSelf={"center"}
                      sx={style.cardContent}
                    >
                      {item?.blnOnSale && (
                        // <div style={style.positionAbsolute}>
                          <Box sx={style.saleBox}>
                            <Grid
                              container
                              sx={{ height: "100%" }}
                              alignItems={"center"}
                            >
                              <Grid item xs="12" justify={"center"}>
                                <Typography sx={style.saleTitle}>
                                  Sale
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        // </div>
                      )}
                      <Grid container>
                        <Grid item xs="12" container justifyContent={"center"}>
                            <Grid item="6px" sx={style.imgHighlight}>
                              <img
                                src={item?.jsnProductInfo?.strImgPath}
                                height={"250px"}
                                width={'250px'}
                                style={style.itemImg}
                              />
                            </Grid>
                        </Grid>
                        <Grid item xs="12">
                          <Grid  container px={5} >
                            <Grid item xs="12">
                              <Rating
                                color={"#ffd40d"}
                                value={item?.intRating}
                                sx={style.itemRating}
                                readOnly={true}
                              />
                            </Grid>
                            <Grid item xs="12">
                              <Typography sx={style.itemName}>
                                {item?.jsnName[lang]}
                              </Typography>
                            </Grid>
                            <Grid item xs="12">
                              <Grid container alignContent={'center'} alignItems={'center'} sx={{height:"fit-content"}}>
                                <Grid item xs="9" container>
       
                                    <Grid item>

                                  <Typography sx={style.dollarSign}>
                                    $
                                  </Typography>
                                    </Grid>
                                    
                                    <Grid item>

                                  <Typography sx={style.price}>
                                    {item?.blnOnSale?(item?.jsnProductInfo?.strSalePrice):(item?.jsnProductInfo?.strPrice)}
                                  </Typography>
                                    </Grid>
                                    <Grid item >
                                    {item?.blnOnSale && (
                                    <Typography
                                      component={'caption'}
                                      px-1
                                      sx={style.salePrice}
                                    >
                                      ${item?.jsnProductInfo?.strPrice}
                                    </Typography>
                                  )}
                                
                                    </Grid>
                                </Grid>
                                <Grid item xs="3">
                                  <img
                                    src={shoppingIcon}
                                    style={style.shoppingIcon}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
