import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetails from "./productDetails/ProductDetails";
import ProductReviews from "./productReviews/ProductReviews";
import { lstWebsiteNav, objRoleID } from "appHelper/appVariables";

const styles = {
  container: {
    marginY: "5px",
  },
};

function Product() {
  const { appState } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { productID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = appState?.clientInfo?.blnUserLogin;
    if (loggedIn) {
      const isAdmin = appState?.userInfo?.bigUserRoleID === objRoleID.Admin;
      const isCustomer =
        appState?.userInfo?.bigUserRoleID === objRoleID.Customer;
      const strSystemPathURL = appState?.systemInfo?.strSystemPathURL;
      if (isAdmin) {
        navigate(`/admin/product/${productID}/${strSystemPathURL}`);
      }
      if (isCustomer) {
        navigate(`/customer/product/${productID}/${strSystemPathURL}`);
      }
    }
  }, []);
  const product = useMemo(() => {
    return appState.systemInfo.systemMenu.find(
      ({ bigID }) => Number(bigID) === Number(productID)
    );
  }, []);

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        userNavList={lstWebsiteNav}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      <Grid container justifyContent={"center"} sx={styles.container}>
        <Grid item xs="10" container>
          <ProductDetails product={product} lang={lang} dir={dir} />
          <ProductReviews product={product} lang={lang} dir={dir} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Product;
