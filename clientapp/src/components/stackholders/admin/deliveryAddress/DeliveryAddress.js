import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { orderRegions } from "appHelper/appFunctions";
import { Add, Delete, Edit } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AddCountry from "./addCountry/AddCountry";
import AddCity from "./addCity/AddCity";
import AddTown from "./addTown/AddTown";
import EditCountry from "./editCountry/EditCountry";
import EditCity from "./editCity/EditCity";
import EditTown from "./editTown/EditTown";
import { objCategoriesType } from "appHelper/appVariables";
import { bulkCategories } from "appHelper/fetchapi/tblCategory/tblCategory";

const styles = {
  addDish: {
    padding: "20px !important",
    borderRadius: "50%",
    backgroundColor: "#ffd40d !important",
    cursor: "pointer",
  },
};

function DeliveryAddress() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const [isLoading, setIsLoading] = useState(false);
  const isUpdated= useRef(false);

  useEffect(() => {
    console.log(appState?.systemInfo?.systemDeliveryAddress);
    console.log(
      orderRegions({ Regions: appState?.systemInfo?.systemDeliveryAddress })
    );
  }, []);

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
    isUpdated.current=true;
  };

  const editCountryHandler = (country) => {
    const countryIndex = regions.categories.findIndex(
      ({ bigID }) => `${country.bigID}` === `${bigID}`
    );
    if (countryIndex !== -1) {
      regions.categories[countryIndex] = country;
      regions.regionName[country.bigID] = country.jsnName;
      setRegions({ ...regions });
      isUpdated.current=true;
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
    isUpdated.current=true;
  };

  const addCityHandler = (city) => {
    regions.categories.push(city);
    regions.regionName[city.bigID] = city.jsnName;
    regions.appRegionsID[selectedCountry][city.bigID] = [];
    setRegions({ ...regions });
    isUpdated.current=true;
  };

  const editCityHandler = (city) => {
    const cityIndex = regions.categories.findIndex(
      ({ bigID }) => `${city.bigID}` === `${bigID}`
    );
    if (cityIndex !== -1) {
      regions.categories[cityIndex] = city;
      regions.regionName[city.bigID] = city.jsnName;
      setRegions({ ...regions });
      isUpdated.current=true;
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
    isUpdated.current=true;
  };

  const addTownHandler = (town) => {
    regions.categories.push(town);
    regions.regionName[town.bigID] = town.jsnName;
    regions.appRegionsID[selectedCountry][selectedCity].push(town.bigID);
    setRegions({ ...regions });
    isUpdated.current=true;
  };

  const editTownHandler = (town) => {
    const townIndex = regions.categories.findIndex(
      ({ bigID }) => `${town.bigID}` === `${bigID}`
    );
    if (townIndex !== -1) {
      regions.categories[townIndex] = town;
      regions.regionName[town.bigID] = town.jsnName;
      setRegions({ ...regions });
      isUpdated.current=true;
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
    isUpdated.current=true;
  };

  const onSave = async()=>{
    if (!isUpdated.current) {
        alert("no updates")
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
            if (category.bigCategoryTypeID === objCategoriesType.DeliveryAddress) {
              systemDeliveryAddress.push({
                ...category,
                jsnName: JSON.parse(category?.jsnName || {}),
              });
            }
          });
          appState.systemInfo.systemDeliveryAddress = systemDeliveryAddress;
          appDispatch({ ...appState });
          isUpdated.current=false;
        }
      }
  }

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
    <>
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
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={{ marginY: "5px" }}>
          <Grid item xs="10" container>
            <Grid
              item
              xs="12"
              px={1}
              pb={10}
              justifyContent={"center"}
              sx={{
                background: "#f4fcfc",
                height: "140px",
                marginY: "50px",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <Grid container>
                <Grid item container xs="7" px={1} justifyContent={"start"}>
                  <Grid item xs="12">
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontSize: "28px",
                        fontWeight: "800",
                        color: App_Primary_Color,
                        borderBottom: "3px solid #ffd40d",
                        width: "fit-content",
                      }}
                    >
                      Restaurant Delivery Address !
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs="2" justifyContent={"start"} py={2}>
                  <AnimationBox
                    animationMode="reverse"
                    easing={"ease-in"}
                    forceTrigger={true}
                    type="fadeOut"
                    trigger="manual"
                  >
                    <Box
                      component={"img"}
                      sx={{
                        transform: "rotate(180deg)",
                        height: "80px",
                        width: "100%",
                      }}
                      src={arrowImg}
                    />
                  </AnimationBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="12" container>
              {/* countries */}
              <Grid item xs="6" px={1}>
                <FormControl fullWidth>
                  <InputLabel>Delivery Address Countries</InputLabel>
                  <Select
                    value={selectedCountry}
                    required
                    label={"Delivery Address Countries"}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                    }}
                    sx={{ background: "#fff", borderRadius: "5px" }}
                  >
                    <MenuItem value="none">{"none"}</MenuItem>
                    {Object.keys(regions.appRegionsID).map((countryID) => (
                      <MenuItem value={countryID}>
                        {regions.regionName[countryID][lang]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="2" px={1} container justifyContent={"end"}>
                <Box
                  sx={{
                    height: "54px",
                    width: "54px",
                    textAlign: "center",
                    borderRadius: "50%",
                    background: App_Second_Color,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setAddCountryOpen(true);
                  }}
                >
                  <Grid
                    container
                    sx={{ height: "100%" }}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <Add fontSize="medium" />
                  </Grid>
                </Box>
              </Grid>
              {!!selectedCountry && selectedCountry !== "none" && (
                <Grid item xs="2" px={1} container justifyContent={"end"}>
                  <Box
                    sx={{
                      height: "54px",
                      width: "54px",
                      textAlign: "center",
                      borderRadius: "50%",
                      background: App_Second_Color,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setEditCountryOpen(true);
                    }}
                  >
                    <Grid
                      container
                      sx={{ height: "100%" }}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Edit fontSize="medium" />
                    </Grid>
                  </Box>
                </Grid>
              )}
              {!!selectedCountry && selectedCountry !== "none" && (
                <Grid item xs="2" px={1} container justifyContent={"end"}>
                  <Box
                    sx={{
                      height: "54px",
                      width: "54px",
                      textAlign: "center",
                      borderRadius: "50%",
                      background: App_Second_Color,
                      cursor: "pointer",
                    }}
                    onClick={deleteCountryHandler}
                  >
                    <Grid
                      container
                      sx={{ height: "100%" }}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Delete fontSize="medium" />
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
            {!!selectedCountry && selectedCountry !== "none" && (
              <Grid item xs="12" container py={5}>
                {/* cities */}
                <Grid item xs="6" px={1}>
                  <FormControl fullWidth>
                    <InputLabel>Delivery Address Cities</InputLabel>
                    <Select
                      value={selectedCity}
                      required
                      label={"Delivery Address Cities"}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                      }}
                      sx={{ background: "#fff", borderRadius: "5px" }}
                    >
                      <MenuItem value="none">{"none"}</MenuItem>
                      {Object.keys(regions.appRegionsID[selectedCountry]).map(
                        (cityID) => (
                          <MenuItem value={cityID}>
                            {regions.regionName[cityID][lang]}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs="2" px={1} container justifyContent={"end"}>
                  <Box
                    sx={{
                      height: "54px",
                      width: "54px",
                      textAlign: "center",
                      borderRadius: "50%",
                      background: App_Second_Color,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setAddCityOpen(true);
                    }}
                  >
                    <Grid
                      container
                      sx={{ height: "100%" }}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Add fontSize="medium" />
                    </Grid>
                  </Box>
                </Grid>
                {!!selectedCity && selectedCity !== "none" && (
                  <Grid item xs="2" px={1} container justifyContent={"end"}>
                    <Box
                      sx={{
                        height: "54px",
                        width: "54px",
                        textAlign: "center",
                        borderRadius: "50%",
                        background: App_Second_Color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditCityOpen(true);
                      }}
                    >
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        justifyContent={"center"}
                        alignContent={"center"}
                      >
                        <Edit fontSize="medium" />
                      </Grid>
                    </Box>
                  </Grid>
                )}
                {!!selectedCity && selectedCity !== "none" && (
                  <Grid item xs="2" px={1} container justifyContent={"end"}>
                    <Box
                      sx={{
                        height: "54px",
                        width: "54px",
                        textAlign: "center",
                        borderRadius: "50%",
                        background: App_Second_Color,
                        cursor: "pointer",
                      }}
                    >
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        justifyContent={"center"}
                        alignContent={"center"}
                        onClick={deleteCityHandler}
                      >
                        <Delete fontSize="medium" />
                      </Grid>
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
            {!!(selectedCity && selectedCity !== "none") && (
              <Grid item xs="12" container>
                {/* towns */}
                <Grid item xs="6" px={1}>
                  <FormControl fullWidth>
                    <InputLabel>Delivery Address Towns</InputLabel>
                    <Select
                      value={selectedTown}
                      required
                      label={"Delivery Address Cities"}
                      onChange={(e) => {
                        setSelectedTown(e.target.value);
                      }}
                      sx={{ background: "#fff", borderRadius: "5px" }}
                    >
                      <MenuItem value="none">{"none"}</MenuItem>
                      {regions.appRegionsID[selectedCountry][selectedCity].map(
                        (townID) => (
                          <MenuItem value={townID}>
                            {regions?.regionName[townID][lang]}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs="2" px={1} container justifyContent={"end"}>
                  <Box
                    sx={{
                      height: "54px",
                      width: "54px",
                      textAlign: "center",
                      borderRadius: "50%",
                      background: App_Second_Color,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setAddTownOpen(true);
                    }}
                  >
                    <Grid
                      container
                      sx={{ height: "100%" }}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Add fontSize="medium" />
                    </Grid>
                  </Box>
                </Grid>
                {!!selectedTown && selectedTown !== "none" && (
                  <Grid item xs="2" px={1} container justifyContent={"end"}>
                    <Box
                      sx={{
                        height: "54px",
                        width: "54px",
                        textAlign: "center",
                        borderRadius: "50%",
                        background: App_Second_Color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditTownOpen(true);
                      }}
                    >
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        justifyContent={"center"}
                        alignContent={"center"}
                      >
                        <Edit fontSize="medium" />
                      </Grid>
                    </Box>
                  </Grid>
                )}
                {!!selectedTown && selectedTown !== "none" && (
                  <Grid item xs="2" px={1} container justifyContent={"end"}>
                    <Box
                      sx={{
                        height: "54px",
                        width: "54px",
                        textAlign: "center",
                        borderRadius: "50%",
                        background: App_Second_Color,
                        cursor: "pointer",
                      }}
                      onClick={deleteTownHandler}
                    >
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        justifyContent={"center"}
                        alignContent={"center"}
                      >
                        <Delete fontSize="medium" />
                      </Grid>
                    </Box>
                  </Grid>
                )}
              </Grid>
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
    </>
  );
}

export default DeliveryAddress;
