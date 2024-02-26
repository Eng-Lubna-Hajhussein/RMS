import { generateRandomID, orderRegions } from "appHelper/appFunctions";
import { objRoleID } from "appHelper/appVariables";
import { findDeliveryAddressCategories } from "appHelper/fetchapi/tblCategory/tblCategory";
import {
  findSystem,
  findSystems,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import { signup } from "appHelper/fetchapi/tblUser/tblUser";

export const ctrlSignUp = {
  installSystemsData: async ({
    setSystems,
    setAddress,
    setRegSystem,
    setIsLoading,
  }) => {
    try {
      setIsLoading(true);
      const systemsData = await findSystems();
      const systemsInfo = [];
      for (let i = 0; i < systemsData?.length; i++) {
        const system = systemsData[i];
        const jsnDeliveryAddress = await findDeliveryAddressCategories(
          system.bigSystemID
        );
        const deliveryAddress = orderRegions({
          Regions: jsnDeliveryAddress?.map((region) => ({
            ...region,
            jsnName: JSON.parse(region?.jsnName || {}),
          })),
        });
        systemsInfo.push({
          ...system,
          jsnSystemName: JSON.parse(system?.jsnSystemName),
          deliveryAddress: deliveryAddress,
        });
      }
      setRegSystem(systemsInfo[0]);
      const countryID = Object.keys(
        systemsInfo[0]?.deliveryAddress?.appRegionsID || {}
      )[0];
      const cityID = countryID
        ? Object.keys(
            systemsInfo[0]?.deliveryAddress?.appRegionsID[countryID] || {}
          )[0]
        : null;
      const townID =
        countryID && cityID
          ? systemsInfo[0]?.deliveryAddress?.appRegionsID[countryID][cityID][0]
          : null;
      setAddress({
        countryID: countryID,
        cityID: cityID,
        townID: townID,
      });
      setSystems(systemsInfo);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  },
  installRegSystemData: async ({
    systemID,
    setRegSystem,
    setIsLoading,
    setAddress,
  }) => {
    try {
      setIsLoading(true);
      const system = await findSystem(systemID);
      if (system) {
        const jsnDeliveryAddress = await findDeliveryAddressCategories(
          system.bigSystemID
        );
        const deliveryAddress = orderRegions({
          Regions: jsnDeliveryAddress?.map((region) => ({
            ...region,
            jsnName: JSON.parse(region?.jsnName || {}),
          })),
        });
        const jsnSystemContact = JSON.parse(system.jsnSystemContact || {});
        const strLogoPath = system?.strLogoPath;
        const regSystemData = {
          jsnSystemContact: jsnSystemContact,
          strLogoPath: strLogoPath,
          deliveryAddress: deliveryAddress,
        };
        setRegSystem({ ...regSystemData });
        const countryID = Object.keys(
          regSystemData?.deliveryAddress?.appRegionsID || {}
        )[0];
        const cityID = countryID
          ? Object.keys(
              regSystemData?.deliveryAddress?.appRegionsID[countryID] || {}
            )[0]
          : null;
        const townID =
          countryID && cityID
            ? regSystemData?.deliveryAddress?.appRegionsID[countryID][cityID][0]
            : null;
        setAddress({
          countryID: countryID,
          cityID: cityID,
          townID: townID,
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  },
  handelSubmit: async ({
    appState,
    appDispatch,
    navigate,
    regSystem,
    formData,
    address,
    mapLocation,
    systemID,
  }) => {
    try {
      const bigSystemID = systemID ? systemID : regSystem.bigSystemID;
      const jsnCountry = address.countryID
        ? regSystem.deliveryAddress?.regionName[address.countryID]
        : {};
      const jsnCity = address.cityID
        ? regSystem.deliveryAddress?.regionName[address.cityID]
        : {};
      const jsnTown = address.townID
        ? regSystem.deliveryAddress?.regionName[address.townID]
        : {};
      const jsnUserAddress = {
        jsnCountry: { ...jsnCountry, bigID: address.countryID + "" || 0 },
        jsnCity: { ...jsnCity, bigID: address.cityID + "" || 0 },
        jsnTown: { ...jsnTown, bigID: address.townID + "" || 0 },
      };
      const bigUserID = generateRandomID(10);
      const jsnFullName = {
        eng: formData.nameEng,
        arb: formData.nameArb,
      };
      const jsnUserLocation = await mapLocation.getLocation();
      const objInputUser = {
        bigUserID: bigUserID,
        bigSystemID: bigSystemID,
        bigUserRoleID: objRoleID["Customer"],
        jsnFullName: jsnFullName,
        strEmail: formData.email,
        strPassword: formData.password,
        jsnLocation: jsnUserLocation,
        jsnAddress: jsnUserAddress,
        jsnClientPayment: {},
      };
      const regUser = await signup(objInputUser);
      if (!regUser?.bigUserID) {
        alert("Registration failed");
        return;
      }
      const system = await findSystem(regUser?.bigSystemID);
      if (regUser?.bigUserID && system?.bigSystemID) {
        appState.clientInfo.blnUserLogin = true;
        appState.userInfo = {
          ...appState.userInfo,
          bigUserID: regUser.bigUserID,
          bigUserRoleID: regUser.bigUserRoleID,
          jsnAddress: JSON.parse(regUser.jsnAddress),
          jsnClientPayment: JSON.parse(regUser.jsnClientPayment),
          jsnFullName: JSON.parse(regUser.jsnFullName),
          strEmail: regUser.strEmail,
          jsnLocation: JSON.parse(regUser.jsnLocation),
          blnIsDeleted: regUser.blnIsDeleted,
          blnIsActive: regUser.blnIsActive,
          dtmCreatedDate: regUser.dtmCreatedDate,
          dtmUpdatedDate: regUser.dtmUpdatedDate,
        };
        appState.systemInfo.bigSystemID = system.bigSystemID;
        appState.systemInfo.jsnSystemName = JSON.parse(system.jsnSystemName);
        appState.systemInfo.strSystemPathURL = system.strSystemPathURL;
        appState.systemInfo.jsnSystemAddress = JSON.parse(
          system.jsnSystemAddress
        );
        appState.systemInfo.jsnSystemLocation = JSON.parse(
          system.jsnSystemLocation
        );
        appState.systemInfo.jsnSystemContact = JSON.parse(
          system.jsnSystemContact
        );
        appState.systemInfo.lstSystemTeam = JSON.parse(system.lstSystemTeam);
        appState.systemInfo.jsnSystemSections = JSON.parse(
          system.jsnSystemSections
        );
        appState.systemInfo.lstSystemReviews = JSON.parse(
          system.lstSystemReviews
        );
        appState.systemInfo.strLogoPath = system.strLogoPath;
        appDispatch({ ...appState });
        if (appState.systemInfo.bigSystemID && appState.userInfo.bigUserID) {
          if (appState.userInfo.bigUserRoleID === objRoleID["Admin"]) {
            navigate(`/admin/${system.strSystemPathURL}`);
          }
          if (appState.userInfo.bigUserRoleID === objRoleID["Customer"]) {
            navigate(`/customer/${system.strSystemPathURL}`);
          }
        }
      }
    } catch (err) {
      console.log({ err });
    }
  },
};
