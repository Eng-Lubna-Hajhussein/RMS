import React from "react";
import Header from "./sections/header/Header";
import "./Home.css";
import Hero from "./sections/hero/Hero";
import Owner from "./sections/owner/Owner";
import Events from "./sections/events/Events";
import Menu from "./sections/menu/Menu";
import MostOrdered from "./sections/mostOrdered/MostOrdered";
import Reservation from "./sections/reservation/Reservation";
import Featured from "./sections/featured/Featured";
import Testimonial from "./sections/testimonial/Testimonial";
import Team from "./sections/team/Team";
import About from "./sections/about/About";
import Follow from "./sections/follow/Follow";
import Footer from "./sections/footer/Footer";
import BtnProgressToTop from "components/sharedUI/btnProgressToTop/BtnProgressToTop";
import Loader001 from "components/sharedUI/loader001/Loader001";
const strServerAssetsPath = "http://localhost:4000/assets/";

const jsnSystemInfo = {
  lstContact: [
    {
      jsnName: { eng: "email", arb: "الايميل" },
      strValue: "info@domain.com",
      strIcon: "EmailOutlined",
    },
    {
      jsnName: { eng: "phone", arb: "الهاتف" },
      strValue: "+1 (850) 344 0 66",
      strIcon: "PhoneOutlined",
    },
  ],
  lstSocial: [
    {
      jsnName: { eng: "facebook", arb: "فيسبوك" },
      strPath: "https://www.facebook.com/",
    },
    {
      jsnName: { eng: "instagram", arb: "انستغرام" },
      strPath: "https://www.instagram.com/",
    },
    {
      jsnName: { eng: "youtube", arb: "يوتيوب" },
      strPath: "https://www.youtube.com/",
    },
  ],
  jsnHeroSection: {
    jsnTitle: {
      eng: "the perfect space to enjoy fantastic food",
      arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
    },
    jsnSubtitle: {
      eng: "festive dining at Farthings where we are strong believers in using the very best produce",
      arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
    },
    strVideoPath: "assets/video/about-resturant.mp4",
    lstSlidesImgs: [
      `${strServerAssetsPath}slide1-default.jpg`,
      `${strServerAssetsPath}slide2-default.jpg`,
      `${strServerAssetsPath}slide3-default.jpg`,
      `${strServerAssetsPath}slide4-default.jpg`,
    ],
  },
  jsnOwnerSection: {
    jsnTitle: {
      eng: "about the food restaurant",
      arb: "اعرف المزيد عن مطعمنا",
    },
    jsnSubtitle: {
      eng: "new ground with dishes to be enjoyed",
      arb: "افضل الخدمات وافضل الاطباق الشهية",
    },
    jsnOwnerComment: {
      eng: "nisl quam nestibulum ac quam nec odio eleme aucan ligula. orci varius nat oque pena tibus et urient monte nascete ridiculus mus nellentesq um ac qu am nec odio rbine. nisl quam nestibu aucan ligula.",
      arb: "لقد قمت بتاسيس هذا المطعم بجهد شديد لتقديم افضل الخدمات تحت اشراف افضل الايادي العاملة وافضل الطباخين المحترفين",
    },
    strOwnerImgPath: "assets/image/owner-avatar.jpg",
    jsnOwnerName: { eng: "willimes james", arb: "ويليام جيمس" },
    jsnOwnerSpecialization: {
      eng: "director and chief operations officer",
      arb: "المدير والرئيس التنفيذي للمطعم",
    },
  },
  bigWeeklySpecialMeal: "3013919779",
};

