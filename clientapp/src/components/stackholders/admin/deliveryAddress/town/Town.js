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
import { dictionary } from "appHelper/appDictionary";
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
    height: { lg: "54px", xs: "45px" },
    width: { lg: "54px", xs: "45px" },
    textAlign: "center",
    borderRadius: "50%",
    background: App_Second_Color,
    cursor: "pointer",
  },
  fullHeight: {
    height: "100%",
  },
};

function Town({
  onChange,
  city,
  regions,
  country,
  town,
  lang,
  onDelete,
  addTownOpen,
  editTownOpen,
}) {
  return (
    <Grid item xs="12" container>
      <Grid item lg="6" xs="12" px={1}>
        <FormControl fullWidth>
          <InputLabel sx={styles.inputLabel}>
          {dictionary.labels.deliveryAddressTowns[lang]}
          </InputLabel>
          <Select
            value={town}
            required
            label={dictionary.labels.deliveryAddressTowns[lang]}
            onChange={onChange}
            sx={styles.select}
          >
            <MenuItem value="none">{"none"}</MenuItem>
            {regions.appRegionsID[country][city].map((townID) => (
              <MenuItem value={townID}>
                {regions?.regionName[townID][lang]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={3} display={{ lg: "flex", xs: "none" }} />
      <Grid
        item
        lg="1"
        xs="4"
        px={1}
        sx={{ paddingY: { lg: "0px", xs: "10px" } }}
        container
      >
        <Box sx={styles.box} onClick={addTownOpen}>
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
      {!!town && town !== "none" && (
        <Grid
          item
          lg="1"
          xs="4"
          px={1}
          sx={{ paddingY: { lg: "0px", xs: "10px" } }}
          container
          justifyContent={"center"}
        >
          <Box sx={styles.box} onClick={editTownOpen}>
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
      {!!town && town !== "none" && (
        <Grid
          item
          lg="1"
          xs="4"
          px={1}
          sx={{ paddingY: { lg: "0px", xs: "10px" } }}
          container
          justifyContent={"end"}
        >
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

export default Town;
