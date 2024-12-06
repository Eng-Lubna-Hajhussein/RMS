import { useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@basetoolkit/ui";
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
    lg: { height: "54px", width: "54px" },
    xs: { height: "45px", width: "45px" },
    textAlign: "center",
    borderRadius: "50%",
    background: App_Second_Color,
    cursor: "pointer",
  },
  fullHeight: {
    height: "100%",
  },
};

function City({
  onChange,
  city,
  regions,
  country,
  lang,
  onDelete,
  addCityOpen,
  editCityOpen,
}) {
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <Grid item xs={12} container py={5}>
      <Grid item lg={6} xs={12} px={1}>
        <Select
        fullWidth
          value={{
            value: city,
            label: city !== "none" ? regions.regionName[city][lang] : "none",
          }}
          required
          label={dictionary.labels.deliveryAddressCities[lang]}
          onChange={onChange}
          sx={styles.select}
        >
          <MenuItem value="none">{"none"}</MenuItem>
          {Object.keys(regions.appRegionsID[country]).map((cityID) => (
            <MenuItem value={cityID}>
              {regions.regionName[cityID][lang]}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item lg={3} display={isExtraSmallAndDown ? "none" : "flex"} />
      <Grid
        item
        lg={1}
        xs={4}
        px={1}
        py={isExtraSmallAndDown ? "10px" : 0}
        container
      >
        <Box sx={styles.box} onClick={addCityOpen}>
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
      {!!city && city !== "none" && (
        <Grid
          item
          lg={1}
          xs={4}
          px={1}
          py={isExtraSmallAndDown ? "10px" : 0}
          container
          justifyContent={"center"}
        >
          <Box sx={styles.box} onClick={editCityOpen}>
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
      {!!city && city !== "none" && (
        <Grid
          item
          lg={1}
          xs={4}
          px={1}
          py={isExtraSmallAndDown ? "10px" : 0}
          container
          justifyContent={"end"}
        >
          <Box sx={styles.box}>
            <Grid
              container
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
              onClick={onDelete}
            >
              <Delete fontSize="medium" />
            </Grid>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default City;
