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

function Country({ address, onChange, deliveryAddress, lang, dir }) {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel}>{dictionary.labels.country[lang]}</InputLabel>
      <Select
        value={address.countryID}
        label={dictionary.labels.country[lang]}
        required
        onChange={onChange}
        sx={styles.select}
      >
        {Object.keys(deliveryAddress?.appRegionsID || {}).map((countryID) => (
          <MenuItem value={countryID}>
            {deliveryAddress?.regionName[countryID][lang]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Country;
