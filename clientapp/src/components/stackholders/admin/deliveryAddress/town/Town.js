import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useMediaQueryMatch,
  useTheme,
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
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <Grid item xs={12} container>
      <Grid item lg={6} xs={12} px={1}>
        <Select
          value={{
            value: town,
            label: town !== "none" ? regions?.regionName[town][lang] : "none",
          }}
          required
          fullWidth
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
          lg={1}
          xs={4}
          px={1}
          py={isExtraSmallAndDown ? "10px" : 0}
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
          lg={1}
          xs={4}
          px={1}
          py={isExtraSmallAndDown?"10px":0}
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
