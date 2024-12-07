import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Grid, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import Checkout from "./checkout/Checkout";
import { useNavigate, useParams } from "react-router-dom";
import Products from "./products/Products";
import DeliveryInfo from "./deliveryInfo/DeliveryInfo";
import TotalInfo from "./totalInfo/TotalInfo";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";

const styles = {
  container: { lg: { my: "50px" }, xs: { my: "20px" } },
  cartInfo: { lg: { mt: "40px" }, xs: { mt: "10px" } },
};

function Cart() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [openCheckout, setOpenCheckout] = useState(false);
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);
  const onChangeQuantity = (product, quantity) => {
    const productIndex = appState.userInfo.userCart.lstProduct.findIndex(
      ({ bigID }) => `${product.bigID}` === `${bigID}`
    );
    appState.userInfo.userCart.lstProduct[productIndex] = {
      ...appState.userInfo.userCart.lstProduct[productIndex],
      intQuantity: quantity,
    };
    appDispatch({ ...appState });
  };
  const handleCartDiscard = () => {
    appState.userInfo.userCart.lstProduct = [];
    appState.userInfo.userCart.strTotalPrice = "";
    appDispatch({ ...appState });
  };
  const initOrderedCategories = useMemo(() => {
    return appState?.userInfo?.userCart?.lstProduct?.map((product) => {
      const category = appState?.systemInfo?.systemMenu?.find(
        ({ bigID }) => `${product.bigID}` === `${bigID}`
      );
      return { ...product, ...category };
    });
  }, [appState?.systemInfo?.userCart]);
  const [orderedCategories, setOrderedCategories] = useState([
    ...initOrderedCategories,
  ]);

  const totalPrice = appState?.userInfo?.userCart?.lstProduct.reduce(
    (total, { strPrice, intQuantity }) => {
      return total + Number(strPrice) * intQuantity;
    },
    0
  );

  const handleCheckoutOpen = () => {
    if (!orderedCategories?.length) {
      alert("your cart is empty!");
      return;
    }
    setOpenCheckout(true);
  };

  const removeOrderProduct = (product) => {
    appState.userInfo.userCart.lstProduct =
      appState.userInfo.userCart.lstProduct.filter(
        ({ bigID }) => `${bigID}` !== `${product.bigID}`
      );
    setOrderedCategories([
      ...orderedCategories.filter(
        ({ bigID }) => `${bigID}` !== `${product.bigID}`
      ),
    ]);
    appDispatch({ ...appState });
  };

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
        customerEditMode={true}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userCart?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      <Grid container justifyContent={"center"} sx={styles.container}>
        <Grid item lg={10} xs={12} px={2} container>
          <Grid item xs={12} px={1}>
            <Products
              orderedCategories={orderedCategories}
              onChangeQuantity={onChangeQuantity}
              removeOrderProduct={removeOrderProduct}
              handleCartDiscard={handleCartDiscard}
              lang={lang}
              dir={dir}
              appState={appState}
            />
          </Grid>
          <Grid item xs={12} container sx={styles.cartInfo}>
            <Grid
              item
              lg={4}
              xs={12}
              py={isExtraSmallAndDown?"20px":0}
              px={1}
            >
              <DeliveryInfo appState={appState} lang={lang} dir={dir} />
            </Grid>
            <Grid
              item
              lg={8}
              py={isExtraSmallAndDown?"20px":0}
              xs={12}
              px={1}
            >
              <TotalInfo
                dir={dir}
                handleCheckoutOpen={handleCheckoutOpen}
                lang={lang}
                totalPrice={totalPrice}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Checkout
        open={openCheckout}
        handleClose={() => setOpenCheckout(false)}
        dir={dir}
        lang={lang}
      />
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default Cart;
