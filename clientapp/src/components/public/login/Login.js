import React, { useContext, useEffect, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import { AppContext } from "contextapi/context/AppContext";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { App_Second_Color } from "appHelper/appColor";
import { ctrlLogin } from "./controller/CtrlLogin";
import { useNavigate, useParams } from "react-router-dom";
import Loader001 from "components/sharedUI/Loader001/Loader001";

const styles = {
  itemContainer: {
    background: "#f3fbfb",
    height: "fit-content",
    marginY: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    padding: { lg: "30px", xs: "15px" },
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: {lg:"30px",xs:"25px"},
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
  },
  logo: {
    width: "150px",
  },
  titleContainer: {
    paddingBottom: { lg: "20px", xs: "10px" },
  },
};

function Login() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const navigate = useNavigate();
  const { systemID } = useParams();
  const [systemInfo, setSystemInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (systemID) {
      ctrlLogin.installData({
        setIsLoading: setIsLoading,
        setSystemInfo: setSystemInfo,
        systemID: systemID,
      });
    } else {
      setSystemInfo({
        strLogoPath: Demo_jsnSystemInfo.strLogoPath,
        jsnSystemContact: Demo_jsnSystemInfo.jsnSystemContact,
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
    ctrlLogin.handelSubmit({
      appState,
      appDispatch,
      navigate,
      formData,
    });
  };

  return (
    <React.Fragment>
      {!isLoading && (
        <WebsiteHeader
          lang={lang}
          dir={dir}
          jsnSystemContact={systemInfo?.jsnSystemContact || {}}
          navList={lstWebsiteNav}
          websiteLogo={systemInfo?.strLogoPath}
          blnUserLogin={false}
        />
      )}
      {!isLoading && (
        <Grid container px={2} justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            lg="5"
            xs="12"
            sx={styles.itemContainer}
            alignContent={"center"}
            alignItems={"center"}
            py={2}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                height: "100%",
              }}
            >
              <Grid container item xs="12">
                <Grid item xs="12" container justifyContent={"center"}>
                  <Box
                    component={"img"}
                    sx={styles.logo}
                    src={systemInfo.strLogoPath}
                  />
                </Grid>
                <Grid
                  item
                  xs="12"
                  sx={styles.titleContainer}
                  container
                  justifyContent={"center"}
                >
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
                <Grid item xs="12" container px={2} justifyContent={"end"}>
                  <AnimButton0001
                    label={"Login"}
                    color={App_Second_Color}
                    type="submit"
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
      <Loader001 status={isLoading ? "loading" : "loaded"} />
    </React.Fragment>
  );
}

export default Login;
