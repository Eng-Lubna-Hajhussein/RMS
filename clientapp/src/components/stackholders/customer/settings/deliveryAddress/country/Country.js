import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
      <InputLabel sx={styles.inputLabel}>Country</InputLabel>
      <Select
        value={address.countryID}
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
