import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";

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

function Country({
  onChange,
  country,
  regions,
  lang,
  onDelete,
  addCountryOpen,
  editCountryOpen,
}) {
  return (
    <Grid item xs="12" container>
      <Grid item xs="6" px={1}>
        <FormControl fullWidth>
          <InputLabel sx={styles.inputLabel}>
            Delivery Address Countries
          </InputLabel>
          <Select
            value={country}
            required
            label={"Delivery Address Countries"}
            onChange={onChange}
            sx={styles.select}
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
        <Box sx={styles.box} onClick={addCountryOpen}>
          <Grid
            container
            sx={styles.fullHeight}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Add fontSize="medium" />
          </Grid>
        </Box>
      </Grid>
      {!!country && country !== "none" && (
        <Grid item xs="2" px={1} container justifyContent={"end"}>
          <Box sx={styles.box} onClick={editCountryOpen}>
            <Grid
              container
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Edit fontSize="medium" />
            </Grid>
          </Box>
        </Grid>
      )}
      {!!country && country !== "none" && (
        <Grid item xs="2" px={1} container justifyContent={"end"}>
          <Box sx={styles.box} onClick={onDelete}>
            <Grid
              container
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Delete fontSize="medium" />
            </Grid>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default Country;
