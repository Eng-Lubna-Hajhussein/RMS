import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  inputLabel:{
    textTransform:"capitalize"
  },
  select:{
    textTransform:"capitalize"
  },
  textField:{
    background: "#fff", borderRadius: "5px",textTransform:"capitalize"
  }
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
  const allowedReservationHours = [1, 2, 3, 4, 5, 6];
  return (
    <Grid
      item
      xs="12"
      px={1}
      pb={10}
      justifyContent={"center"}
      sx={{
        background: "#f4fcfc",
        height: "fit-content",
        marginBottom: { lg: "50px", xs: "20px" },
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Grid container>
        <Grid item xs="12" container px={2} justifyContent={"start"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: { lg: "28px", xs: "14px" },
              fontWeight: "800",
              color: App_Primary_Color,
              borderBottom: "3px solid #ffd40d",
              width: "fit-content",
            }}
          >
            {dictionary.reservationForm.title[lang]} !
          </Typography>
        </Grid>
        <Grid item lg="6" xs="12" container mt={2} p={2}>
          <FormControl fullWidth>
            <InputLabel sx={styles.inputLabel}>{
              dictionary.labels.reservationTime[lang]
            }</InputLabel>
            <Select
              defaultValue={reservationHours}
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
                    {`${dictionary.reservationForm.reserveFor[lang]} ${hoursNum} ${
                      hoursNum === 1 ? dictionary.reservationForm.hour[lang] : dictionary.reservationForm.hours[lang]
                    }`}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg="6" display={{lg:"flex",xs:"none"}} container p={2}/>
        <Grid item lg="6" xs="12" container>
          <Grid item lg="6" xs="12" p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="date"
              disabled
              inputRef={startDate}
              label={dictionary.labels.startDate[lang]}
              value={moment(new Date()).format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item lg="6" xs="12" p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="time"
              inputRef={startTime}
              label={dictionary.labels.startTime[lang]}
              disabled
              value={moment(new Date()).format("HH:mm")}
            />
          </Grid>
        </Grid>
        <Grid item lg="6" xs="12" container>
          <Grid item lg="6" xs="12" p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="date"
              disabled
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
          <Grid item lg="6" xs="12" p={2}>
            <TextField
              sx={styles.textField}
              variant="outlined"
              fullWidth
              type="time"
              disabled
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
