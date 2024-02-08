import { generateRandomID } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
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

export const ctrlReview = {
  addReview: async ({
    appState,
    appDispatch,
    isLoading,
    setIsLoading,
    reviews,
    setReviews,
    review,
  }) => {
    try {
      setIsLoading(true);
      const objInput = {
        bigSystemID: appState.systemInfo.bigSystemID,
        lstSystemReviews: [review, ...reviews],
      };
      const jsnSystemReviews = await updateSystemReviews(objInput);
      const systemReviews = JSON.parse(jsnSystemReviews?.lstSystemReviews)
      if (systemReviews?.length) {
        appState.systemInfo.lstSystemReviews = systemReviews;
        appDispatch({...appState});
        setReviews([...systemReviews]);
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
    reviews,
    setReviews,
    bigUserID,
    index,
  }) => {
    try {
      setIsLoading(true);
      const lstSystemReviews = reviews.filter((review)=>review.bigUserID!==bigUserID);
      const objInput = {
        bigSystemID: appState.systemInfo.bigSystemID,
        lstSystemReviews: lstSystemReviews
      };
      const jsnSystemReviews = await updateSystemReviews(objInput);
      const systemReviews = JSON.parse(jsnSystemReviews?.lstSystemReviews)
      if (systemReviews) {
        appState.systemInfo.lstSystemReviews = systemReviews;
        appDispatch({...appState});
        setReviews([...systemReviews]);
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
    reviews,
    setReviews,
    review,
  }) => {
    try {
      setIsLoading(true);
      const lstSystemReviews = JSON.parse(JSON.stringify(reviews));
      const reviewIndex = reviews.findIndex(({bigUserID})=>bigUserID===review.bigUserID);
      lstSystemReviews[reviewIndex] = review;
      const objInput = {
        bigSystemID: appState.systemInfo.bigSystemID,
        lstSystemReviews: lstSystemReviews,
      };
      const jsnSystemReviews = await updateSystemReviews(objInput);
      const systemReviews = JSON.parse(jsnSystemReviews?.lstSystemReviews)
      if (systemReviews?.length) {
        appState.systemInfo.lstSystemReviews = systemReviews;
        appDispatch({...appState});
        setReviews([...systemReviews]);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
