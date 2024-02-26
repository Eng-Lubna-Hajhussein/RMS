import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "contextapi/context/AppContext";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { ctrlSignUp } from "./controller/CtrlSignUp";
import useMapLocation from "hooks/useMapLocation/useMapLocation";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    background: "#f3fbfb",
    height: "fit-content",
    marginY: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    padding: { lg: "30px", xs: "15px" },
  },
  logo: {
    width: "150px",
    height: "30px",
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: { lg: "30px", xs: "20px" },
  },
  regUsing: {
    color: "#000",
    fontWeight: "800",
    fontSize: { lg: "17px", xs: "13px" },
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
};

function SignupUser() {
  const { appState, appDispatch } = useContext(AppContext);
  const { mapLocation } = useMapLocation();
  const { systemID,systemName } = useParams();
  const dir = appState.clientInfo.strDir;
  const [isLoading, setIsLoading] = useState(false);
  const [systems, setSystems] = useState([]);
  const [regSystem, setRegSystem] = useState();
  const lang = appState.clientInfo.strLanguage;
  const navigate = useNavigate();
  const addressInitial = {
    countryID: null,
    cityID: null,
    townID: null,
  };
  const [address, setAddress] = useState(addressInitial);
  const onChangeSystem = (event) => {
    const systemID = event.target.value;
    const systemIndex = systems.findIndex(
      ({ bigSystemID }) => bigSystemID === systemID
    );
    if (systemIndex !== -1) {
      setRegSystem(systems[systemIndex]);
    }
  };
  const onChangeCountry = (event) => {
    const countryID = event.target.value;
    address.countryID = countryID;
    address.cityID = countryID
      ? Object.keys(
          regSystem?.deliveryAddress?.appRegionsID[countryID] || {}
        )[0]
      : null;
    address.townID =
      countryID && address.cityID
        ? regSystem?.deliveryAddress?.appRegionsID[countryID][address.cityID][0]
        : null;
    setAddress({ ...address });
  };
  const onChangeCity = (event) => {
    const cityID = event.target.value;
    address.cityID = cityID;
    address.townID =
      address.countryID && address.cityID
        ? regSystem?.deliveryAddress?.appRegionsID[address.countryID][
            address.cityID
          ][0]
        : null;
    setAddress({ ...address });
  };
  const onChangeTown = (event) => {
    const townID = event.target.value;
    address.townID = townID;
    setAddress({ ...address });
  };
  useEffect(() => {
    if (systemID) {
      ctrlSignUp.installRegSystemData({
        setAddress: setAddress,
        setIsLoading: setIsLoading,
        setRegSystem: setRegSystem,
        systemID: systemID,
        setAddress: setAddress,
      });
    } else {
      ctrlSignUp.installSystemsData({
        setIsLoading: setIsLoading,
        setRegSystem: setRegSystem,
        setSystems: setSystems,
        setAddress: setAddress,
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    ctrlSignUp.handelSubmit({
      appState,
      appDispatch,
      navigate,
      regSystem,
      formData,
      address,
      mapLocation,
      systemID,
    });
  };

  const userNavList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "login", arb: "تسجيل الدخول" },
      path: systemID ? `/login/${systemName}/${systemID}` : "/login",
    },
    {
      bigNavID: 2344146478,
      nav: { eng: "register", arb: "تسجيل حساب" },
      path: systemID ? `/signup/${systemName}/${systemID}` : "/signup",
    },
  ];

  return (
    <React.Fragment>
      {systemID && (
        <WebsiteHeader
          lang={appState.clientInfo.strLanguage}
          dir={appState.clientInfo.strDir}
          jsnSystemContact={regSystem?.jsnSystemContact || {}}
          navList={lstWebsiteNav}
          websiteLogo={regSystem?.strLogoPath}
          blnUserLogin={false}
          userNavList={userNavList}
        />
      )}
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container px={2} justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            lg="8"
            xs="12"
            sx={styles.container}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs="12" container justifyContent={"center"}>
                <Box
                  component={"img"}
                  sx={styles.logo}
                  src={
                    systemID
                      ? regSystem?.strLogoPath
                      : Demo_jsnSystemInfo?.strLogoPath
                  }
                />
              </Grid>
              <Grid item xs="12" container justifyContent={"center"}>
                <Typography component={"h3"} sx={styles.title}>
                  {dictionary.signup.userRegistration[lang]}
                </Typography>
              </Grid>
              {!systemID && (
                <Grid item xs="12" container>
                  <Grid item xs="12" p={2}>
                    <Title0001
                      color={App_Primary_Color}
                      title={dictionary.signup.registeredRestaurants[lang]}
                      dir={dir}
                    />
                  </Grid>
                  {regSystem && (
                    <Grid item xs="12" container>
                      <Grid item xs="12" p={2}>
                        <FormControl fullWidth>
                          <InputLabel sx={styles.inputLabel}>
                            {dictionary.labels.restaurant[lang]}
                          </InputLabel>
                          <Select
                            value={regSystem?.bigSystemID}
                            defaultValue={regSystem?.bigSystemID}
                            required
                            onChange={onChangeSystem}
                            sx={styles.select}
                          >
                            {systems?.map((system, index) => (
                              <MenuItem value={system.bigSystemID}>
                                {system?.jsnSystemName[lang]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs="12" p={2}>
                        <Typography px={1} sx={styles.regUsing}>
                          {dictionary.signup.registerUsing[lang] + " "}
                          <Link to={"/" + regSystem?.strSystemPathURL}>
                            {regSystem?.jsnSystemName[lang]}
                          </Link>{" "}
                          {dictionary.signup.website[lang]}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs="12" p={2}>
                    <Divider />
                  </Grid>
                </Grid>
              )}
              <Grid item xs="12" container>
                <Grid item xs="12" p={2}>
                  <Title0001
                    color={App_Primary_Color}
                    title={dictionary.signup.userInfo[lang]}
                    dir={dir}
                  />
                </Grid>
                <Grid item xs="12" container>
                  <Grid item lg="6" xs="12" p={2}>
                    <TextField
                      sx={styles.textfield}
                      variant="outlined"
                      fullWidth
                      type="text"
                      dir="ltr"
                      label={dictionary.labels.nameEng[lang]}
                      className={`form-control ${errors.nameEng && "invalid"}`}
                      {...register("nameEng", {
                        required: "Name is Required",
                      })}
                      onKeyUp={() => {
                        trigger("nameEng");
                      }}
                    />
                  </Grid>
                  <Grid item lg="6" xs="12" p={2}>
                    <TextField
                      sx={styles.textfield}
                      variant="outlined"
                      fullWidth
                      type="text"
                      label={dictionary.labels.nameArb[lang]}
                      className={`form-control ${errors.nameArb && "invalid"}`}
                      {...register("nameArb", {
                        required: "Name is Required",
                      })}
                      onKeyUp={() => {
                        trigger("nameArb");
                      }}
                    />
                  </Grid>
                  {address.countryID && (
                    <Grid item lg="4" xs="12" p={2}>
                      <FormControl fullWidth>
                        <InputLabel sx={styles.inputLabel}>
                          {dictionary.labels.country[lang]}
                        </InputLabel>
                        <Select
                          value={address.countryID}
                          required
                          label={dictionary.labels.country[lang]}
                          onChange={onChangeCountry}
                          sx={styles.select}
                        >
                          {Object.keys(
                            regSystem?.deliveryAddress?.appRegionsID || {}
                          ).map((countryID) => (
                            <MenuItem value={countryID}>
                              {
                                regSystem?.deliveryAddress?.regionName[
                                  countryID
                                ][lang]
                              }
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                  {address.cityID && (
                    <Grid item lg="4" xs="12" p={2}>
                      <FormControl fullWidth>
                        <InputLabel sx={styles.inputLabel}>
                          {dictionary.labels.city[lang]}
                        </InputLabel>
                        <Select
                          value={address.cityID}
                          required
                          label={dictionary.labels.city[lang]}
                          onChange={onChangeCity}
                          sx={styles.select}
                        >
                          {Object.keys(
                            regSystem?.deliveryAddress?.appRegionsID[
                              address?.countryID
                            ] || {}
                          ).map((cityID) => (
                            <MenuItem value={cityID}>
                              {
                                regSystem?.deliveryAddress?.regionName[cityID][
                                  lang
                                ]
                              }
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                  {address.townID && (
                    <Grid item lg="4" xs="12" p={2}>
                      <FormControl fullWidth>
                        <InputLabel sx={styles.inputLabel}>
                          {dictionary.labels.town[lang]}
                        </InputLabel>
                        <Select
                          value={address.townID}
                          required
                          label={dictionary.labels.town[lang]}
                          onChange={onChangeTown}
                          sx={styles.select}
                        >
                          {regSystem?.deliveryAddress?.appRegionsID[
                            address?.countryID
                          ][address?.cityID].map((townID) => (
                            <MenuItem value={townID}>
                              {
                                regSystem?.deliveryAddress?.regionName[townID][
                                  lang
                                ]
                              }
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs="12" container>
                <Grid item xs="12" p={2}>
                  <Title0001
                    color={App_Primary_Color}
                    title={dictionary.signup.registrationInfo[lang]}
                    dir={dir}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="email"
                    dir="ltr"
                    label={dictionary.labels.emailAddress[lang]}
                    className={`form-control ${errors.email && "invalid"}`}
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="password"
                    label={dictionary.labels.password[lang]}
                    dir="ltr"
                    className={`form-control ${errors.password && "invalid"}`}
                    {...register("password", {
                      required: "Password is Required",
                    })}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs="12" container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={dictionary.buttons.register[lang]}
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

export default SignupUser;
