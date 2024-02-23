import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

function City({ address, onChange, deliveryAddress, lang, dir }) {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel}>{dictionary.labels.city[lang]}</InputLabel>
      <Select
        value={address.cityID}
        required
        label={dictionary.labels.city[lang]}
        onChange={onChange}
        sx={styles.select}
      >
        {Object.keys(
          deliveryAddress?.appRegionsID[address?.countryID] || {}
        ).map((cityID) => (
          <MenuItem value={cityID}>
            {deliveryAddress?.regionName[cityID][lang]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default City;
