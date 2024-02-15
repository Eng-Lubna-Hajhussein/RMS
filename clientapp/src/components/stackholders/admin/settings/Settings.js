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
  
  function Settings() {
    const { appState, appDispatch } = useContext(AppContext);
    const lang = appState.clientInfo.strLanguage;
    const { systemID, systemName } = useParams();
    const navigate = useNavigate();
    const addressInitial = useMemo(()=>{
        const countryIndex = COUNTRIES.findIndex((country)=>{
          return country['eng'] === appState.systemInfo.jsnSystemAddress.jsnCountry['eng'];
        })
        const cityIndex = CITIES[appState.systemInfo.jsnSystemAddress.jsnCountry['eng']].findIndex((city)=>{
          return city['eng'] === appState.systemInfo.jsnSystemAddress.jsnCity['eng']
        });
        return {
          countryIndex: countryIndex,
          cityIndex: cityIndex,
        }
      },[]);
    const [address, setAddress] = useState(addressInitial);
    const onChangeCountry = (event) => {
      const index = event.target.value;
      address.countryIndex = index;
      address.cityIndex = 0;
      setAddress({ ...address });
    };
    const onChangeCity = (event) => {
      const index = event.target.value;
      address.cityIndex = index;
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
        { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" } },
        { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
      ];
    
      const adminNavList = [
        { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
        {
          bigNavID: 3234146150,
          nav: { eng: "dashboard", arb: "داشبورد" },
        },
        { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
      ];
    
      const navList = [
        {
          bigNavID: 1342146478,
          nav: { eng: "home", arb: "الرئيسية" },
          path: `/admin/${systemName}/${systemID}`,
        },
    
        {
          bigNavID: 8944146478,
          nav: { eng: "orders", arb: "تسوق" },
          path:`/admin/orders/${systemName}/${systemID}`
        },
        {
          bigNavID: 7943146478,
          nav: { eng: "tables", arb: "الاخبار" },
          path: `/admin/tables/${systemName}/${systemID}`,
        },
    
        { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" },
        path: `/admin/users/${systemName}/${systemID}`,
      },
        { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
      ];
    const [isLoading, setIsLoading] = useState(false);
    return (
      <React.Fragment>
        <WebsiteHeader
          lang={appState.clientInfo.strLanguage}
          dir={appState.clientInfo.strDir}
          navList={navList}
          userNavList={userNavList}
          adminNavList={adminNavList}
          jsnSystemContact={appState.systemInfo.jsnSystemContact}
          editable={false}
          userImg={appState.userInfo.strImgPath}
          websiteLogo={appState?.systemInfo?.strLogoPath}
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
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs="12" container>
                    <Grid item xs="6" p={2}>
                      <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
  
                        <Select
                          defaultValue={address?.countryIndex}
                          required
                          onChange={onChangeCountry}
                          sx={{ background: "#fff", borderRadius: "5px" }}
                        >
                          {COUNTRIES.map((country, index) => (
                            <MenuItem value={index}>{country[lang]}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs="6" p={2}>
                      <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select
                          value={address?.cityIndex}
                          required
                          onChange={onChangeCity}
                          sx={{ background: "#fff", borderRadius: "5px" }}
                        >
                          {CITIES[COUNTRIES[address?.countryIndex]["eng"]].map(
                            (city, index) => (
                              <MenuItem value={index}>{city[lang]}</MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
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
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
  
  export default Settings;
  