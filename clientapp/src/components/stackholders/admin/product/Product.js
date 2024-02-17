import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useMemo } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetails from "./productDetails/ProductDetails";
import ProductReviews from "./productReviews/ProductReviews";

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
  const product = useMemo(() => {
    return appState.systemInfo.systemMenu.find(
      ({ bigID }) => Number(bigID) === Number(productID)
    );
  }, []);
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 5674846478, nav: { eng: "settings", arb: "الاعدادات" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];
  const navList = [
    { bigNavID: 1342146478, nav: { eng: "home", arb: "الرئيسية" } },

    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        { bigNavID: 8944146400, nav: { eng: "shop cart", arb: "كرت التسوق" } },
        { bigNavID: 6944146478, nav: { eng: "cart checkout", arb: "الحساب" } },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        { nav: { eng: "undelivered order", arb: "مدونتنا" } },
        { nav: { eng: "delivered orders", arb: "تفاصيل المدونة" } },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" } },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" } },
  ];

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
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
