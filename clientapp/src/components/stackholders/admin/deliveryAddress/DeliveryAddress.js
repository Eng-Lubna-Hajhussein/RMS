import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { orderRegions } from "appHelper/appFunctions";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AddCountry from "./addCountry/AddCountry";
import AddCity from "./addCity/AddCity";
import AddTown from "./addTown/AddTown";
import EditCountry from "./editCountry/EditCountry";
import EditCity from "./editCity/EditCity";
import EditTown from "./editTown/EditTown";
import { CtrlDeliveryAddress } from "./controller/CtrlDeliveryAddress";
import Country from "./country.js/Country";
import City from "./city/City";
import Town from "./town/Town";

const styles = {
  container: {
    marginY: "5px",
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "140px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  rowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  box: {
    height: "54px",
    width: "54px",
    textAlign: "center",
    borderRadius: "50%",
    background: App_Second_Color,
    cursor: "pointer",
  },
  fullHeight: {
    height: "100%",
  },
};

function DeliveryAddress() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const [isLoading, setIsLoading] = useState(false);
  const isUpdated = useRef(false);

  const regionsInitial = useMemo(() => {
    return orderRegions({
      Regions: appState?.systemInfo?.systemDeliveryAddress,
    });
  }, [appState?.systemInfo?.systemDeliveryAddress]);

  const [regions, setRegions] = useState(regionsInitial);

  const [selectedCountry, setSelectedCountry] = useState("none");
  const [selectedCity, setSelectedCity] = useState("none");
  const [selectedTown, setSelectedTown] = useState("none");

  const [addCountryOpen, setAddCountryOpen] = useState(false);
  const [editCountryOpen, setEditCountryOpen] = useState(false);
  const [addCityOpen, setAddCityOpen] = useState(false);
  const [editCityOpen, setEditCityOpen] = useState(false);
  const [addTownOpen, setAddTownOpen] = useState(false);
  const [editTownOpen, setEditTownOpen] = useState(false);

  const addCountryHandler = (country) => {
    regions.categories.push(country);
    regions.regionName[country.bigID] = country.jsnName;
    regions.appRegionsID[country.bigID] = {};
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const editCountryHandler = (country) => {
    const countryIndex = regions.categories.findIndex(
      ({ bigID }) => `${country.bigID}` === `${bigID}`
    );
    if (countryIndex !== -1) {
      regions.categories[countryIndex] = country;
      regions.regionName[country.bigID] = country.jsnName;
      setRegions({ ...regions });
      isUpdated.current = true;
    }
  };

  const deleteCountryHandler = () => {
    const hasCities = !!Object.keys(regions.appRegionsID[selectedCountry])
      .length;
    if (hasCities) {
      alert("you can't delete a country without its cities");
      return;
    }
    regions.categories = regions.categories.filter(
      ({ bigID }) => `${selectedCountry}` !== `${bigID}`
    );
    delete regions.regionName[selectedCountry];
    delete regions.appRegionsID[selectedCountry];
    setSelectedCountry("none");
    setSelectedCity("none");
    setSelectedTown("none");
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const addCityHandler = (city) => {
    regions.categories.push(city);
    regions.regionName[city.bigID] = city.jsnName;
    regions.appRegionsID[selectedCountry][city.bigID] = [];
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const editCityHandler = (city) => {
    const cityIndex = regions.categories.findIndex(
      ({ bigID }) => `${city.bigID}` === `${bigID}`
    );
    if (cityIndex !== -1) {
      regions.categories[cityIndex] = city;
      regions.regionName[city.bigID] = city.jsnName;
      setRegions({ ...regions });
      isUpdated.current = true;
    }
  };

  const deleteCityHandler = () => {
    const hasTowns =
      !!regions.appRegionsID[selectedCountry][selectedCity].length;
    if (hasTowns) {
      alert("you can't delete a city without its towns");
      return;
    }
    regions.categories = regions.categories.filter(
      ({ bigID }) => `${selectedCity}` !== `${bigID}`
    );
    delete regions.regionName[selectedCity];
    delete regions.appRegionsID[selectedCountry][selectedCity];
    setSelectedCity("none");
    setSelectedTown("none");
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const addTownHandler = (town) => {
    regions.categories.push(town);
    regions.regionName[town.bigID] = town.jsnName;
    regions.appRegionsID[selectedCountry][selectedCity].push(town.bigID);
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const editTownHandler = (town) => {
    const townIndex = regions.categories.findIndex(
      ({ bigID }) => `${town.bigID}` === `${bigID}`
    );
    if (townIndex !== -1) {
      regions.categories[townIndex] = town;
      regions.regionName[town.bigID] = town.jsnName;
      setRegions({ ...regions });
      isUpdated.current = true;
    }
  };

  const deleteTownHandler = () => {
    regions.categories = regions.categories.filter(
      ({ bigID }) => `${selectedTown}` !== `${bigID}`
    );
    delete regions.regionName[selectedTown];
    regions.appRegionsID[selectedCountry][selectedCity] = regions.appRegionsID[
      selectedCountry
    ][selectedCity].filter((townID) => `${selectedTown}` !== `${townID}`);
    setSelectedTown("none");
    setRegions({ ...regions });
    isUpdated.current = true;
  };

  const onChangeCountry = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("none");
    setSelectedTown("none");
  };

  const onChangeCity = (e) => {
    setSelectedCity(e.target.value);
    setSelectedTown("none");
  };

  const onChangeTown = (e) => {
    setSelectedTown(e.target.value);
  };

  const onSave = () => {
    CtrlDeliveryAddress.onSave({
      appState: appState,
      appDispatch: appDispatch,
      isUpdated: isUpdated,
      setIsLoading: setIsLoading,
      regions: regions,
    });
  };

  const userNavList = [
    { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    {
      bigNavID: 3234146150,
      nav: { eng: "dashboard", arb: "داشبورد" },
    },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/admin/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "orders", arb: "تسوق" },
      path: `/admin/orders/${systemName}/${systemID}`,
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" } },
    { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
  ];
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
        websiteLogo={appState?.systemInfo?.strLogoPath}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid
              item
              xs="12"
              px={1}
              pb={10}
              container
              justifyContent={"center"}
              sx={styles.itemContainer}
            >
              <Grid container>
                <Grid item container xs="7" justifyContent={"start"}>
                  <Grid item xs="12">
                    <Typography sx={styles.title}>
                      Restaurant Delivery Address !
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs="2" justifyContent={"start"} py={3}>
                  <AnimationBox
                    animationMode="reverse"
                    easing={"ease-in"}
                    forceTrigger={true}
                    type="fadeOut"
                    trigger="manual"
                  >
                    <Box component={"img"} sx={styles.rowImg} src={arrowImg} />
                  </AnimationBox>
                </Grid>
              </Grid>
            </Grid>
            <Country
              onChange={onChangeCountry}
              country={selectedCountry}
              regions={regions}
              lang={lang}
              addCountryOpen={() => {
                setAddCountryOpen(true);
              }}
              editCountryOpen={() => {
                setEditCountryOpen(true);
              }}
              onDelete={deleteCountryHandler}
            />
            {!!selectedCountry && selectedCountry !== "none" && (
              <City
                onChange={onChangeCity}
                country={selectedCountry}
                city={selectedCity}
                regions={regions}
                lang={lang}
                addCityOpen={() => {
                  setAddCityOpen(true);
                }}
                editCityOpen={() => {
                  setEditCityOpen(true);
                }}
                onDelete={deleteCityHandler}
              />
            )}
            {!!(selectedCity && selectedCity !== "none") && (
              <Town
                onChange={onChangeTown}
                country={selectedCountry}
                city={selectedCity}
                town={selectedTown}
                regions={regions}
                lang={lang}
                addTownOpen={() => {
                  setAddTownOpen(true);
                }}
                editTownOpen={() => {
                  setEditTownOpen(true);
                }}
                onDelete={deleteTownHandler}
              />
            )}
            <Grid item xs="12" container justifyContent={"end"} py={8}>
              <AnimButton0001
                label={"Save Changes"}
                color={App_Primary_Color}
                onClick={onSave}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <AddCountry
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setAddCountryOpen(false);
        }}
        open={addCountryOpen}
        onSave={addCountryHandler}
      />
      <EditCountry
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setEditCountryOpen(false);
        }}
        open={editCountryOpen}
        onSave={editCountryHandler}
        bigID={selectedCountry}
        jsnName={regions.regionName[selectedCountry]}
      />
      <AddCity
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setAddCityOpen(false);
        }}
        open={addCityOpen}
        onSave={addCityHandler}
        bigParentID={selectedCountry}
      />
      <EditCity
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setEditCityOpen(false);
        }}
        open={editCityOpen}
        onSave={editCityHandler}
        bigParentID={selectedCountry}
        bigID={selectedCity}
        jsnName={regions.regionName[selectedCity]}
      />
      <AddTown
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setAddTownOpen(false);
        }}
        open={addTownOpen}
        onSave={addTownHandler}
        bigParentID={selectedCity}
      />
      <EditTown
        lang={lang}
        dir={appState.clientInfo.strDir}
        handleClose={() => {
          setEditTownOpen(false);
        }}
        open={editTownOpen}
        onSave={editTownHandler}
        bigParentID={selectedCity}
        bigID={selectedTown}
        jsnName={regions?.regionName[selectedTown]}
      />
    </React.Fragment>
  );
}

export default DeliveryAddress;
