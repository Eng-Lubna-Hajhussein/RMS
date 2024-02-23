import React from "react";
import { Grid } from "@mui/material";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import Country from "./country/Country";
import City from "./city/City";
import Town from "./town/Town";
import { dictionary } from "appHelper/appDictionary";

function DeliveryAddress({
  address,
  deliveryAddress,
  onChangeCountry,
  onChangeCity,
  onChangeTown,
  lang,
  dir,
}) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} p={2}>
        <Title0001 title={dictionary.customerSettings.deliveryAddress[lang]} dir={dir} />
      </Grid>
      <Grid item xs={12} container>
        {address.countryID && (
          <Grid item lg={4} xs='12' p={2}>
            <Country
              address={address}
              deliveryAddress={deliveryAddress}
              dir={dir}
              lang={lang}
              onChange={onChangeCountry}
            />
          </Grid>
        )}
        {address.cityID && (
          <Grid item lg={4} xs='12' p={2}>
            <City
              address={address}
              deliveryAddress={deliveryAddress}
              dir={dir}
              lang={lang}
              onChange={onChangeCity}
            />
          </Grid>
        )}
        {address.townID && (
          <Grid item lg={4} xs='12' p={2}>
            <Town
              address={address}
              deliveryAddress={deliveryAddress}
              dir={dir}
              lang={lang}
              onChange={onChangeTown}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default DeliveryAddress;