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

function Town({ address, onChange, deliveryAddress, lang, dir }) {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel}>Town</InputLabel>
      <Select
        value={address.townID}
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
