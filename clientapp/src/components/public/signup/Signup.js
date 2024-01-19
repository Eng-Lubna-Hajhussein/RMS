import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import React, { useContext, useEffect, useState } from "react";
import { lstWebsiteNav, objRoleID } from "appHelper/appVariables";
import { AppContext } from "contextapi/context/AppContext";
import bgImg from "assets/image/patron.jpg";
import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Add, Upload } from "@mui/icons-material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { COUNTRIES, CITIES } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import { generateRandomID } from "appHelper/appFunctions";
import { createSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { signup } from "appHelper/fetchapi/tblUser/tblUser";

const style = {};

function Signup() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
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

  const onSubmit = async (data) => {
    const bigSystemID = generateRandomID(10);
    const jsnSystemAddress = { 
      jsnCountry: COUNTRIES[address.countryIndex],
      jsnCity: CITIES[COUNTRIES[address.countryIndex]['eng']][address.cityIndex]
    };
    // {
//     "restaurantNameEng": "ayam zaman",
//     "restaurantNameArb": "ايام زمان",
//     "ownerNameEng": "lubna hajhussein",
//     "ownerNameArb": "لبنى حاج حسين",
//     "email": "lubna@gmail.com",
//     "password": "1111",
//     "cardNumber": "1234567891",
//     "cvv": "1111",
//     "cardName": "lubna "
// }
   const jsnFullName = {eng:data.ownerNameEng,arb:data.ownerNameArb}
   const jsnClientPayment = {strCardNumber:data.cardNumber,strCVV:data.cvv,strNmeOnCard:data.cardName}
    const jsnSystemName = {
      eng:data.restaurantNameEng,
      arb:data.restaurantNameArb
    };
    const strSystemPathURL = jsnSystemName.eng.replace(' ','').trim() + '/' + bigSystemID;
    const bigUserID = generateRandomID(10);

    // reset();
    // save system
    
    const objInputSystem = {
      bigSystemID:bigSystemID,
      jsnSystemAddress:jsnSystemAddress,
      jsnSystemName:jsnSystemName,
      strSystemPathURL:strSystemPathURL
    }
    const res = await createSystem(objInputSystem);
    console.log({res})
    const objInputUser = {
      bigUserID:bigUserID,
      bigSystemID:res.bigSystemID,
      bigUserRoleID:objRoleID['Admin'],
      jsnFullName:jsnFullName,
      jsnClientPayment:jsnClientPayment,
      strEmail:data.email,
      strPassword:data.password
    } 
    const res2 = await signup(objInputUser);
    console.log({res2})
  };

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
      />
      <Grid container justifyContent={"center"}>
        <Grid
          item
          container
          justifyContent={"center"}
          xs="8"
          sx={{
            background: `url(${bgImg})`,
            height: "fit-content",
            marginY: "50px",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography
                component={"h3"}
                sx={{ color: "#fff", fontWeight: "800", fontSize: "30px" }}
              >
                Register Your Restaurant With Only{" "}
                <Typography
                  sx={{
                    color: App_Second_Color,
                    fontWeight: "800",
                    fontSize: "30px",
                  }}
                  component={"span"}
                >
                  $50
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs="12" container>
              <Grid item xs="12" p={2}>
                <Typography
                  px={1}
                  sx={{
                    color: "#000",
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "800",
                  }}
                >
                  Restaurant Info
                </Typography>
              </Grid>
              <Grid item xs="12" container>
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Restaurant Name English"
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
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Restaurant Name Arabic"
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
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Owner Name English"
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
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Owner Name Arabic"
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
                <Grid item xs="6" p={2}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>

                    <Select
                      defaultValue={address.countryIndex}
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
                      value={address.cityIndex}
                      required
                      onChange={onChangeCity}
                      sx={{ background: "#fff", borderRadius: "5px" }}
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
                <Typography
                  px={1}
                  sx={{
                    color: "#000",
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "800",
                  }}
                >
                  Registration Info
                </Typography>
              </Grid>
              <Grid item xs="6" p={2}>
                <TextField
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  variant="outlined"
                  fullWidth
                  type="email"
                  label="Email"
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
              <Grid item xs="6" p={2}>
                <TextField
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  variant="outlined"
                  fullWidth
                  type="password"
                  label="Password"
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
                <Typography
                  px={1}
                  sx={{
                    color: "#000",
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "800",
                  }}
                >
                  Payment Info
                </Typography>
              </Grid>
              <Grid item xs="12" p={2}>
                <TextField
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  variant="outlined"
                  fullWidth
                  type="text"
                  label="Card Number"
                  className={`form-control ${errors.cardNumber && "invalid"}`}
                  {...register("cardNumber", { required: "Name is Required" })}
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
                  autoFocus
                  label="CVV Code"
                  className={`form-control ${errors.cvv && "invalid"}`}
                  {...register("cvv", { required: "CVV Code is Required" })}
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
                  autoFocus
                  label="Name On Card"
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
                label={"Register $50"}
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

export default Signup;
