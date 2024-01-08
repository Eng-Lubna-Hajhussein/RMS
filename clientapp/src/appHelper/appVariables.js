import categoryIconOne from "assets/image/desert.svg";
import categoryIconTwo from "assets/image/steak.svg";
import categoryIconThree from "assets/image/coffee.svg";
import categoryIconFour from "assets/image/pizza.svg";
import categoryIconFive from "assets/image/burger.svg";
import categoryBgImgOne from "assets/image/discover-1.png";
import categoryBgImgTwo from "assets/image/discover-2.png";
import categoryBgImgThree from "assets/image/discover-3.png";
import categoryBgImgFour from "assets/image/discover-8.png";
import categoryBgImgFive from "assets/image/discover-7.png";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";


export const tabsOptions = [
    { key: 3891922142, value: "dessert" },
    { key: 3156578173, value: "steak" },
    { key: 9723164333, value: "coffee" },
    { key: 7087331728, value: "pizza" },
    { key: 8129351047, value: "burger" },
  ];
  
  export const objTabsAssets = {
    3891922142: {
      icon: categoryIconOne,
      img: categoryBgImgOne,
    },
    3156578173: {
      icon: categoryIconTwo,
      img: categoryBgImgTwo,
    },
    9723164333: {
      icon: categoryIconThree,
      img: categoryBgImgThree,
    },
    7087331728: {
      icon: categoryIconFour,
      img: categoryBgImgFour,
    },
    8129351047: {
      icon: categoryIconFive,
      img: categoryBgImgFive,
    },
  };

  export const icons = {
    EmailOutlined:<EmailOutlined fontSize="small"  />,
    PhoneOutlined:<PhoneOutlined fontSize="small"  />
  } 