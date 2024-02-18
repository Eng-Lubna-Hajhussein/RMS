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

const styles = {
  dishName: {
    fontSize: { lg: "16px !important", xs: "9px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  dishDescription: {
    fontSize: { lg: "18px !important", xs: "9px" },
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: { lg: "30px !important", xs: "20px" },
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
        height: "250px",
        marginY: "50px",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Grid container>
        <Grid item xs="12" container px={2} justifyContent={"start"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "28px",
              fontWeight: "800",
              color: App_Primary_Color,
              borderBottom: "3px solid #ffd40d",
              width: "fit-content",
            }}
          >
            RESERVE A TABLE !
          </Typography>
        </Grid>
        <Grid item xs="6" container p={2}>
          <FormControl fullWidth>
            <InputLabel>Reservation Time</InputLabel>
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
                    {`reserve for ${hoursNum} ${
                      hoursNum === 1 ? "hour" : "hours"
                    }`}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="6" container p={2}></Grid>
        <Grid item xs="6" container>
          <Grid item xs="6" p={2}>
            <TextField
              sx={{ background: "#fff", borderRadius: "5px" }}
              variant="outlined"
              fullWidth
              type="date"
              disabled
              inputRef={startDate}
              label="Start Date"
              value={moment(new Date()).format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item xs="6" p={2}>
            <TextField
              sx={{ background: "#fff", borderRadius: "5px" }}
              variant="outlined"
              fullWidth
              type="time"
              inputRef={startTime}
              label="Start Time"
              disabled
              value={moment(new Date()).format("HH:mm")}
            />
          </Grid>
        </Grid>
        <Grid item xs="6" container>
          <Grid item xs="6" p={2}>
            <TextField
              sx={{ background: "#fff", borderRadius: "5px" }}
              variant="outlined"
              fullWidth
              type="date"
              disabled
              inputRef={endDate}
              autoFocus
              label="End Date"
              value={moment(
                new Date(
                  new Date().setHours(new Date().getHours() + reservationHours)
                )
              ).format("YYYY-MM-DD")}
            />
          </Grid>
          <Grid item xs="6" p={2}>
            <TextField
              sx={{ background: "#fff", borderRadius: "5px" }}
              variant="outlined"
              fullWidth
              type="time"
              disabled
              autoFocus
              inputRef={endTime}
              label="End Time"
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
