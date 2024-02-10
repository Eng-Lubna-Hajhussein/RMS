import { generateRandomID } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
import { updateCategoryReviews } from "appHelper/fetchapi/tblCategory/tblCategory";
import { setOrderDelivered } from "appHelper/fetchapi/tblOrder/tblOrder";
import {
  createTable,
  deleteTable,
  freeTable,
  updateTable,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import {
  findSystem,
  updateSystem,
  updateSystemReviews,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import { login } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlOrder = {
  orderDelivered: async ({
    appState,
    appDispatch,
    isLoading,
    setIsLoading,
    setOrderedCategories,
    bigOrderID
  }) => {
    try {
      setIsLoading(true);
      const deliveredOrder = await setOrderDelivered(bigOrderID);
      if (deliveredOrder?.blnDelivered) {
        appState.userInfo.userOrder = {
            lstProduct: [],
            strTotalPrice: "",
          }
        appDispatch({...appState});
        setOrderedCategories([]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  deleteReview: async ({
    appState,
    appDispatch,
    isLoading,
    setIsLoading,
    // review,
    product,
    setProduct,
    bigUserID
  }) => {
    try {
        setIsLoading(true);
        const lstReviews = (product?.categoryInfo?.lstReviews||[]).filter((review)=>`${bigUserID}`!==`${review.bigUserID}`);
       console.log({lstReviews})
        const ratingSum = lstReviews.reduce((sum, review, index) => {
          return sum + review?.intRating;
        }, 0);
        const intRating = Math.round(ratingSum / lstReviews.length);
        const objInput = {
          bigID: product.bigID,
          bigSystemID: appState.systemInfo.bigSystemID,
          jsnCategoryInfo: {
            ...product.jsnCategoryInfo,
            lstReviews: lstReviews,
            intRating: intRating,
          },
        };
        const jsnCategoryInfo = await updateCategoryReviews(objInput);
        const categoryInfo = JSON.parse(jsnCategoryInfo?.jsnCategoryInfo);
        const productReviews = categoryInfo?.lstReviews||[];
        if (productReviews) {
          const productIndex = appState?.systemInfo?.systemMenu.findIndex(
            ({ bigID }) => bigID === product?.bigID
          );
          appState.systemInfo.systemMenu[productIndex].jsnCategoryInfo = {
            ...appState.systemInfo.systemMenu[productIndex].jsnCategoryInfo,
            lstReviews: productReviews,
            intRating:categoryInfo?.intRating
          };
          appDispatch({ ...appState });
          setProduct({
            ...product,
            jsnCategoryInfo: {
              ...product.jsnCategoryInfo,
              lstReviews: productReviews,
              intRating:categoryInfo?.intRating
            },
          });
        }
        setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  editReview: async ({
    appState,
    appDispatch,
    isLoading,
    setIsLoading,
    review,
    product,
    setProduct,
    bigUserID
  }) => {
    try {
        setIsLoading(true);
        const reviewIndex = product.jsnCategoryInfo.lstReviews.findIndex((review)=>`${bigUserID}`===`${review.bigUserID}`);
        const lstReviews = product?.categoryInfo?.lstReviews || [];
        lstReviews[reviewIndex] = review;
        const ratingSum = lstReviews.reduce((sum, review, index) => {
          return sum + review?.intRating;
        }, 0);
        const intRating = Math.round(ratingSum / lstReviews.length);
        const objInput = {
          bigID: product.bigID,
          bigSystemID: appState.systemInfo.bigSystemID,
          jsnCategoryInfo: {
            ...product.jsnCategoryInfo,
            lstReviews: lstReviews,
            intRating: intRating,
          },
        };
        const jsnCategoryInfo = await updateCategoryReviews(objInput);
        const categoryInfo = JSON.parse(jsnCategoryInfo?.jsnCategoryInfo);
        const productReviews = categoryInfo?.lstReviews;
        if (productReviews?.length) {
          const productIndex = appState?.systemInfo?.systemMenu.findIndex(
            ({ bigID }) => bigID === product?.bigID
          );
          appState.systemInfo.systemMenu[productIndex].jsnCategoryInfo = {
            ...appState.systemInfo.systemMenu[productIndex].jsnCategoryInfo,
            lstReviews: productReviews,
            intRating:categoryInfo?.intRating
          };
          appDispatch({ ...appState });
          setProduct({
            ...product,
            jsnCategoryInfo: {
              ...product.jsnCategoryInfo,
              lstReviews: productReviews,
              intRating:categoryInfo?.intRating
            },
          });
        }
        setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
