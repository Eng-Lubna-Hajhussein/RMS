import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";

export const Demo_System_ID = 10101010;

export const App_Server_Url = "http://localhost:4000";

export const App_Localhost_Client_Url = "http://localhost:3000/";

export const App_Server_URL_GraphQL = "http://localhost:4000/graphql";

export const strServerAssetsPath = "http://localhost:4000/assets/";

export const icons = {
  strEmail: "email",
  strPhone: "phone",
};

export const objCategoriesType = {
  DeliveryAddress: 4026111142,
  Menu: 3916121742,
};

export const lstWebsiteNav = [
  { bigNavID: 1342146478, nav: { eng: "home", arb: "الرئيسية" } },
  { bigNavID: 2344146478, nav: { eng: "menus", arb: "المنيو" } },
  {
    bigNavID: 8944146478,
    nav: { eng: "shop", arb: "تسوق" },
    navList: [
      {
        bigNavID: 8944146400,
        nav: { eng: "shop cart", arb: "كرت التسوق" },
      },
      {
        bigNavID: 7644146400,
        nav: {
          eng: "cart checkout",
          arb: "الدفع",
        },
      },
    ],
  },
  {
    bigNavID: 7943146478,
    nav: { eng: "order", arb: "طلبك" },
    navList: [
      { nav: { eng: "delivery", arb: "توصيل" } },
      { nav: { eng: "reserve table", arb: "احجز طاولة" } },
    ],
  },
  {
    bigNavID: 948246478,
    nav: { eng: "tables", arb: "الحجوزات" },
  },
  { bigNavID: 941116478, nav: { eng: "review", arb: "قيمنا" } },
];

