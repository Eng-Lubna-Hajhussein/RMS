import React from "react";
import { Grid, TextField } from "@mui/material";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

function PersonalInfo({ register, trigger, appState, errors, lang, dir }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} p={2}>
        <Title0001 title={"full name"} dir={dir} />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            label="Name English"
            className={`form-control ${errors.nameEng && "invalid"}`}
            {...register("nameEng", {
              required: "Name is Required",
            })}
            onKeyUp={() => {
              trigger("nameEng");
            }}
            defaultValue={appState?.userInfo?.jsnFullName["eng"]}
          />
        </Grid>
        <Grid item xs={6} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            label="Name Arabic"
            className={`form-control ${errors.nameArb && "invalid"}`}
            {...register("nameArb", {
              required: "Name is Required",
            })}
            dir="rtl"
            onKeyUp={() => {
              trigger("nameArb");
            }}
            defaultValue={appState?.userInfo?.jsnFullName["arb"]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
