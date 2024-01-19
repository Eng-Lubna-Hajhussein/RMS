import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import React, { useContext, useEffect, useState } from "react";
import { lstWebsiteNav } from "appHelper/appVariables";
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

const style = {}

function Signup() {
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();   
  const onLogoChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({intTotalFiles:[...e.target.files].length})
  }
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const addressInitial = {
    countryIndex: 0,
    cityIndex: 0,
  };
  const [address, setAddress] = useState(addressInitial);

  const onChangeCountry = (event) => {
    const index = event.target.value;
    // address.jsnCountry = COUNTRIES[index];
    // address.jsnCity = CITIES[COUNTRIES[index]["eng"]][0];
    address.countryIndex=index;
    address.cityIndex=0;
    setAddress({ ...address });

  };
  const onChangeCity = (event) => {
    const index = event.target.value;
    address.cityIndex=index
    setAddress({ ...address });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // reset();
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
              Register Your Restaurant
            </Typography>
          </Grid>
          <Grid item xs="12" container>
            <Grid item xs="12" p={2}>
              <Typography
                px={1}
                sx={{
                  color: "#000",
                  borderLeft: "5px solid #ffff",
                  fontWeight: "800",
                }}
              >
                Restaurant Info
              </Typography>
            </Grid>
            <Grid item xs="12" container>
              <Grid item xs="12" container p={2} justifyContent={"start"}>
                <label htmlFor="upload-photo" style={{ width: "100%" }}>
                  <input
                    style={{ display: "none", width: "100%" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={onLogoChange}
                  />

                  <Fab
                    size="large"
                    component="span"
                    aria-label="add"
                    variant="extended"
                    sx={{
                      borderRadius: "5px",
                      background: App_Second_Color,
                      ":hover": { background: App_Second_Color },
                      width: "100%",
                    }}
                  >
                    <Upload />
                    <Typography
                      px={2}
                      sx={{
                        textTransform: "capitalize",
                        color: "#fff",
                        fontWeight: "800",
                      }}
                    >
                      Upload Your Restaurant Logo
                    </Typography>
                  </Fab>
                </label>
              </Grid>
              <Grid item xs='12' container p={2} justifyContent={'start'}>
                
              </Grid>
              <Grid item xs="6" p={2}>
                <TextField
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  variant="outlined"
                  fullWidth
                  type="text"
                  label="Restaurant Name English"
                  className={`form-control ${errors.restaurantNameEng && "invalid"}`}
                {...register("restaurantNameEng", { required: "Name is Required" })}
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
                  className={`form-control ${errors.restaurantNameArb && "invalid"}`}
                  {...register("restaurantNameArb", { required: "Name is Required" })}
                  onKeyUp={() => {
                    trigger("restaurantNameArb");
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
                    {CITIES[COUNTRIES[address.countryIndex]['eng']].map((city, index) => (
                      <MenuItem value={index}>{city[lang]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs='12' container>
          <Grid item xs="12" p={2}>
              <Typography
                px={1}
                sx={{
                  color: "#000",
                  borderLeft: "5px solid #ffff",
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
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
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
                  {...register("password", { required: "Password is Required" })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
              </Grid>
          </Grid>
          <Grid item xs='12' container justifyContent={'end'} p={2}>
          <AnimButton0001
              label={'Register'}
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
