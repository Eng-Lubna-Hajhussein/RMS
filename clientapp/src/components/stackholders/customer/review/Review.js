import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import { Grid, Typography } from "@basetoolkit/ui";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlReview } from "./controller/CtrlReview";
import CustomerReview from "./customerReview/CustomerReview";
import SystemReviews from "./systemReviews/SystemReviews";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";

const styles = {
  container: {
    lg: { my: "50px" },
    xs: { my: "20px" },
  },
};

function Review() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const initialReviews = useMemo(() => {
    return appState?.systemInfo?.lstSystemReviews || [];
  });
  const userReview = useMemo(() => {
    return (
      appState?.systemInfo?.lstSystemReviews?.find(
        (review) => review.bigUserID === appState.userInfo.bigUserID
      ) || null
    );
  });
  const [reviews, setReviews] = useState(initialReviews);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
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
      reviews: reviews,
      setReviews: setReviews,
      review: review,
    });
  };

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
      reviews: reviews,
      setReviews: setReviews,
      review: review,
    });
  };

  const handleDelete = () => {
    ctrlReview.deleteReview({
      appState: appState,
      appDispatch: appDispatch,
      setIsLoading: setIsLoading,
      reviews: reviews,
      setReviews: setReviews,
      bigUserID: appState.userInfo.bigUserID,
    });
  };

  const handleRatingChange = (e) => setIntRating(e.target.value);

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
          <Grid item lg={10} xs={12} px={2} container>
            <CustomerReview
              dir={dir}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleRatingChange={handleRatingChange}
              intRating={intRating}
              lang={lang}
              reviewTextArb={reviewTextArb}
              reviewTextEng={reviewTextEng}
              userReview={userReview}
            />
            <SystemReviews reviews={reviews} lang={lang} dir={dir} />
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

export default Review;
