import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

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
      fontSize: "15px !important",
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
      minHeight: {lg:"250px !important",xs:"120px"},
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
      fontSize: {lg:"25px !important",xs:"12px"},
      fontWeight: "800 !important",
      color: "#000",
      textTransform: "capitalize",
      fontFamily: "sans-serif",
      xs: {
        fontSize: "25px !important",
      },
    },
    cardMostOrderedSubtitle: {
      color: "#555",
      fontSize: {lg:"15px !important",xs:"8px"},
      xs: {
        fontSize: "14px !important",
      },
    },
    cardMostOrderedCrossBox: {
      backgroundColor: "#ffd40d !important",
      borderRadius: "50% !important",
      //   padding:"35px 5px !important",
  
      width: {lg:"150px !important",xs:"100px"},
      height: {lg:"150px !important",xs:"100px"},
      //   position: "absolute",
      //   top: "60%",
      //   left: "50px",
      textAlign: "center",
    },
    cardMostOrderedPrice: {
      color: "#f3274c",
      fontSize: {lg:"25px !important",xs:"15px"},
      fontFamily: "sans-serif",
      fontWeight: "800 !important",
    },
    perPerson: {
      color: "#212529",
      fontWeight: "800 !important",
      fontSize: {lg:"12px !important",xs:"10px"},
      fontFamily: "sans-serif",
      textTransform: "capitalize !important",
      // display: "inline-block !important",
      // width: "100%",
    },
    saleBox: {
        backgroundColor: "#ffd40d !important",
        borderRadius: "50% !important",
        width: {lg:"60px !important",xs:"30px"},
        height: {lg:"60px !important",xs:"30px"},
        position:"absolute",
        textAlign:"center",
        top: "1px",
        left: "-8px",
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
  };

function MostOrderedCard({item,lang,dir}){
       return (<Grid container item>
        <Grid item xs='12' container>

                        <Paper
                  sx={{
                    border: `6px solid #f3274c`,
                    ...style.cardMostOrderedPaper,
                    padding:"20px",
                  }}
                >
                  <Grid container item sx={{ height: "100%" }} alignItems={'flex-start'}>
                    <Grid item xs={7} container>

                    <Grid item lg="12">
                      <Typography sx={style.cardMostOrderedTitle}>
                        {item?.jsnName[lang]}
                      </Typography>
                    </Grid>
                    <Grid item lg={"12"}>
                      <Typography sx={style.cardMostOrderedSubtitle}>
                        {item?.jsnProductInfo?.jsnDescription[lang]}
                      </Typography>
                    </Grid>
                    </Grid>
                    <Grid item container sx={{height:"100%"}} alignItems={'center'} xs={5}>
                        <Grid item xs='12'>
                        <Box
                          src={item?.jsnProductInfo?.strImgPath}
                          component={'img'}
                          sx={{...style.itemImg,height:{lg:"180px",xs:"100px"},xs:{lg:'180px',xs:"100px"}}}
                        />
                        </Grid>
                      </Grid>
                    
                  </Grid>
                </Paper>
                <Grid
                  item
                  lg="12"
                  sx={{ marginTop: {lg:"-100px",xs:"-60px"},
                   marginLeft:dir==='ltr'&& "30px",marginRight:dir==='rtl'&&'30px' 
                  }}
                >
                  <Box sx={{...style.cardMostOrderedCrossBox,backgroundColor:'#ffd40d',border:item.blnOnSale&&"5px solid #f3274c"}}>
                    <Grid
                      container
                      justify={"center"}
                      sx={{ height: "100%" }}
                      alignItems={"center"}
                      alignSelf={"center"}
                    >
                      <Grid item xs={"12"}>
                        <Grid container justify={"center"}>
                        <Grid item lg="12" container justifyContent={'center'} px={1}>
                            <Typography sx={{...style.cardMostOrderedPrice,color:item.blnOnSale?'#555':'#f3274c',textDecoration:item.blnOnSale&&'line-through',fontSize:{lg:item.blnOnSale?'15px':'25px',xs:item.blnOnSale?'12px':'15px'}}}>
                              ${item.jsnProductInfo.strPrice}
                            </Typography>
                          </Grid>
                          {item.blnOnSale&&<Grid item lg="12" container justifyContent={'center'}>
                            <Typography component={'caption'} sx={{...style.cardMostOrderedPrice}}>
                              ${item.jsnProductInfo.strSalePrice}
                            </Typography>
                          </Grid>}
                          <Grid item lg={"12"} container justifyContent={'center'}>
                            <Typography sx={style.perPerson}>
                              {dictionary.typography.perPerson[lang]}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
          </Grid>
       </Grid>)
};

export default MostOrderedCard;