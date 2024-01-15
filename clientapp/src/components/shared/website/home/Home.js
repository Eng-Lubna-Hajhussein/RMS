import React, { useMemo } from "react";
import Header from "./sections/header/Header";
import "./Home.css";
import Hero from "./sections/hero/Hero";
import Owner from "./sections/owner/Owner";
import Reservation from "./sections/reservation/Reservation";
import Menu from "./sections/menu/Menu";
import MostOrdered from "./sections/mostOrdered/MostOrdered";
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
  jsnSystemContact: {
    strEmail: "info@domain.com",
    strPhone: "+1 (850) 344 0 66",
    strFacebook: "",
    strInstagram: "",
    strYoutube: "",
  },
  lstSystemReviews: [
    {
      bigUserID: 1111111111,
      jsnUserName: { eng: "Bratlee Hamint", arb: "براتلي هامينت" },
      intRating: 4,
      jsnComment: {
        eng: "A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food. All great deeds and all great thoughts",
        arb: "مطعم جيد مثل للعطلة. إنه يخدمك بكل نظافة ، ويصبح أكثر بكثير من مجرد الطعام. كل الأعمال العظيمة وكل الأفكار العظيمة",
      },
      strImgPath: "",
    },
    {
      bigUserID: 22222222222,
      jsnUserName: { eng: "Lubna Hajuhssein", arb: "لبنى حاج حسين" },
      intRating: 3,
      jsnComment: {
        eng: "A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food. All great deeds and all great thoughts",
        // arb: "مطعم جيد مثل للعطلة. إنه يخدمك بكل نظافة ، ويصبح أكثر بكثير من مجرد الطعام. كل الأعمال العظيمة وكل الأفكار العظيمة",
      },
      strImgPath: "",
    },
    {
      bigUserID: 3333333333,
      jsnUserName: { eng: "Ali Hamint", arb: "علي هامينت" },
      intRating: 2,
      jsnComment: {
        eng: "A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food. All great deeds and all great thoughts",
        arb: "مطعم جيد مثل للعطلة. إنه يخدمك بكل نظافة ، ويصبح أكثر بكثير من مجرد الطعام. كل الأعمال العظيمة وكل الأفكار العظيمة",
      },
      strImgPath: "",
    },
    {
      bigUserID: 4444444444,
      jsnUserName: { eng: "Sami Hamint", arb: "سامي هامينت" },
      intRating: 3,
      jsnComment: {
        eng: "A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food. All great deeds and all great thoughts",
        arb: "مطعم جيد مثل للعطلة. إنه يخدمك بكل نظافة ، ويصبح أكثر بكثير من مجرد الطعام. كل الأعمال العظيمة وكل الأفكار العظيمة",
      },
      strImgPath: "",
    },
  ],
  lstSystemTeam: [
    {
      jsnName: { eng: "Thomas Walim", arb: "ثوماس ويليام" },
      jsnSpecialization: { eng: "Dessert specialist", arb: "اختصاصي حلويات" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-1.png`,
      strSignImgPath: `${strServerAssetsPath}demo/sign.png`,
      jsnDescription: {},
    },
    {
      jsnName: { eng: "James Jhonson", arb: "جيمس جوهانسون" },
      jsnSpecialization: { eng: "Chef Master", arb: "ماستر شيف" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-2.png`,
      strSignImgPath: `${strServerAssetsPath}demo/sign.png`,
      jsnDescription: {},
    },
    {
      jsnName: { eng: "Room Minal", arb: "روم مينال" },
      jsnSpecialization: { eng: "coffee specialist", arb: "اختصاصي قهوة" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-3.png`,
      strSignImgPath: `${strServerAssetsPath}demo/sign.png`,
      jsnDescription: {},
    },
    {
      jsnName: { eng: "Thomas Walim", arb: "ثوماس ويليام" },
      jsnSpecialization: { eng: "Dessert specialist", arb: "اختصاصي حلويات" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-1.png`,
      strSignImgPath: `${strServerAssetsPath}demo/sign.png`,
      jsnDescription: {},
    },
    {
      jsnName: { eng: "James Jhonson", arb: "جيمس جوهانسون" },
      jsnSpecialization: { eng: "Chef Master", arb: "ماستر شيف" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-2.png`,
      strSignImgPath: `${strServerAssetsPath}demo/sign.png`,
      jsnDescription: {},
    },
  ],
  jsnSystemSections: {
    lstHeroSlides:  [
        {strImgPath:`${strServerAssetsPath}demo/slide1.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
        },jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
        }},
        {strImgPath:`${strServerAssetsPath}demo/slide2.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
        },jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
        }},
        {strImgPath:`${strServerAssetsPath}demo/slide3.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
        },jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
        }},
        {strImgPath:`${strServerAssetsPath}demo/slide4.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
        },jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
        }},
      ],
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
    jsnTestimonialSection: {
      jsnTitle: {
        eng: "testimonial & reviews",
        arb: "التقييمات والشهادات",
      },
      jsnSubtitle: {
        eng: "our customar feedbacks",
        arb: "تقييمات زبائننا الكرام",
      },
      strImg1Path: `${strServerAssetsPath}demo/testimonialSecImg1.jpg`,
      strImg2Path: `${strServerAssetsPath}demo/testimonialSecImg2.jpg`,
      strImg3Path: `${strServerAssetsPath}demo/testimonialSecImg3.jpg`,
    },
    jsnAboutSection: {
      jsnTitle: { eng: "best resturant for best food", arb: "افضل تطبيق لافضل الاطعمة والمشروبات" },
      jsnSubtitle: {
        eng: "order your food anytime! anywhere!",
        arb: "اطلب طعامك المفضل في اي وقت ومن اي مكان",
      },
      lstFeatures: [
        { eng: "higher reach - minimal effort", arb: "اقل جهد ووقت" },
        { eng: "provide healthy food", arb: "نقدم الطعام الصحي" },
        { eng: "exclusive offers & discounts", arb: "افضل العروض والتخفيضات" },
      ],
      strImgPath: `${strServerAssetsPath}demo/about-bg.png`,
      strGooglePlayLink: "",
      strAppStoreLink: "",
    },
    jsnReservation:{
      jsnTitle:{eng:"reservation",arb:"حجز طاولة"},
      jsnDescription:{eng:"Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
      arb:"افضل المطاعم على الاطلاق في المنطقة وفي جميع فروعنا الدولية والمحلية"
    },
    strImg1Path:`${strServerAssetsPath}demo/event1.jpg`,
    strImg2Path:`${strServerAssetsPath}demo/event2.jpg`,
    strImg3Path:`${strServerAssetsPath}demo/event3.jpg`,
    }
  },
  bigWSCategoryID: 3013919779,
};

const categories = [
  {
    bigID: 3891922142,
    jsnName: { eng: "desert", arb: "الحلوى" },
    bigParentID: 0,
    jsnProductInfo: {
      strIconPath: `${strServerAssetsPath}desert.svg`,
      strImgPath: `${strServerAssetsPath}desert.png`,
    },
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
    jsnProductInfo: {
      strIconPath: `${strServerAssetsPath}steak.svg`,
      strImgPath: `${strServerAssetsPath}steak.png`,
    },
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
    jsnProductInfo: {
      strIconPath: `${strServerAssetsPath}coffee.svg`,
      strImgPath: `${strServerAssetsPath}coffee.png`,
    },
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
    jsnProductInfo: {
      strIconPath: `${strServerAssetsPath}pizza.svg`,
      strImgPath: `${strServerAssetsPath}pizza.png`,
    },
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
    jsnProductInfo: {
      strIconPath: `${strServerAssetsPath}burger.svg`,
      strImgPath: `${strServerAssetsPath}burger.png`,
    },
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
      strImgPath: `${strServerAssetsPath}demo/dish1.png`,
      jsnDescription: {
        eng: "Toested french bread topped with romano",
        arb: "خبز فرنسي مغطى بالرومانو",
      },
      strSalePrice: "7:50",
    },
    blnFeatured: true,
    blnMostOrdered: true,
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
      strImgPath: `${strServerAssetsPath}demo/dish2.png`,
      jsnDescription: {
        eng: "Spreadable cream cheese, blue cheese",
        arb: "جبنة كريمية قابلة للدهن ، جبنة زرقاء",
      },
    },
    blnFeatured: true,
    blnMostOrdered: true,
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
      strImgPath: `${strServerAssetsPath}demo/dish3.png`,
      jsnDescription: {
        eng: "Cherry-size fresh mozzarella cheese balls",
        arb: "كرات جبنة موتزاريلا طازجة بحجم الكرز",
      },
    },
    blnFeatured: true,
    blnMostOrdered: true,
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
      strImgPath: `${strServerAssetsPath}demo/dish1.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish2.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish3.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish1.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish2.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish3.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish1.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish2.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish3.png`,
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
      strImgPath: `${strServerAssetsPath}demo/dish1.png`,
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

const featured = categories.filter((category) => category.blnFeatured);
const mostOrdered = categories.filter((category) => category.blnMostOrdered);

function Home({editable,onSaveUpperHeader}) {
  const lang = "eng";
  const dir = "ltr";
  const wsCategory = useMemo(()=>{
    return categories.find((category)=>category.bigID===jsnSystemInfo.bigWSCategoryID)
  },[jsnSystemInfo.bigWSCategoryID])
  return (
    <React.Fragment>
      <Header
        lang={lang}
        dir={dir}
        jsnSystemContact={jsnSystemInfo.jsnSystemContact}
        editable={editable}
        onSaveUpperHeader={onSaveUpperHeader}
      />
      <Hero
        lang={lang}
        dir={dir}
        lstHeroSlides={jsnSystemInfo.jsnSystemSections.lstHeroSlides}
        wsCategory={wsCategory}
      />
      <Owner
        lang={lang}
        dir={dir}
        jsnOwnerSection={jsnSystemInfo.jsnSystemSections.jsnOwnerSection}
      />
      <Reservation lang={lang} jsnReservation={jsnSystemInfo.jsnSystemSections.jsnReservation}  />
      <Menu lang={lang} dir={dir} categories={categories} />
      <MostOrdered lang={lang} dir={dir} lstMostOrdered={mostOrdered} />
      <Featured lang={lang} dir={dir} lstFeatured={featured} />
      <Testimonial
        lang={lang}
        dir={dir}
        lstSystemReviews={jsnSystemInfo.lstSystemReviews}
        jsnTestimonialSection={
          jsnSystemInfo.jsnSystemSections.jsnTestimonialSection
        }
      />
      <Team lang={lang} lstSystemTeam={jsnSystemInfo.lstSystemTeam} />
      <About lang={lang} dir={dir} jsnAboutSection={jsnSystemInfo.jsnSystemSections.jsnAboutSection} />
      <Follow lang={lang} />
      <Footer lang={lang} />
      <BtnProgressToTop lang={lang} />
      <Loader001 status={"loaded"} />
    </React.Fragment>
  );
}

export default Home;