export const Demo_jsnSystemInfo = {
  bigSystemID: 1111111111,
  jsnSystemContact: {
    strEmail: "info@domain.com",
    strPhone: "+1 (850) 344 0 66",
    strFacebook: "https://www.facebook.com/",
    strInstagram: "https://www.instagram.com/",
    strYoutube: "https://www.youtube.com/",
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
      bigID: 3754450561,
      jsnName: { eng: "Thomas Walim", arb: "ثوماس ويليام" },
      jsnSpecialization: { eng: "Dessert specialist", arb: "اختصاصي حلويات" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-1.png`,
    },
    {
      bigID: 5767585311,
      jsnName: { eng: "James Jhonson", arb: "جيمس جوهانسون" },
      jsnSpecialization: { eng: "Chef Master", arb: "ماستر شيف" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-2.png`,
    },
    {
      bigID: 9609737351,
      jsnName: { eng: "Room Minal", arb: "روم مينال" },
      jsnSpecialization: { eng: "coffee specialist", arb: "اختصاصي قهوة" },
      strFacebookLink: "https://www.facebook.com/",
      strInstagramLink: "https://www.instagram.com/",
      strTwitterLink: "https://www.twitter.com/",
      strImgPath: `${strServerAssetsPath}demo/chef-3.png`,
    },
  ],
  jsnSystemSections: {
    lstHeroSlides: [
      {
        strImgPath: `${strServerAssetsPath}demo/slide1.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",
        jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
          style: {},
          strAnimationType: "",
        },
        jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
          style: {},
          strAnimationType: "",
        },
        strBgAnimationType: "",
      },
      {
        strImgPath: `${strServerAssetsPath}demo/slide2.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",
        jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
          style: {},
          strAnimationType: "",
        },
        jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
          style: {},
          strAnimationType: "",
        },
        strBgAnimationType: "",
      },
      {
        strImgPath: `${strServerAssetsPath}demo/slide3.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",
        jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
          style: {},
          strAnimationType: "",
        },
        jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
          style: {},
          strAnimationType: "",
        },
        strBgAnimationType: "",
      },
      {
        strImgPath: `${strServerAssetsPath}demo/slide4.jpg`,
        strVideoPath: "assets/video/about-resturant.mp4",
        jsnSubtitle: {
          eng: "festive dining at Farthings where we are strong believers in using the very best produce",
          arb: "تناول معنا افضل الطعام حيث نؤمن بشدة باستخدام افضل المنتجات",
          style: {},
          strAnimationType: "",
        },
        jsnTitle: {
          eng: "the perfect space to enjoy fantastic food",
          arb: "افضل  مكان للاستمتاع بالطعام الرائع مع اصدقائك او عائلتك",
          style: {},
          strAnimationType: "",
        },
        strBgAnimationType: "",
      },
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
      jsnTitle: {
        eng: "best resturant for best food",
        arb: "افضل تطبيق لافضل الاطعمة والمشروبات",
      },
      jsnSubtitle: {
        eng: "order your food anytime! anywhere!",
        arb: "اطلب طعامك المفضل في اي وقت ومن اي مكان",
      },
      strImgPath: `${strServerAssetsPath}demo/about-bg.png`,
      strGooglePlayLink: "",
      strAppStoreLink: "",
    },
    jsnReservation: {
      jsnTitle: { eng: "reservation", arb: "حجز طاولة" },
      jsnDescription: {
        eng: "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
        arb: "افضل المطاعم على الاطلاق في المنطقة وفي جميع فروعنا الدولية والمحلية",
      },
      strImg1Path: `${strServerAssetsPath}demo/event1.jpg`,
      strImg2Path: `${strServerAssetsPath}demo/event2.jpg`,
      strImg3Path: `${strServerAssetsPath}demo/event3.jpg`,
    },
  },
  bigWSCategoryID: 3013919779,
  jsnLocation: {},
  lstContactUs: [],
  strLogoPath: `${strServerAssetsPath}demo/logo.png`,
  systemMenu: [
    {
      bigID: 3891922142,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "desert", arb: "الحلوى" },
      bigParentID: 0,
      jsnCategoryInfo: {
        strIconPath: `${strServerAssetsPath}desert.svg`,
        strImgPath: `${strServerAssetsPath}desert.png`,
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: null,
      },
    },
    {
      bigID: 3156578173,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "traditional", arb: "طبخات" },
      bigParentID: 0,
      jsnCategoryInfo: {
        strIconPath: `${strServerAssetsPath}traditional.svg`,
        strImgPath: `${strServerAssetsPath}traditional.png`,
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: null,
      },
    },
    {
      bigID: 9723164333,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "drinks", arb: "المشروبات" },
      bigParentID: 0,
      jsnCategoryInfo: {
        strIconPath: `${strServerAssetsPath}drinks.svg`,
        strImgPath: `${strServerAssetsPath}drinks.png`,
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: null,
      },
    },
    {
      bigID: 7087331728,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "pizza", arb: "البيتزا" },
      bigParentID: 0,
      jsnCategoryInfo: {
        strIconPath: `${strServerAssetsPath}pizza.svg`,
        strImgPath: `${strServerAssetsPath}pizza.png`,
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: null,
      },
    },
    {
      bigID: 8129351047,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "burger", arb: "البرغر" },
      bigParentID: 0,
      jsnCategoryInfo: {
        strIconPath: `${strServerAssetsPath}burger.svg`,
        strImgPath: `${strServerAssetsPath}burger.png`,
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: null,
      },
    },
    {
      bigID: 3013919779,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3891922142,
      jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "9.00",
        strImgPath: `${strServerAssetsPath}demo/dish1.png`,
        jsnDescription: {
          eng: "Toested french bread topped with romano",
          arb: "خبز فرنسي مغطى بالرومانو",
        },
        strSalePrice: "7:50",
        blnFeatured: true,
        blnMostOrdered: true,
        blnOnSale: true,
        lstReviews: null, //[{bigUserID:"",strImgPath:"",strReview:"",intRating:""}],
        intRating: 5,
      },
    },
    {
      bigID: 9559275219,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3891922142,
      jsnName: { eng: "Rastrami Roll", arb: "راسترامي رول" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "16.00",
        strImgPath: `${strServerAssetsPath}demo/dish2.png`,
        jsnDescription: {
          eng: "Spreadable cream cheese, blue cheese",
          arb: "جبنة كريمية قابلة للدهن ، جبنة زرقاء",
        },
        blnFeatured: true,
        blnMostOrdered: true,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 8033919014,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3891922142,
      jsnName: { eng: "Caprese Salad Kabobs", arb: "كابريزي سلطة كابوبس" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "34.00",
        strImgPath: `${strServerAssetsPath}demo/dish3.png`,
        jsnDescription: {
          eng: "Cherry-size fresh mozzarella cheese balls",
          arb: "كرات جبنة موتزاريلا طازجة بحجم الكرز",
        },
        blnFeatured: true,
        blnMostOrdered: true,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 8052907570,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3891922142,
      jsnName: {
        eng: "Peachy Jalepeno Guacomole",
        arb: "خوخي جاليبينو جواكومولي",
      },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "40.00",
        strImgPath: `${strServerAssetsPath}demo/dish1.png`,
        jsnDescription: {
          eng: "Ground cumin, avocados, peeled and cubed",
          arb: "كمون مطحون ، أفوكادو ، مقشر ومقطع إلى مكعبات",
        },
        blnFeatured: true,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 1806513103,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3156578173,
      jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "9.00",
        strImgPath: `${strServerAssetsPath}demo/dish2.png`,
        jsnDescription: {
          eng: "Toested french bread topped with romano",
          arb: "خبز فرنسي مغطى بالرومانو",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 2710287289,
      bigParentID: 3156578173,
      jsnName: { eng: "Rastrami Roll", arb: "راسترامي رول" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "16.00",
        strImgPath: `${strServerAssetsPath}demo/dish3.png`,
        jsnDescription: {
          eng: "Spreadable cream cheese, blue cheese",
          arb: "جبنة كريمية قابلة للدهن ، جبنة زرقاء",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 7547915806,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3156578173,
      jsnName: { eng: "Caprese Salad Kabobs", arb: "كابريزي سلطة كابوبس" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "34.00",
        strImgPath: `${strServerAssetsPath}demo/dish1.png`,
        jsnDescription: {
          eng: "Cherry-size fresh mozzarella cheese balls",
          arb: "كرات جبنة موتزاريلا طازجة بحجم الكرز",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 2818883117,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 3156578173,
      jsnName: {
        eng: "Peachy Jalepeno Guacomole",
        arb: "خوخي جاليبينو جواكومولي",
      },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "40.00",
        strImgPath: `${strServerAssetsPath}demo/dish2.png`,
        jsnDescription: {
          eng: "Ground cumin, avocados, peeled and cubed",
          arb: "كمون مطحون ، أفوكادو ، مقشر ومقطع إلى مكعبات",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 5119732624,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "Espresso Macchiato", arb: "اسبريسو ماكياتو" },
      bigParentID: 9723164333,
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "9.00",
        strImgPath: `${strServerAssetsPath}demo/dish3.png`,
        jsnDescription: {
          eng: "milk / coffee / sugar",
          arb: "حليب / قهوة / سكر",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 6976723630,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "Mocha Whipped Cream", arb: "موكا كريمة مخفوقة" },
      bigParentID: 9723164333,
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "16.00",
        strImgPath: `${strServerAssetsPath}demo/dish1.png`,
        jsnDescription: {
          eng: "milk / coffee / sugar",
          arb: "حليب / قهوة / سكر",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 7629450130,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "Cold Coffee", arb: "قهوة باردة" },
      bigParentID: 9723164333,
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "34.00",
        strImgPath: `${strServerAssetsPath}demo/dish2.png`,
        jsnDescription: {
          eng: "milk / coffee / sugar",
          arb: "حليب / قهوة / سكر",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 9177008033,
      bigCategoryTypeID: objCategoriesType.Menu,
      jsnName: { eng: "Caramel Macchiato", arb: "كراميل ماكياتو" },
      bigParentID: 9723164333,
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "40.00",
        strImgPath: `${strServerAssetsPath}demo/dish3.png`,
        jsnDescription: {
          eng: "milk / coffee / sugar",
          arb: "حليب / قهوة / سكر",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
    {
      bigID: 9785069374,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigParentID: 7087331728,
      jsnName: { eng: "Chease Garlic Bread", arb: "خبز الجبنة بالثوم" },
      jsnCategoryInfo: {
        strIconPath: "",
        strPrice: "9.00",
        strImgPath: `${strServerAssetsPath}demo/dish1.png`,
        jsnDescription: {
          eng: "Toested french bread topped with romano",
          arb: "خبز فرنسي مغطى بالرومانو",
        },
        blnFeatured: false,
        blnMostOrdered: false,
        blnOnSale: false,
        lstReviews: null,
        intRating: 5,
      },
    },
  ],
};

export const COUNTRIES = [
  { eng: "jordan", arb: "الاردن" },
  { eng: "egypt", arb: "مصر" },
];

export const CITIES = {
  jordan: [
    { eng: "amman", arb: "عمان" },
    { eng: "irbid", arb: "اربد" },
  ],
  egypt: [{ eng: "cairo", arb: "القاهرة" }],
};

export const objRoleID = {
  Admin: 1511510928,
  Customer: 7411510928,
};

export const objIDRole = {
  1511510928: "Admin",
  7411510928: "Customer",
};

export const Demo_objSystemLocation = { lat: 35.856737, long: 30.606619 };

export const tabsOptions = [
  { key: "dessert", jsnName: { eng: "dessert", arb: "حلويات" } },
  { key: "drinks", jsnName: { eng: "drinks", arb: "مشروبات" } },
  { key: "traditional", jsnName: { eng: "traditional", arb: "طبخات" } },
  { key: "pizza", jsnName: { eng: "pizza", arb: "بيتزا" } },
  { key: "burger", jsnName: { eng: "burger", arb: "برغر" } },
];

export const objTabsAssets = {
  dessert: {
    strIconPath: `${strServerAssetsPath}desert.svg`,
    strImgPath: `${strServerAssetsPath}desert.png`,
  },
  drinks: {
    strIconPath: `${strServerAssetsPath}drinks.svg`,
    strImgPath: `${strServerAssetsPath}drinks.png`,
  },
  traditional: {
    strIconPath: `${strServerAssetsPath}traditional.svg`,
    strImgPath: `${strServerAssetsPath}traditional.png`,
  },
  pizza: {
    strIconPath: `${strServerAssetsPath}pizza.svg`,
    strImgPath: `${strServerAssetsPath}pizza.png`,
  },
  burger: {
    strIconPath: `${strServerAssetsPath}burger.svg`,
    strImgPath: `${strServerAssetsPath}burger.png`,
  },
};

export const objAppActions = {
  Edit: 7244446400,
  Delete: 8324222478,
};

export const initialAppState = {
  clientInfo: {
    blnUserLogin: false,
    strLanguage: "eng", // arb,
    strDir: "ltr", //rtl
  },
  systemInfo: {
    bigSystemID: null,
    jsnSystemContact: {},
    lstSystemReviews: [],
    lstSystemTeam: [],
    jsnSystemSections: [],
    bigWSCategoryID: null,
    jsnSystemLocation: {},
    lstContactUs: [],
    strLogoPath: null,
    systemMenu: [],
    systemRegion: [],
  },
  userInfo: {
    bigUserID: "",
    strUserImage: "",
    jsnFullName: "",
    strEmail: "",
    userOrder: {
      lstProduct: [],
      strTotalPrice: "",
    },
    userCart: {
      lstProduct: [],
      strTotalPrice: "",
    },
    jsnClientPayment: {},
  },
};

export const animationEditorOptions = [
  { key: "none", value: "none" },
  { key: "fadeIn", value: "fadeIn" },
  { key: "fadeOut", value: "fadeOut" },
  { key: "fadeInGrow", value: "fadeInGrow" },
  { key: "fadeOutGrow", value: "fadeOutGrow" },
  { key: "slideIn", value: "slideIn" },
  { key: "slideOut", value: "slideOut" },
  { key: "grow", value: "grow" },
  { key: "slideInRotate", value: "slideInRotate" },
  { key: "slideOutRotate", value: "slideOutRotate" },
  { key: "fadeOutSlideOut", value: "fadeOutSlideOut" },
  { key: "wobble", value: "wobble" },
  { key: "hinge", value: "hinge" },
  { key: "flip", value: "flip" },
  { key: "flipInX", value: "flipInX" },
  { key: "flipOutX", value: "flipOutX" },
  { key: "flipInY", value: "flipInY" },
  { key: "flipOutY", value: "flipOutY" },
  { key: "rollIn", value: "rollIn" },
  { key: "rollOut", value: "rollOut" },
  { key: "rotateOut", value: "rotateOut" },
  { key: "rotateIn", value: "rotateIn" },
  { key: "slideInUp", value: "slideInUp" },
  { key: "slideInDown", value: "slideInDown" },
  { key: "slideInLeft", value: "slideInLeft" },
  { key: "slideInRight", value: "slideInRight" },
  { key: "slideOutUp", value: "slideOutUp" },
];

export const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

export const bgAnimationTypes = [
  "squareTriangleCircleCross",
  "square",
  "cross",
  "circle",
  "triangle",
];
