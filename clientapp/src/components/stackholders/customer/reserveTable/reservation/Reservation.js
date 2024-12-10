import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQueryMatch,
  useTheme,
} from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import moment from "moment";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    textTransform: "capitalize",
  },
  textField: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

function Reservation({
  reservationHours,
  onChangeReservationHours,
  startDate,
  endDate,
  startTime,
  endTime,
  lang,
  dir,
}) {
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  const allowedReservationHours = [1, 2, 3, 4, 5, 6];
  return (
    <Grid
      item
      xs={12}
      px={1}
      pb={10}
      justifyContent={"center"}
      sx={{
        background: "#f4fcfc",
        height: "fit-content",
        lg: { mb: "50px" },
        xs: { mb: "20px" },
        borderRadius: "20px",
        padding: "20px !important",
      }}
    >
      <Grid container item xs={12} m={0} p={0}>
        <Grid item xs={12} container px={2} justifyContent={"start"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              lg: { fontSize: "28px" },
              xs: { fontSize: "14px" },
              fontWeight: "800",
              color: App_Primary_Color,
              borderBottom: "3px solid #ffd40d",
              width: "fit-content",
            }}
          >
            {dictionary.reservationForm.title[lang]} !
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12} container mt={2} p={2}>
          <Select
            defaultValue={{
              value: reservationHours,
              label: `${
                dictionary.reservationForm.reserveFor[lang]
              } ${reservationHours} ${
                reservationHours === 1
                  ? dictionary.reservationForm.hour[lang]
                  : dictionary.reservationForm.hours[lang]
              }`,
            }}
            required
            label="Reservation Time"
            onChange={onChangeReservationHours}
            fullWidth
            sx={{ background: "#fff", borderRadius: "5px" }}
          >
            {allowedReservationHours.map((hoursNum) => (
              <MenuItem value={hoursNum}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    textTransform: "capitalize",
                  }}
                >
                  {`${
                    dictionary.reservationForm.reserveFor[lang]
                  } ${hoursNum} ${
                    hoursNum === 1
                      ? dictionary.reservationForm.hour[lang]
                      : dictionary.reservationForm.hours[lang]
                  }`}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          lg={6}
          display={isExtraSmallAndDown ? "none" : "flex"}
          container
          p={2}
        />
        <Grid item lg={6} xs={12} container>
          <Grid item lg={6} xs={12} p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="date"
              readOnly
              inputRef={startDate}
              label={dictionary.labels.startDate[lang]}
              value={moment(new Date()).format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item lg={6} xs={12} p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="time"
              inputRef={startTime}
              label={dictionary.labels.startTime[lang]}
              readOnly
              value={moment(new Date()).format("HH:mm")}
            />
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12} container>
          <Grid item lg={6} xs={12} p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="date"
              readOnly
              inputRef={endDate}
              autoFocus
              label={dictionary.labels.endDate[lang]}
              value={moment(
                new Date(
                  new Date().setHours(new Date().getHours() + reservationHours)
                )
              ).format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item lg={6} xs={12} p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="time"
              readOnly
              autoFocus
              inputRef={endTime}
              label={dictionary.labels.endTime[lang]}
              value={moment(
                new Date(
                  new Date().setHours(new Date().getHours() + reservationHours)
                )
              ).format("HH:mm")}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Reservation;
