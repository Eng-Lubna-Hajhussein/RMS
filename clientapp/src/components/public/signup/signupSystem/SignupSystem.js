import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contextapi/context/AppContext";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@basetoolkit/ui";
import { useForm, Controller } from "@basetoolkit/ui/form";
import { COUNTRIES, CITIES } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { ctrlSignUp } from "./controller/CtrlSignUp";
import useMapLocation from "hooks/useMapLocation/useMapLocation";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import logo from "assets/image/logo.png";
import { dictionary } from "appHelper/appDictionary";
import { textFieldClasses } from "@basetoolkit/ui/classes";

const styles = {
  container: {
    background: "#f3fbfb",
    height: "fit-content",
    borderRadius: "20px",
    lg: { my: "50px", p: "30px !important" },
    xs: { my: "20px", p: "15px !important" },
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "20px" },
  },
  price: {
    color: "secondary",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "14px" },
  },
  textfield: {
    textTransform: "capitalize",
    [`& .${textFieldClasses.label}`]: {
      textTransform: "capitalize",
    },
  },
  logo: {
    width: "150px",
    height: "30px",
  },
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    textTransform: "capitalize",
  },
};

function SignupSystem() {
  const theme = useTheme();
  const { appState, appDispatch } = useContext(AppContext);
  const { mapLocation } = useMapLocation();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const navigate = useNavigate();
  const addressInitial = {
    countryIndex: 0,
    cityIndex: 0,
  };
  const [address, setAddress] = useState(addressInitial);

  const onChangeCountry = (selected) => {
    const index = selected.value;
    address.countryIndex = index;
    address.cityIndex = 0;
    setAddress({ ...address });
  };
  const onChangeCity = (selected) => {
    const index = selected.value;
    address.cityIndex = index;
    setAddress({ ...address });
  };

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
      formData,
      address,
      mapLocation,
    });
  };

  return (
    <React.Fragment>
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
              <Box component={"img"} sx={styles.logo} src={logo} />
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              <Typography component={"h3"} sx={styles.title}>
                {dictionary.signup.restaurantRegistration[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} p={2}>
                <Title0001
                  title={dictionary.signup.restaurantInfo[lang]}
                  color={theme.palette.primary.main}
                  dir={dir}
                />
              </Grid>
              <Grid item xs={12} container>
                <Grid item lg={6} xs={12} p={1}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          helperText={
                            errors["restaurantNameEng"]?.message || ""
                          }
                          error={errors["restaurantNameEng"]?.message}
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
                    label={dictionary.labels.restaurantNameEng[lang]}
                    name="restaurantNameEng"
                    control={control}
                    color="secondary"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={1}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          sx={styles.textfield}
                          helperText={
                            errors["restaurantNameArb"]?.message || ""
                          }
                          error={errors["restaurantNameArb"]?.message}
                          required
                          fullWidth
                          type="text"
                          dir="ltr"
                        />
                      );
                    }}
                    rules={{
                      required: { value: true, message: "Name is Required" },
                    }}
                    label={dictionary.labels.restaurantNameArb[lang]}
                    name="restaurantNameArb"
                    control={control}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={1}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          sx={styles.textfield}
                          helperText={errors["ownerNameEng"]?.message || ""}
                          error={errors["ownerNameEng"]?.message}
                          required
                          fullWidth
                          type="text"
                          dir="ltr"
                        />
                      );
                    }}
                    rules={{
                      required: { value: true, message: "Name is Required" },
                    }}
                    label={dictionary.labels.ownerNameEng[lang]}
                    name="ownerNameEng"
                    control={control}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={1}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          sx={styles.textfield}
                          {...field}
                          helperText={errors["ownerNameArb"]?.message || ""}
                          error={errors["ownerNameArb"]?.message}
                          required
                          fullWidth
                          type="text"
                          dir="ltr"
                        />
                      );
                    }}
                    rules={{
                      required: { value: true, message: "Name is Required" },
                    }}
                    label={dictionary.labels.ownerNameArb[lang]}
                    name="ownerNameArb"
                    control={control}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item lg={6} xs={12} p={1}>
                  <Select
                    defaultValue={{
                      value: address.countryIndex,
                      label: COUNTRIES[address.countryIndex][lang],
                    }}
                    required
                    label={dictionary.labels.country[lang]}
                    onChange={onChangeCountry}
                    sx={styles.textfield}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    {COUNTRIES.map((country, index) => (
                      <MenuItem value={index}>{country[lang]}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item lg={6} xs={12} p={1}>
                  <Select
                    value={{
                      value: address.cityIndex,
                      label:
                        CITIES[COUNTRIES[address.countryIndex][lang]][
                          address.cityIndex
                        ][lang],
                    }}
                    required
                    label={dictionary.labels.city[lang]}
                    onChange={onChangeCity}
                    sx={styles.textfield}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    {CITIES[COUNTRIES[address.countryIndex]["eng"]].map(
                      (city, index) => (
                        <MenuItem value={index}>{city[lang]}</MenuItem>
                      )
                    )}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} p={2}>
                <Title0001
                  title={dictionary.signup.registrationInfo[lang]}
                  color={theme.palette.primary.main}
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
                    required: { value: true, message: "Password is Required" },
                  }}
                  label={dictionary.labels.password[lang]}
                  name="password"
                  control={control}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} p={2}>
                <Title0001
                  title={dictionary.signup.paymentInfo[lang]}
                  color={theme.palette.primary.main}
                  dir={dir}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <Controller
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={styles.textfield}
                        {...field}
                        helperText={errors["cardNumber"]?.message || ""}
                        error={errors["cardNumber"]?.message}
                        required
                        fullWidth
                        type="cardNumber"
                        dir="ltr"
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Card number is Required",
                    },
                  }}
                  label={dictionary.labels.cardNumber[lang]}
                  name="cardNumber"
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
                        helperText={errors["cvv"]?.message || ""}
                        error={errors["cvv"]?.message}
                        required
                        fullWidth
                        type="cvv"
                        dir="ltr"
                      />
                    );
                  }}
                  rules={{
                    required: { value: true, message: "CVV is Required" },
                  }}
                  label={dictionary.labels.cvv[lang]}
                  name="cvv"
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
                        helperText={errors["nameOnCard"]?.message || ""}
                        error={errors["nameOnCard"]?.message}
                        required
                        fullWidth
                        type="nameOnCard"
                        dir="ltr"
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Name On Card is Required",
                    },
                  }}
                  label={dictionary.labels.nameOnCard[lang]}
                  name="nameOnCard"
                  control={control}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent={"end"} p={2}>
              <AnimButton0001
                label={dictionary.buttons.registerWithOnly[[lang]]}
                color={theme.palette.secondary.main}
                type="submit"
              />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupSystem;
