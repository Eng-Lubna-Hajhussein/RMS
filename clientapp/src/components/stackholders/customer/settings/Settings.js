import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlSittings } from "./controller/CtrlSettings";
import { orderRegions } from "appHelper/appFunctions";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import DeliveryAddress from "./deliveryAddress/DeliveryAddress";
import PersonalInfo from "./personalInfo/PersonalInfo";
import PaymentInfo from "./paymentInfo/PaymentInfo";
import Location from "./location/Location";

const styles = {
  container: {
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
  fullWidth: {
    width: "100%",
  },
  deleteBtn: {
    background: "#000",
    padding: "20px 40px",
    borderRadius: "10px",
    ":hover": {
      background: App_Primary_Color,
    },
  },
  deleteBtnLabel: {
    textTransform: "capitalize",
  },
};

function Settings() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const deliveryAddress = useMemo(() => {
    return orderRegions({
      Regions: appState?.systemInfo?.systemDeliveryAddress,
    });
  }, []);
  const addressInitial = useMemo(() => {
    return {
      countryID: appState?.userInfo?.jsnAddress?.jsnCountry?.bigID,
      cityID: appState?.userInfo?.jsnAddress?.jsnCity?.bigID,
      townID: Number(appState?.userInfo?.jsnAddress?.jsnTown?.bigID),
    };
  }, []);
  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const [address, setAddress] = useState(addressInitial);
  const onChangeCountry = (event) => {
    const countryID = event.target.value;
    address.countryID = countryID;
    address.cityID = countryID
      ? Object.keys(deliveryAddress?.appRegionsID[countryID] || {})[0]
      : null;
    address.townID =
      countryID && address.cityID
        ? deliveryAddress?.appRegionsID[countryID][address.cityID][0]
        : null;
    setAddress({ ...address });
  };
  const onChangeCity = (event) => {
    const cityID = event.target.value;
    address.cityID = cityID;
    address.townID =
      address.countryID && address.cityID
        ? deliveryAddress?.appRegionsID[address.countryID][address.cityID][0]
        : null;
    setAddress({ ...address });
  };
  const onChangeTown = (event) => {
    const townID = event.target.value;
    address.townID = townID;
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
    ctrlSittings.handelSubmit({
      appState,
      appDispatch,
      formData,
      address: address,
      setIsLoading: setIsLoading,
      deliveryAddress: deliveryAddress,
    });
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const userNavList = ctrlRouteCustomer.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteCustomer.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteAccount = () => {
    ctrlSittings.deleteAccount({
      appDispatch: appDispatch,
      appState: appState,
      setIsLoading: setIsLoading,
      navigate: navigate,
      systemName: systemName,
      systemID: systemID,
    });
  };
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            xs={10}
            sx={styles.container}
          >
            <form onSubmit={handleSubmit(onSubmit)} style={styles.fullWidth}>
              <Grid item xs={12} pb={3} container justifyContent={"center"}>
                <Typography component={"h3"} sx={styles.title}>
                  Settings
                </Typography>
              </Grid>
              <PersonalInfo
                appState={appState}
                dir={dir}
                errors={errors}
                lang={lang}
                register={register}
                trigger={trigger}
              />
              <DeliveryAddress
                address={address}
                deliveryAddress={deliveryAddress}
                dir={dir}
                lang={lang}
                onChangeCity={onChangeCity}
                onChangeCountry={onChangeCountry}
                onChangeTown={onChangeTown}
              />
              <PaymentInfo
                appState={appState}
                dir={dir}
                errors={errors}
                lang={lang}
                register={register}
                trigger={trigger}
              />
              <Location appState={appState} dir={dir} lang={lang} />

              <Grid item xs={12} container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={"Save Changes"}
                  color={App_Second_Color}
                  type="submit"
                />
              </Grid>
            </form>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} container p={2}>
              <Button
                sx={styles.deleteBtn}
                fullWidth
                onClick={handleDeleteAccount}
              >
                <Typography color={"#fff"} sx={styles.deleteBtnLabel}>
                  Delete Account
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default Settings;