const categories = [
  {
    bigID: 3891922142,
    jsnName: { eng: "desert", arb: "الحلوى" },
    bigParentID: 0,
    jsnProductInfo: { strIconPath: `${strServerAssetsPath}desert.svg`, strImgPath: `${strServerAssetsPath}desert.png` },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: null,
  },
  {
    bigID: 3156578173,
    jsnName: { eng: "steak", arb: "الستيك" },
    bigParentID: 0,
    jsnProductInfo: { strIconPath:  `${strServerAssetsPath}steak.svg`, strImgPath:`${strServerAssetsPath}steak.png` },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: null,
  },
  {
    bigID: 9723164333,
    jsnName: { eng: "coffee", arb: "القهوة" },
    bigParentID: 0,
    jsnProductInfo: { strIconPath:  `${strServerAssetsPath}coffee.svg`, strImgPath: `${strServerAssetsPath}coffee.png` },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: null,
  },
  {
    bigID: 7087331728,
    jsnName: { eng: "pizza", arb: "البيتزا" },
    bigParentID: 0,
    jsnProductInfo: { strIconPath:  `${strServerAssetsPath}pizza.svg`, strImgPath: `${strServerAssetsPath}pizza.png` },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: null,
  },
  {
    bigID: 8129351047,
    jsnName: { eng: "burger", arb: "البرغر" },
    bigParentID: 0,
    jsnProductInfo: { strIconPath:  `${strServerAssetsPath}burger.svg`, strImgPath: `${strServerAssetsPath}burger.png` },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: null,
  },
  {
    bigID: 3013919779,
    bigParentID: 3891922142,
    jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "9.00",
      strImgPath: `${strServerAssetsPath}dish1-default.png`,
      jsnDescription: {
        eng: "Toested french bread topped with romano",
        arb: "خبز فرنسي مغطى بالرومانو",
      },
      strSalePrice:"7:50",
    },
    blnFeatured: true,
    blnMostOrdered: false,
    blnOnSale: true,
    lstReviews: null, //[{bigUserID:"",strImgPath:"",strReview:"",intRating:""}],
    intRating: 5,
  },
  {
    bigID: 9559275219,
    bigParentID: 3891922142,
    jsnName: { eng: "Rastrami Roll", arb: "راسترامي رول" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "16.00",
      strImgPath:  `${strServerAssetsPath}dish2-default.png`,
      jsnDescription: {
        eng: "Spreadable cream cheese, blue cheese",
        arb: "جبنة كريمية قابلة للدهن ، جبنة زرقاء",
      },
    },
    blnFeatured: true,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 8033919014,
    bigParentID: 3891922142,
    jsnName: { eng: "Caprese Salad Kabobs", arb: "كابريزي سلطة كابوبس" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "34.00",
      strImgPath:  `${strServerAssetsPath}dish3-default.png`,
      jsnDescription: {
        eng: "Cherry-size fresh mozzarella cheese balls",
        arb: "كرات جبنة موتزاريلا طازجة بحجم الكرز",
      },
    },
    blnFeatured: true,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 8052907570,
    bigParentID: 3891922142,
    jsnName: {
      eng: "Peachy Jalepeno Guacomole",
      arb: "خوخي جاليبينو جواكومولي",
    },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "40.00",
      strImgPath: `${strServerAssetsPath}dish1-default.png`,
      jsnDescription: {
        eng: "Ground cumin, avocados, peeled and cubed",
        arb: "كمون مطحون ، أفوكادو ، مقشر ومقطع إلى مكعبات",
      },
    },
    blnFeatured: true,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 1806513103,
    bigParentID: 3156578173,
    jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "9.00",
      strImgPath: `${strServerAssetsPath}dish2-default.png`,
      jsnDescription: {
        eng: "Toested french bread topped with romano",
        arb: "خبز فرنسي مغطى بالرومانو",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 2710287289,
    bigParentID: 3156578173,
    jsnName: { eng: "Rastrami Roll", arb: "راسترامي رول" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "16.00",
      strImgPath: `${strServerAssetsPath}dish3-default.png`,
      jsnDescription: {
        eng: "Spreadable cream cheese, blue cheese",
        arb: "جبنة كريمية قابلة للدهن ، جبنة زرقاء",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 7547915806,
    bigParentID: 3156578173,
    jsnName: { eng: "Caprese Salad Kabobs", arb: "كابريزي سلطة كابوبس" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "34.00",
      strImgPath:  `${strServerAssetsPath}dish1-default.png`,
      jsnDescription: {
        eng: "Cherry-size fresh mozzarella cheese balls",
        arb: "كرات جبنة موتزاريلا طازجة بحجم الكرز",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 2818883117,
    bigParentID: 3156578173,
    jsnName: {
      eng: "Peachy Jalepeno Guacomole",
      arb: "خوخي جاليبينو جواكومولي",
    },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "40.00",
      strImgPath:  `${strServerAssetsPath}dish2-default.png`,
      jsnDescription: {
        eng: "Ground cumin, avocados, peeled and cubed",
        arb: "كمون مطحون ، أفوكادو ، مقشر ومقطع إلى مكعبات",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 5119732624,
    jsnName: { eng: "Espresso Macchiato", arb: "اسبريسو ماكياتو" },
    bigParentID: 9723164333,
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "9.00",
      strImgPath: `${strServerAssetsPath}dish3-default.png`,
      jsnDescription: {
        eng: "milk / coffee / sugar",
        arb: "حليب / قهوة / سكر",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 6976723630,
    jsnName: { eng: "Mocha Whipped Cream", arb: "موكا كريمة مخفوقة" },
    bigParentID: 9723164333,
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "16.00",
      strImgPath:  `${strServerAssetsPath}dish1-default.png`,
      jsnDescription: {
        eng: "milk / coffee / sugar",
        arb: "حليب / قهوة / سكر",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 7629450130,
    jsnName: { eng: "Cold Coffee", arb: "قهوة باردة" },
    bigParentID: 9723164333,
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "34.00",
      strImgPath:  `${strServerAssetsPath}dish2-default.png`,
      jsnDescription: {
        eng: "milk / coffee / sugar",
        arb: "حليب / قهوة / سكر",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 9177008033,
    jsnName: { eng: "Caramel Macchiato", arb: "كراميل ماكياتو" },
    bigParentID: 9723164333,
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "40.00",
      strImgPath:  `${strServerAssetsPath}dish3-default.png`,
      jsnDescription: {
        eng: "milk / coffee / sugar",
        arb: "حليب / قهوة / سكر",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
  {
    bigID: 9785069374,
    bigParentID: 7087331728,
    jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
    jsnProductInfo: {
      strIconPath: "",
      strPrice: "9.00",
      strImgPath:  `${strServerAssetsPath}dish1-default.png`,
      jsnDescription: {
        eng: "Toested french bread topped with romano",
        arb: "خبز فرنسي مغطى بالرومانو",
      },
    },
    blnFeatured: false,
    blnMostOrdered: false,
    blnOnSale: false,
    lstReviews: null,
    intRating: 5,
  },
];

const featured = categories.filter((category)=>category.blnFeatured);

function Home() {
  const lang = "arb";
  const dir = "rtl";
  return (
    <React.Fragment>
      <Header
        lang={lang}
        dir={dir}
        lstContact={jsnSystemInfo.lstContact}
        lstSocial={jsnSystemInfo.lstSocial}
      />
      <Hero
        lang={lang}
        dir={dir}
        jsnHeroSection={jsnSystemInfo.jsnHeroSection}
      />
      <Owner
        lang={lang}
        dir={dir}
        jsnOwnerSection={jsnSystemInfo.jsnOwnerSection}
      />
      {/* <Events lang={lang}  /> */}
      <Menu lang={lang} dir={dir} categories={categories} />
      <MostOrdered lang={lang} />
      <Reservation lang={lang} />
      <Featured lang={lang} dir={dir} lstFeatured = {featured} />
      <Testimonial lang={lang} />
      <Team lang={lang} />
      <About lang={lang} />
      <Follow lang={lang} />
      <Footer lang={lang} />
      <BtnProgressToTop lang={lang} />
      <Loader001 status={"loaded"} />
    </React.Fragment>
  );
}

export default Home;
