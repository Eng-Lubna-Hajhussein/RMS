import React, { useContext } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import { AppContext } from "contextapi/context/AppContext";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { App_Second_Color } from "appHelper/appColor";
import { ctrlLogin } from "./controller/CtrlLogin";
import { useNavigate, useParams } from "react-router-dom";

const styles = {
  itemContainer: {
    background: "#f3fbfb",
    height: "fit-content",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: "30px",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
  },
  logo: {
    width: "150px",
  },
};

function Login() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const navigate = useNavigate();
  const { systemID } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    ctrlLogin.handelSubmit({
      appState,
      appDispatch,
      navigate,
      formData,
    });
  };

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        jsnSystemContact={Demo_jsnSystemInfo.jsnSystemContact}
        editable={false}
      />
      <Grid container justifyContent={"center"}>
        <Grid
          item
          container
          justifyContent={"center"}
          xs="5"
          sx={styles.itemContainer}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
          {(systemID&&appState?.systemInfo?.strLogoPath) && (
                <Grid item xs="12" container justifyContent={"center"}>
                  <Box
                    component={"img"}
                    sx={styles.logo}
                    src={appState?.systemInfo?.strLogoPath}
                  />
                </Grid>
              )}
            <Grid item xs="12" pb={3} container justifyContent={"center"}>
              <Typography component={"h3"} sx={styles.title}>
                Login
              </Typography>
            </Grid>
            <Grid item xs="12" container>
              <Grid item xs="12" p={2}>
                <TextField
                  sx={styles.textfield}
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
              <Grid item xs="12" p={2}>
                <TextField
                  sx={styles.textfield}
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
                label={"Login"}
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

export default Login;
