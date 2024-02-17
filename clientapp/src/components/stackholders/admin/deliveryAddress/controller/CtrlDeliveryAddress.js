import { objCategoriesType } from "appHelper/appVariables";
import { bulkCategories } from "appHelper/fetchapi/tblCategory/tblCategory";

export const CtrlDeliveryAddress = {
  onSave: async ({
    appState,
    setIsLoading,
    appDispatch,
    isUpdated,
    regions,
  }) => {
    try {
      setIsLoading(true);
      if (!isUpdated.current) {
        alert("no updates");
      }
      if (isUpdated.current) {
        const categoriesOnDeleteIDs = (
          appState?.systemInfo?.systemDeliveryAddress || []
        ).reduce((IDs, category) => {
          const isCatOnDelete =
            regions?.categories?.findIndex(
              ({ bigID }) => `${category.bigID}` === `${bigID}`
            ) === -1;
          if (isCatOnDelete) {
            IDs.push(category.bigID);
          }
          return IDs;
        }, []);
        const categoriesData = await bulkCategories(
          regions.categories,
          categoriesOnDeleteIDs
        );
        if (Array.isArray(categoriesData)) {
          const systemDeliveryAddress = [];
          categoriesData.forEach((category) => {
            if (
              category.bigCategoryTypeID === objCategoriesType.DeliveryAddress
            ) {
              systemDeliveryAddress.push({
                ...category,
                jsnName: JSON.parse(category?.jsnName || {}),
              });
            }
          });
          appState.systemInfo.systemDeliveryAddress = systemDeliveryAddress;
          appDispatch({ ...appState });
          isUpdated.current = false;
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
