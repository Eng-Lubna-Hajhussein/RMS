import React, { useContext, useEffect, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import { AppContext } from "contextapi/context/AppContext";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { useForm, Controller } from "@basetoolkit/ui/form";
import { Grid, TextField, Typography, Box } from "@basetoolkit/ui";
import { App_Second_Color } from "appHelper/appColor";
import { ctrlLogin } from "./controller/CtrlLogin";
import { useNavigate, useParams } from "react-router-dom";
import Loader001 from "components/sharedUI/loader001/Loader001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  itemContainer: {
    background: "#f3fbfb",
    height: "fit-content",
    borderRadius: "20px",
    lg: { my: "50px", p: "30px !important" },
    lg: { my: "20px", p: "15px !important" },
  },
  title: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "25px" },
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
  },
  logo: {
    width: "150px",
    height: "30px",
  },
  titleContainer: {
    lg: { pb: "20px" },
    xs: { pb: "10px" },
  },
};

function Login() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const navigate = useNavigate();
  const { systemID, systemName } = useParams();
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    ctrlLogin.handelSubmit({
      appState,
      appDispatch,
      navigate,
      formData,
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
      {!isLoading && (
        <WebsiteHeader
          lang={lang}
          dir={dir}
          jsnSystemContact={systemInfo?.jsnSystemContact || {}}
          navList={lstWebsiteNav}
          websiteLogo={systemInfo?.strLogoPath}
          blnUserLogin={false}
          userNavList={userNavList}
        />
      )}
      {!isLoading && (
        <Grid container px={2} justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            lg={5}
            xs={12}
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
              <Grid container item xs={12}>
                <Grid item xs={12} container justifyContent={"center"}>
                  <Box
                    component={"img"}
                    sx={styles.logo}
                    src={systemInfo.strLogoPath}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={styles.titleContainer}
                  container
                  justifyContent={"center"}
                >
                  <Typography component={"h3"} sx={styles.title}>
                    {dictionary.login.title[lang]}
                  </Typography>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} p={2}>
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
                  <Grid item xs={12} p={2}>
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
                <Grid item xs={12} container px={2} justifyContent={"end"}>
                  <AnimButton0001
                    label={dictionary.buttons.login[lang]}
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
