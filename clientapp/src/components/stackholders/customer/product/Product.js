import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlReview } from "./controller/CtrlProduct";
import ProductReviews from "./productReviews/ProductReviews";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import ProductImage from "./productImage/ProductImage";
import ProductDetails from "./productDetails/ProductDetails";
import ProductReview from "./productReview/ProductReview";

const styles = {
  container: {
    marginY: "50px",
  },
};

function Product() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { productID, systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const productInitial = useMemo(() => {
    return appState.systemInfo.systemMenu.find(
      ({ bigID }) => Number(bigID) === Number(productID)
    );
  }, []);
  const [product, setProduct] = useState(productInitial);

  const [isLoading, setIsLoading] = useState(false);
  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
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

  const userReview = useMemo(() => {
    return (
      product?.jsnCategoryInfo?.lstReviews?.find(
        (review) => review.bigUserID === appState.userInfo.bigUserID
      ) || null
    );
  }, [product]);
  const [intRating, setIntRating] = useState(userReview?.intRating);
  const reviewTextEng = useRef();
  const reviewTextArb = useRef();

  useEffect(() => {
    setIntRating(userReview?.intRating);
  }, [userReview]);

  const handleAdd = () => {
    const review = {
      bigUserID: appState.userInfo.bigUserID,
      jsnUserName: appState.userInfo.jsnFullName,
      intRating: Number(intRating),
      jsnComment: {
        eng: reviewTextEng.current.value,
        arb: reviewTextArb.current.value,
      },
      strImgPath: appState.userInfo.strImgPath,
      dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    ctrlReview.addReview({
      appState: appState,
      appDispatch: appDispatch,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      review: review,
      product: product,
      setProduct: setProduct,
    });
  };

  const onChangeRating = (e) => setIntRating(e.target.value);
  const handleEdit = () => {
    const review = {
      bigUserID: appState.userInfo.bigUserID,
      jsnUserName: appState.userInfo.jsnFullName,
      intRating: Number(intRating),
      jsnComment: {
        eng: reviewTextEng.current.value,
        arb: reviewTextArb.current.value,
      },
      strImgPath: appState.userInfo.strImgPath,
      dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    ctrlReview.editReview({
      appState: appState,
      appDispatch: appDispatch,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      review: review,
      product: product,
      setProduct: setProduct,
      bigUserID: appState.userInfo.bigUserID,
    });
  };

  const handleDelete = () => {
    ctrlReview.deleteReview({
      appState: appState,
      appDispatch: appDispatch,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      product: product,
      setProduct: setProduct,
      bigUserID: appState.userInfo.bigUserID,
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
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid item xs="12" container>
              <Grid item xs="4" px={4}>
                <ProductImage product={product} dir={dir} />
              </Grid>
              <Grid
                item
                xs="8"
                px={4}
                container
                alignContent={"start"}
                justifyContent={"end"}
              >
                <Grid item xs="12" container p={0} m={0}>
                  <ProductDetails product={product} lang={lang} dir={dir} />
                </Grid>
                <Grid item xs="12" container p={0} m={0}>
                  <ProductReview
                    dir={dir}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    intRating={intRating}
                    lang={lang}
                    onChangeRating={onChangeRating}
                    reviewTextArb={reviewTextArb}
                    reviewTextEng={reviewTextEng}
                    userReview={userReview}
                  />
                </Grid>
              </Grid>
            </Grid>
            <ProductReviews product={product} lang={lang} dir={dir} />
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

export default Product;
