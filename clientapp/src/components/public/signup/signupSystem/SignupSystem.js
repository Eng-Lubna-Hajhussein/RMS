import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contextapi/context/AppContext";
import bgImg from "assets/image/patron.jpg";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { App_Second_Color } from "appHelper/appColor";
import {
  COUNTRIES,
  CITIES,
} from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { ctrlSignUp } from "./controller/CtrlSignUp";
import useMapLocation from "hooks/useMapLocation/useMapLocation";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import logo from "assets/image/logo-white.png";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    background: `url(${bgImg})`,
    height: "fit-content",
    marginY: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    padding: { lg: "30px", xs: "15px" },
  },
  title: {
    color: App_Second_Color,
    fontWeight: "800",
    fontSize: { lg: "30px", xs: "20px" },
  },
  price: {
    color: App_Second_Color,
    fontWeight: "800",
    fontSize: { lg: "30px", xs: "14px" },
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform:"capitalize"
  },
  logo: {
    width: "150px",
  },
  inputLabel:{
    textTransform:"capitalize"
  },
  select:{
    textTransform:"capitalize"
  },
};

function SignupSystem() {
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
          lg="8"
          xs="12"
          sx={styles.container}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs="12" container justifyContent={"center"}>
              <Box component={"img"} sx={styles.logo} src={logo} />
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography component={"h3"} sx={styles.title}>
                {dictionary.signup.restaurantRegistration[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" container>
              <Grid item xs="12" p={2}>
                <Title0001 title={dictionary.signup.restaurantInfo[lang]} color={"#fff"} dir={dir} />
              </Grid>
              <Grid item xs="12" container>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="text"
                    dir="ltr"
                    label={dictionary.labels.restaurantNameEng[lang]}
                    className={`form-control ${
                      errors.restaurantNameEng && "invalid"
                    }`}
                    {...register("restaurantNameEng", {
                      required: "Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("restaurantNameEng");
                    }}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    dir="rtl"
                    type="text"
                    label={dictionary.labels.restaurantNameArb[lang]}
                    className={`form-control ${
                      errors.restaurantNameArb && "invalid"
                    }`}
                    {...register("restaurantNameArb", {
                      required: "Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("restaurantNameArb");
                    }}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="text"
                    dir="ltr"
                    label={dictionary.labels.ownerNameEng[lang]}
                    className={`form-control ${
                      errors.ownerNameEng && "invalid"
                    }`}
                    {...register("ownerNameEng", {
                      required: "Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("ownerNameEng");
                    }}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <TextField
                    sx={styles.textfield}
                    variant="outlined"
                    fullWidth
                    type="text"
                    dir="rtl"
                    label={dictionary.labels.ownerNameArb[lang]}
                    className={`form-control ${
                      errors.ownerNameArb && "invalid"
                    }`}
                    {...register("ownerNameArb", {
                      required: "Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("ownerNameArb");
                    }}
                  />
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <FormControl fullWidth>
                    <InputLabel sx={styles.inputLabel}>{
                      dictionary.labels.country[lang]
                    }</InputLabel>
                    <Select
                      defaultValue={address.countryIndex}
                      required
                      label={dictionary.labels.country[lang]}
                      onChange={onChangeCountry}
                      sx={styles.textfield}
                    >
                      {COUNTRIES.map((country, index) => (
                        <MenuItem value={index}>{country[lang]}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg="6" xs="12" p={2}>
                  <FormControl fullWidth>
                    <InputLabel sx={styles.inputLabel}>
                      {dictionary.labels.city[lang]}
                    </InputLabel>
                    <Select
                      value={address.cityIndex}
                      required
                      label={dictionary.labels.city[lang]}
                      onChange={onChangeCity}
                      sx={styles.textfield}
                    >
                      {CITIES[COUNTRIES[address.countryIndex]["eng"]].map(
                        (city, index) => (
                          <MenuItem value={index}>{city[lang]}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="12" container>
              <Grid item xs="12" p={2}>
                <Title0001 title={dictionary.signup.registrationInfo[lang]} color={"#fff"} dir={dir} />
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
            <Grid item xs="12" container>
              <Grid item xs="12" p={2}>
                <Title0001 title={dictionary.signup.paymentInfo[lang]} color={"#fff"} dir={dir} />
              </Grid>
              <Grid item xs="12" p={2}>
                <TextField
                  sx={styles.textfield}
                  variant="outlined"
                  fullWidth
                  type="text"
                  dir="ltr"
                  label={dictionary.labels.cardNumber[lang]}
                  className={`form-control ${errors.cardNumber && "invalid"}`}
                  {...register("cardNumber", { required: "Name is Required" })}
                  onKeyUp={() => {
                    trigger("cardNumber");
                  }}
                />
              </Grid>
              <Grid item lg="6" xs="12" p={2}>
                <TextField
                  sx={styles.textfield}
                  variant="outlined"
                  fullWidth
                  type="text"
                  label={dictionary.labels.cvv[lang]}
                  className={`form-control ${errors.cvv && "invalid"}`}
                  {...register("cvv", { required: "CVV Code is Required" })}
                  onKeyUp={() => {
                    trigger("cvv");
                  }}
                />
              </Grid>
              <Grid item lg="6" xs="12" p={2}>
                <TextField
                  sx={styles.textfield}
                  variant="outlined"
                  fullWidth
                  type="text"
                  dir="ltr"
                  label={dictionary.labels.nameOnCard[lang]}
                  className={`form-control ${errors.cardName && "invalid"}`}
                  {...register("cardName", {
                    required: "Name On Card is Required",
                  })}
                  onKeyUp={() => {
                    trigger("cardName");
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs="12" container justifyContent={"end"} p={2}>
              <AnimButton0001
                label={dictionary.buttons.registerWithOnly[[lang]]}
                color={App_Second_Color}
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
