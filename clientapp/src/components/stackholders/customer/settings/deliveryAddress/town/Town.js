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

function Town({ address, onChange, deliveryAddress, lang, dir }) {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel}>{dictionary.labels.town[lang]}</InputLabel>
      <Select
        value={address.townID}
        label={dictionary.labels.town[lang]}
        required
        onChange={onChange}
        sx={styles.select}
      >
        {deliveryAddress?.appRegionsID[address?.countryID][address?.cityID].map(
          (townID) => (
            <MenuItem value={townID}>
              {deliveryAddress?.regionName[townID][lang]}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}

export default Town;
