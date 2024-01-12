import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";

  export const icons = {
    strEmail:<EmailOutlined fontSize="small"  />,
    strPhone:<PhoneOutlined fontSize="small"  />
  } 

  export const lstWebsiteNav= [
    { bigNavID:1342146478,nav: {eng:"home",arb:"الرئيسية"} },
    {  bigNavID:2344146478,nav: {eng:"menus",arb:"المنيو"} },
    {
      bigNavID:8944146478,nav: {eng:"shop",arb:"تسوق"},
      navList: [
        { bigNavID:8944146400, nav: {eng:"shop cart",arb:"كرت التسوق"} },
        {  bigNavID:6944146478,nav: {eng:"cart checkout",arb:"الحساب"} },
      ],
    },
    {  bigNavID:7943146478,nav: {eng:"news",arb:"الاخبار"}, navList: [{ nav: {eng:"our blog",arb:"مدونتنا"} }, { nav: {eng:"blog details",arb:"تفاصيل المدونة"} }] },
    {
      bigNavID:948246478,nav: {eng:"pages",arb:"الصفحات"},
      navList: [
        {  bigNavID:341246078,nav: {eng:"about",arb:"عنا"} },
        {  bigNavID:968341478,nav: {eng:"our services",arb:"خدماتنا"} },
        {  bigNavID:255546478,nav: {eng:"login",arb:"تسجيل الدخول"} },
      ],
    },
    {  bigNavID:941116478,nav: {eng:"contact",arb:"تواصل معنا"} },
  ];