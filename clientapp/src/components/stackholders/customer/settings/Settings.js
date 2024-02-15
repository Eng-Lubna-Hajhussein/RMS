import {
  CITIES,
  COUNTRIES,
  initialAppState,
  lstWebsiteNav,
  objAppActions,
} from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TableFooter,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import {
  MoreVert,
  TimeToLeave,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
  findUserTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlSittings } from "./controller/CtrlSettings";
import { orderRegions } from "appHelper/appFunctions";

function Settings() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const deliveryAddress = useMemo(()=>{
    return orderRegions({Regions:appState?.systemInfo?.systemDeliveryAddress})
  },[])
  const  addressInitial = useMemo(()=>{
    return {
      countryID: appState?.userInfo?.jsnAddress?.jsnCountry?.bigID,
      cityID: appState?.userInfo?.jsnAddress?.jsnCity?.bigID,
      townID:Number(appState?.userInfo?.jsnAddress?.jsnTown?.bigID)
    };
  },[]);
  
  const [address, setAddress] = useState(addressInitial);
  const onChangeCountry = (event) => {
    const countryID = event.target.value;
    address.countryID = countryID;
    address.cityID = countryID? Object.keys(
      deliveryAddress?.appRegionsID[countryID] || {}
    )[0]:null;
    address.townID=(countryID&&address.cityID)?deliveryAddress?.appRegionsID[countryID][address.cityID][0]:null;
    setAddress({ ...address });
  };
  const onChangeCity = (event) => {
    const cityID = event.target.value;
    address.cityID = cityID;
    address.townID=(address.countryID&&address.cityID)?deliveryAddress?.appRegionsID[address.countryID][address.cityID][0]:null;
    setAddress({ ...address });
  };
  const onChangeTown = (event) => {
    const townID = event.target.value;
    address.townID = townID;
    setAddress({ ...address });
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    ctrlSittings.handelSubmit({
      appState,
      appDispatch,
      formData,
      address: address,
      setIsLoading: setIsLoading,
      deliveryAddress:deliveryAddress
    });
  };

  const onLogout = () => {
    appState.clientInfo.blnUserLogin=false;
    appState.clientInfo=initialAppState.clientInfo;
    appState.systemInfo=initialAppState.systemInfo;
    appState.userInfo=initialAppState.userInfo;
    appDispatch({...appState});
  };

  useEffect(()=>{
    if(!(appState.clientInfo.blnUserLogin)){
      navigate(`/${systemName}/${systemID}`);
    }
  },[appState.clientInfo.blnUserLogin])

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" },
    path: `/customer/profile/${systemName}/${systemID}`,
  },
    { bigNavID: 1234846478, nav: { eng: "settings", arb: "حسابي" },
    path: `/customer/settings/${systemName}/${systemID}`,
  },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/customer/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        {
          bigNavID: 8944146400,
          nav: { eng: "shop cart", arb: "كرت التسوق" },
          path: `/customer/cart/${systemName}/${systemID}`,
        },
        {
          bigNavID: 7644146400,
          nav: {
            eng: "menu",
            arb: "كرت التسوق",
            path: `/customer/${systemName}/${systemID}`,
          },
        },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        {
          nav: { eng: "undelivered order", arb: "مدونتنا" },
          path: `/customer/order/${systemName}/${systemID}`,
        },
        {
          nav: { eng: "delivered orders", arb: "تفاصيل المدونة" },
          path: `/customer/orders/${systemName}/${systemID}`,
        },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" },
      path:`/customer/reserve-table/${systemName}/${systemID}`
      },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
          path:`/customer/tables/${systemName}/${systemID}`
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" },
    path:`/customer/review/${systemName}/${systemID}`
  },
  ];
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            xs="10"
            sx={{
              background: "#f3fbfb",
              height: "fit-content",
              marginY: "50px",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Grid item xs="12" pb={3} container justifyContent={"center"}>
                <Typography
                  component={"h3"}
                  sx={{
                    color: "#000",
                    textTransform: "capitalize",
                    fontWeight: "800",
                    fontSize: "30px",
                  }}
                >
                  Settings
                </Typography>
              </Grid>
              <Grid item container xs="12">
                <Grid item xs="12" p={2}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                    Full Name
                  </Typography>
                </Grid>
                <Grid item xs="12" container>
                  <Grid item xs="6" p={2}>
                    <TextField
                      sx={{ background: "#fff", borderRadius: "5px" }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label="Name English"
                      className={`form-control ${errors.nameEng && "invalid"}`}
                      {...register("nameEng", {
                        required: "Name is Required",
                      })}
                      onKeyUp={() => {
                        trigger("nameEng");
                      }}
                      defaultValue={appState?.userInfo?.jsnFullName["eng"]}
                    />
                  </Grid>
                  <Grid item xs="6" p={2}>
                    <TextField
                      sx={{ background: "#fff", borderRadius: "5px" }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label="Name Arabic"
                      className={`form-control ${errors.nameArb && "invalid"}`}
                      {...register("nameArb", {
                        required: "Name is Required",
                      })}
                      dir="rtl"
                      onKeyUp={() => {
                        trigger("nameArb");
                      }}
                      defaultValue={appState?.userInfo?.jsnFullName["arb"]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs="12">
                <Grid item xs="12" p={2}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                   Delivery Address
                  </Typography>
                </Grid>
                <Grid item xs="12" container>
                {address.countryID&&<Grid item xs="4" p={2}>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        value={address.countryID}
                        required
                        onChange={onChangeCountry}
                        sx={{ background: "#fff", borderRadius: "5px" }}
                      >
                        {Object.keys(
                          deliveryAddress?.appRegionsID || {}
                        ).map((countryID) => (
                          <MenuItem value={countryID}>
                            {
                              deliveryAddress?.regionName[countryID][
                                lang
                              ]
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>}
                  {address.cityID&&<Grid item xs="4" p={2}>
                    <FormControl fullWidth>
                      <InputLabel>City</InputLabel>
                      <Select
                        value={address.cityID}
                        required
                        onChange={onChangeCity}
                        sx={{ background: "#fff", borderRadius: "5px" }}
                      >
                        {Object.keys(
                          deliveryAddress?.appRegionsID[
                            address?.countryID
                          ] || {}
                        ).map((cityID) => (
                          <MenuItem value={cityID}>
                            {
                              deliveryAddress?.regionName[cityID][
                                lang
                              ]
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>}
                  {address.townID&&<Grid item xs="4" p={2}>
                    <FormControl fullWidth>
                      <InputLabel>Town</InputLabel>
                      <Select
                        value={address.townID}
                        required
                        onChange={onChangeTown}
                        sx={{ background: "#fff", borderRadius: "5px" }}
                      >
                        {deliveryAddress?.appRegionsID[
                            address?.countryID
                          ][address?.cityID].map((townID) => (
                          <MenuItem value={townID}>
                            {
                              deliveryAddress?.regionName[townID][
                                lang
                              ]
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>}
                </Grid>
              </Grid>
              <Grid item container xs="12">
                <Grid item xs="12" p={2}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                    Payment Info
                  </Typography>
                </Grid>
                <Grid item xs="12" container>
                  <Grid item xs="12" p={2}>
                    <TextField
                      sx={{ background: "#fff", borderRadius: "5px" }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label="Card Number"
                      defaultValue={
                        appState?.userInfo?.jsnClientPayment?.strCardNumber
                      }
                      className={`form-control ${
                        errors.cardNumber && "invalid"
                      }`}
                      {...register("cardNumber")}
                      onKeyUp={() => {
                        trigger("cardNumber");
                      }}
                    />
                  </Grid>
                  <Grid item xs="6" p={2}>
                    <TextField
                      sx={{ background: "#fff", borderRadius: "5px" }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label="CVV Code"
                      defaultValue={
                        appState?.userInfo?.jsnClientPayment?.strCVV
                      }
                      className={`form-control ${errors.cvv && "invalid"}`}
                      {...register("cvv")}
                      onKeyUp={() => {
                        trigger("cvv");
                      }}
                    />
                  </Grid>
                  <Grid item xs="6" p={2}>
                    <TextField
                      sx={{ background: "#fff", borderRadius: "5px" }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label="Name On Card"
                      defaultValue={
                        appState?.userInfo?.jsnClientPayment?.strNameOnCard
                      }
                      className={`form-control ${errors.cardName && "invalid"}`}
                      {...register("cardName")}
                      onKeyUp={() => {
                        trigger("cardName");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs="12">
                <Grid item xs="12" p={2}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                    Location
                  </Typography>
                </Grid>
                <Grid item xs="12" container p={2}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${appState?.userInfo?.jsnLocation?.lat}, ${appState?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
                    width="100%"
                    height="350"
                    frameborder="0"
                    style={{ borderRadius: "10px" }}
                  ></iframe>
                </Grid>
              </Grid>

              <Grid item xs="12" container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={"Save Changes"}
                  color={App_Second_Color}
                  type="submit"
                />
              </Grid>
            </form>
            <Grid item xs="12">
              <Divider />
            </Grid>
            <Grid item xs="12" container p={2}>
              <Button
                sx={{
                  background: "#000",
                  padding: "20px 40px",
                  borderRadius: "10px",
                  ":hover": {
                    background: App_Primary_Color,
                  },
                }}
                fullWidth
                onClick={() => {
                  ctrlSittings.deleteAccount({
                    appDispatch: appDispatch,
                    appState: appState,
                    setIsLoading: setIsLoading,
                    navigate: navigate,
                    systemName:systemName,
                    systemID:systemID,
                    onLogout:onLogout
                  });
                }}
              >
                <Typography
                  color={"#fff"}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Delete Account
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Settings;
