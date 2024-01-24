export const createCategoryQuery = (objInput) => {
  return `mutation {
        createCategory(bigID:${objInput.bigID},bigSystemID:${
    objInput.bigSystemID
  },bigParentID:${objInput.bigParentID},jsnName:"""${JSON.stringify(
    objInput.jsnName
  )}""",jsnCategoryInfo:"""${JSON.stringify(
    objInput.jsnCategoryInfo
  )}""",lstReviews:"""${JSON.stringify(objInput.lstReviews)}""",intRating:${
    objInput.intRating
  },blnFeatured:${objInput.blnFeatured},blnMostOrdered:${
    objInput.blnMostOrdered
  },blnOnSale:${objInput.blnOnSale}){
          bigID
          bigSystemID
          jsnName
          bigParentID
          jsnCategoryInfo
          lstReviews
          intRating
          blnFeatured
          blnMostOrdered
          blnOnSale
        }
      }`;
};

export const updateCategoryQuery = (objInput) => {
  return `mutation {
        updateCategory(bigID:${objInput.bigID},bigSystemID:${
    objInput.bigSystemID
  },bigParentID:${objInput.bigParentID},jsnName:"""${JSON.stringify(
    objInput.jsnName
  )}""",jsnCategoryInfo:"""${JSON.stringify(
    objInput.jsnCategoryInfo
  )}""",lstReviews:"""${JSON.stringify(objInput.lstReviews)}""",intRating:${
    objInput.intRating
  },blnFeatured:${objInput.blnFeatured},blnMostOrdered:${
    objInput.blnMostOrdered
  },blnOnSale:${objInput.blnOnSale}){
          bigID
          bigSystemID
          jsnName
          bigParentID
          jsnCategoryInfo
          lstReviews
          intRating
          blnFeatured
          blnMostOrdered
          blnOnSale
        }
      }`;
};

export const findCategoriesQuery = (bigSystemID) => {
  return `query {
        findCategories(bigSystemID:${bigSystemID}){
          bigID
          bigSystemID
          jsnName
          bigParentID
          jsnCategoryInfo
          lstReviews
          intRating
          blnFeatured
          blnMostOrdered
          blnOnSale
        }
      }`;
};

export const deleteCategoryQuery = (bigID) => {
  return `mutation {
        deleteCategory(bigID:${bigID})
      }`;
};
