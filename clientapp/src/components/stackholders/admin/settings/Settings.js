import { CITIES, COUNTRIES, initialAppState } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlSittings } from "./controller/CtrlSettings";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  container: {
    background: "#f3fbfb",
    height: "fit-content",
    marginY: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    padding: {lg:"20px",xs:"5px"},
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: {lg:"30px",xs:"20px"},
  },
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  locationIframe: {
    borderRadius: "10px",
  },
};

function Settings() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const addressInitial = useMemo(() => {
    const countryIndex = COUNTRIES.findIndex((country) => {
      return (
        country["eng"] ===
        appState.systemInfo.jsnSystemAddress.jsnCountry["eng"]
      );
    });
    const cityIndex = CITIES[
      appState.systemInfo.jsnSystemAddress.jsnCountry["eng"]
    ].findIndex((city) => {
      return (
        city["eng"] === appState.systemInfo.jsnSystemAddress.jsnCity["eng"]
      );
    });
    return {
      countryIndex: countryIndex,
      cityIndex: cityIndex,
    };
  }, []);
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
      path: `/admin/orders/${systemName}/${systemID}`,
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    {
      bigNavID: 2344146478,
      nav: { eng: "users", arb: "المنيو" },
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
        <Grid container px={2} justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            lg="10"
            xs="12"
            sx={styles.container}
          >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Grid item xs="12" p={2} container justifyContent={"center"}>
                <Typography component={"h3"} sx={styles.title}>
                  Settings
                </Typography>
              </Grid>
              <Grid item container xs="12">
                <Grid item xs="12" p={2}>
                  <Title0001 title={"address"} dir={dir} />
                </Grid>
                <Grid item xs="12" container>
                  <Grid item lg="6" xs='12' p={2}>
                    <FormControl fullWidth>
                      <InputLabel sx={styles.inputLabel}>Country</InputLabel>
                      <Select
                        defaultValue={address?.countryIndex}
                        required
                        onChange={onChangeCountry}
                        sx={styles.select}
                      >
                        {COUNTRIES.map((country, index) => (
                          <MenuItem value={index}>{country[lang]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg="6" xs='12' p={2}>
                    <FormControl fullWidth>
                      <InputLabel sx={styles.inputLabel}>City</InputLabel>
                      <Select
                        value={address?.cityIndex}
                        required
                        onChange={onChangeCity}
                        sx={styles.select}
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
                  <Title0001 title={"Payment Info"} dir={dir} />
                </Grid>
                <Grid item xs="12" container>
                  <Grid item xs="12" p={2}>
                    <TextField
                      sx={styles.textfield}
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
                  <Grid item lg="6" xs='12' p={2}>
                    <TextField
                      sx={styles.textfield}
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
                  <Grid item lg="6" xs='12' p={2}>
                    <TextField
                      sx={styles.textfield}
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
                  <Title0001 title={"Location"} dir={dir} />
                </Grid>
                <Grid item xs="12" container p={2}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${appState?.userInfo?.jsnLocation?.lat}, ${appState?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
                    width="100%"
                    height="350"
                    frameborder="0"
                    style={styles.locationIframe}
                  />
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
