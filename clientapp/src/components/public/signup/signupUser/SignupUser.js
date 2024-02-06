import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "contextapi/context/AppContext";
import bgImg from "assets/image/patron.jpg";
import {
    Divider,
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
import { formateDBStr, generateRandomID } from "appHelper/appFunctions";
import {
  createSystem,
  findSystems,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import { signup } from "appHelper/fetchapi/tblUser/tblUser";
import { ctrlSignUp } from "./controller/CtrlSignUp";
import useMapLocation from "hooks/useMapLocation/useMapLocation";

const style = {};

function SignupUser() {
  const { appState, appDispatch } = useContext(AppContext);
  const { mapLocation } = useMapLocation();
  const {systemID,systemName} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [systems, setSystems] = useState([]);
  const [regSystem, setRegSystem] = useState();
  const lang = appState.clientInfo.strLanguage;
  const navigate = useNavigate();
  const addressInitial = {
    countryIndex: 0,
    cityIndex: 0,
  };
  const [address, setAddress] = useState(addressInitial);
  useEffect(() => {
    if (systems?.length) {
      setRegSystem(systems[0]);
    }
  }, [systems]);
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

  const instalData = async () => {
    setIsLoading(true);
    const systemsData = await findSystems();
    const systemsUpdated = systemsData.map((system) => ({
      ...system,
      jsnSystemName: JSON.parse(system?.jsnSystemName),
    }));
    setSystems(systemsUpdated);
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
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
      systemID
    });
  };

  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            xs="8"
            sx={{
              background: "#f3fbfb",
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
                  sx={{ color: "#000",textTransform:"capitalize", fontWeight: "800", fontSize: "30px" }}
                >
                 {systemName} User Registration
                </Typography>
              </Grid>
              {!systemID&&<Grid item xs="12" container>
                <Grid item xs="12" p={2}>
                  <Typography
                    px={1}
                    sx={{
                      color: "#000",
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "800",
                    }}
                  >
                    Registered System Info
                  </Typography>
                </Grid>
                {regSystem&&<Grid item xs="12" container>
                  <Grid item xs="12" p={2}>
                    <FormControl fullWidth>
                      <InputLabel>Restaurant</InputLabel>
                      <Select
                        value={regSystem?.bigSystemID}
                        defaultValue={regSystem?.bigSystemID}
                        required
                        onChange={onChangeSystem}
                        sx={{ background: "#fff", borderRadius: "5px" }}
                      >
                        {systems?.map((system, index) => (
                          <MenuItem value={system.bigSystemID}>
                            {system.jsnSystemName[lang]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="12" p={2}>
                  <Typography
                    px={1}
                    sx={{
                      color: "#000",
                      fontWeight: "800",
                    }}
                  >
                    Register Using <Link to={"/"+regSystem?.strSystemPathURL}>{regSystem?.jsnSystemName[lang]}</Link> Website
                  </Typography>
                </Grid>
                </Grid>}
                <Grid item xs="12" p={2}>
                  <Divider />
                </Grid>
              </Grid>}
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
                    User Info
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
                      onKeyUp={() => {
                        trigger("nameArb");
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
              <Grid item xs="12" container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={"Register"}
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
