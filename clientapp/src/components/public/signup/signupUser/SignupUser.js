import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "contextapi/context/AppContext";
import {
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  useTheme,
} from "@basetoolkit/ui";
import { useForm, Controller } from "@basetoolkit/ui/form";
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
    borderRadius: "20px",
    lg: { my: "50px", p: "30px !important" },
    xs: { my: "20px", p: "15px !important" },
  },
  logo: {
    width: "150px",
    height: "30px",
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "20px" },
  },
  regUsing: {
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
    textDecoration: "underline",
    cursor: "pointer",
    lg: { fontSize: "17px" },
    xs: { fontSize: "13px" },
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
  const theme = useTheme();
  const { appState, appDispatch } = useContext(AppContext);
  const { mapLocation } = useMapLocation();
  const { systemID, systemName } = useParams();
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
  const onChangeSystem = (selected) => {
    const systemID = selected.value;
    const systemIndex = systems.findIndex(
      ({ bigSystemID }) => bigSystemID === systemID
    );
    if (systemIndex !== -1) {
      const system = systems[systemIndex];
      setRegSystem(systems[systemIndex]);
      const countryID = Object.keys(system?.deliveryAddress?.appRegionsID)[0];
      const cityID =
        countryID &&
        Object.keys(system?.deliveryAddress?.appRegionsID[countryID])[0];
      const townID =
        cityID && system?.deliveryAddress?.appRegionsID[countryID][cityID][0];
      setAddress({
        countryID,
        cityID,
        townID,
      });
    }
  };
  const onChangeCountry = (selected) => {
    const countryID = selected.value;
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
  const onChangeCity = (selected) => {
    const cityID = selected.value;
    address.cityID = cityID;
    address.townID =
      address.countryID && address.cityID
        ? regSystem?.deliveryAddress?.appRegionsID[address.countryID][
            address.cityID
          ][0]
        : null;
    setAddress({ ...address });
  };
  const onChangeTown = (selected) => {
    const townID = selected.value;
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
    control,
    handleSubmit,
    formState: { errors },
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
            lg={8}
            xs={12}
            sx={styles.container}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} container justifyContent={"center"}>
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
              <Grid item xs={12} container justifyContent={"center"}>
                <Typography component={"h3"} sx={styles.title}>
                  {dictionary.signup.userRegistration[lang]}
                </Typography>
              </Grid>
              {!systemID && (
                <Grid item xs={12} container>
                  <Grid item xs={12} p={2}>
                    <Title0001
                      color={theme.palette.primary.main}
                      title={dictionary.signup.registeredRestaurants[lang]}
                      dir={dir}
                    />
                  </Grid>
                  {regSystem && (
                    <Grid item xs={12} container>
                      <Grid item xs={12} p={2}>
                        <Select
                          defaultValue={{
                            value: regSystem?.bigSystemID,
                            label: regSystem?.jsnSystemName[lang],
                          }}
                          required
                          onChange={onChangeSystem}
                          sx={styles.select}
                          fullWidth
                        >
                          {systems?.map((system, index) => (
                            <MenuItem value={system.bigSystemID}>
                              {system?.jsnSystemName[lang]}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} p={1}>
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
                  <Grid item xs={12} p={2}>
                    <Divider />
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} container>
                <Grid item xs={12} p={2}>
                  <Title0001
                    color={theme.palette.primary.main}
                    title={dictionary.signup.userInfo[lang]}
                    dir={dir}
                  />
                </Grid>
                <Grid item xs={12} container>
                  <Grid item lg={6} xs={12} p={2}>
                    <Controller
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            helperText={errors["nameEng"]?.message || ""}
                            error={errors["nameEng"]?.message}
                            required
                            sx={styles.textfield}
                            fullWidth
                            type="text"
                            dir="ltr"
                          />
                        );
                      }}
                      rules={{
                        required: { value: true, message: "Name is Required" },
                      }}
                      label={dictionary.labels.nameEng[lang]}
                      name="nameEng"
                      control={control}
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={6} xs={12} p={2}>
                    <Controller
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            helperText={errors["nameArb"]?.message || ""}
                            error={errors["nameArb"]?.message}
                            required
                            sx={styles.textfield}
                            fullWidth
                            type="text"
                            dir="ltr"
                          />
                        );
                      }}
                      rules={{
                        required: { value: true, message: "Name is Required" },
                      }}
                      label={dictionary.labels.nameArb[lang]}
                      name="nameArb"
                      control={control}
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                  {address.countryID && (
                    <Grid item lg={4} xs={12} p={2}>
                      <Select
                        fullWidth
                        value={{
                          value: address.countryID,
                          label:
                            regSystem?.deliveryAddress?.regionName[
                              address.countryID
                            ][lang],
                        }}
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
                              regSystem?.deliveryAddress?.regionName[countryID][
                                lang
                              ]
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )}
                  {address.cityID && (
                    <Grid item lg={4} xs={12} p={2}>
                      <Select
                        fullWidth
                        value={{
                          value: address.cityID,
                          label:
                            regSystem?.deliveryAddress?.regionName[
                              address.cityID
                            ][lang],
                        }}
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
                    </Grid>
                  )}
                  {address.townID && (
                    <Grid item lg={4} xs={12} p={2}>
                      <Select
                        fullWidth
                        value={{
                          value: address.townID,
                          label:
                            regSystem?.deliveryAddress?.regionName[
                              address.townID
                            ][lang],
                        }}
                        required
                        label={dictionary.labels.town[lang]}
                        onChange={onChangeTown}
                        sx={styles.select}
                      >
                        {(regSystem?.deliveryAddress?.appRegionsID[
                          address?.countryID
                        ][address?.cityID]).map((townID) => (
                          <MenuItem value={townID}>
                            {
                              regSystem?.deliveryAddress?.regionName[townID][
                                lang
                              ]
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={12} p={2}>
                  <Title0001
                    color={theme.palette.primary.main}
                    title={dictionary.signup.registrationInfo[lang]}
                    dir={dir}
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={2}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={styles.textfield}
                          {...field}
                          helperText={errors["email"]?.message || ""}
                          error={errors["email"]?.message}
                          required
                          fullWidth
                          type="email"
                          dir="ltr"
                        />
                      );
                    }}
                    rules={{
                      required: { value: true, message: "Email is Required" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    label={dictionary.labels.emailAddress[lang]}
                    name="email"
                    control={control}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={2}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={styles.textfield}
                          {...field}
                          helperText={errors["password"]?.message || ""}
                          error={errors["password"]?.message}
                          required
                          fullWidth
                          type="password"
                          dir="ltr"
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                    }}
                    label={dictionary.labels.password[lang]}
                    name="password"
                    control={control}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={dictionary.buttons.register[lang]}
                  color={theme.palette.secondary.main}
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
