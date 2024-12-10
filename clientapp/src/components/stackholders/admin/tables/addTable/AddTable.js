import React from "react";
import { Grid, TextField, Typography, useTheme } from "@basetoolkit/ui";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: { lg: { my: "50px" }, xs: { my: "20px" } },
  itemContainer: {
    background: "#f4fcfc",
    height: "fit-content",
    lg: { mb: "10px" },
    xs: { mb: "5px" },
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    lg: { fontSize: "28px" },
    xs: { fontSize: "16px" },
    fontWeight: "800",
    color: "primary",
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  form: {
    width: "100%",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  tableContainer: {
    marginBottom: "50px",
  },
  columnTablecell: {
    border: "1px solid #c4c4c4",
    bgcolor: "primary",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  tablePagination: {},
  fitContentHeight: {
    height: "fit-content",
  },
  tableID: {
    fontSize: "18px",
    fontWeight: "800",
  },
  seatsNum: {
    fontSize: "18px",
    fontWeight: "800",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  viewBtnLabel: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
};

function AddTable({
  handleSubmit,
  onSubmit,
  register,
  errors,
  trigger,
  lang,
  dir,
}) {
  const theme = useTheme();
  return (
    <Grid
      item
      container
      xs={12}
      px={1}
      justifyContent={"center"}
      sx={styles.itemContainer}
    >
      <Grid item xs={12} container p={2} justifyContent={"start"}>
        <Typography sx={styles.title}>
          {dictionary.tables.addTable[lang]} !
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent={"start"}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <Grid item xs={12} container>
            <Grid item lg={6} xs={12} p={2}>
              <TextField
                sx={styles.textfield}
                variant="outlined"
                fullWidth
                type="number"
                label={dictionary.labels.seatsNumber[lang]}
                className={`form-control ${errors.seatsNum && "invalid"}`}
                {...register("seatsNum", {
                  required: "Seats Number is Required",
                })}
                onKeyUp={() => {
                  trigger("seatsNum");
                }}
              />
            </Grid>
            <Grid item lg={6} xs={12} p={2}>
              <TextField
                sx={styles.textfield}
                variant="outlined"
                fullWidth
                type="text"
                label={dictionary.labels.pricePerHour[lang]}
                className={`form-control ${errors.pricePerHour && "invalid"}`}
                {...register("pricePerHour", {
                  required: "Price Per Hour is Required",
                })}
                onKeyUp={() => {
                  trigger("pricePerHour");
                }}
              />
            </Grid>
            <Grid item xs={12} container justifyContent={"end"} p={2}>
              <AnimButton0001
                label={dictionary.buttons.addTableBtn[lang]}
                color={theme.palette.primary.main}
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddTable;
