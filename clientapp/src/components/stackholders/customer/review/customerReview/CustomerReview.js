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
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TableFooter,
  TablePagination,
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
import { Link, useParams } from "react-router-dom";

function CustomerReview({
  handleRatingChange,
  intRating,
  reviewTextEng,
  userReview,
  reviewTextArb,
  handleAdd,
  handleEdit,
  handleDelete,
  lang,
  dir
}) {
  return (
    <Grid item xs="12">
      <Grid
        item
        xs="12"
        px={1}
        pb={10}
        justifyContent={"center"}
        sx={{
          background: "#f4fcfc",
          height: "380px",
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
              Your Review !
            </Typography>
          </Grid>
          <Grid item xs="12" container justifyContent={"start"}>
            <Grid item xs="12" container py={3}>
              <Grid item xs="6" pb={2} px={2}>
                <Rating value={intRating} onChange={handleRatingChange} />
              </Grid>
              <Grid item xs="12" container>
                <Grid item xs="6" px={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    inputRef={reviewTextEng}
                    defaultValue={userReview?.jsnComment["eng"]}
                    label="Review English"
                  />
                </Grid>
                <Grid item xs="6" px={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    defaultValue={userReview?.jsnComment["arb"]}
                    dir="rtl"
                    inputRef={reviewTextArb}
                    label="Review Arabic"
                  />
                </Grid>
              </Grid>
              <Grid item xs="12" container justifyContent={"end"} p={2}>
                {!userReview && (
                  <AnimButton0001
                    onClick={handleAdd}
                    label={"Add Review"}
                    color={App_Primary_Color}
                  />
                )}
                {userReview && (
                  <AnimButton0001
                    onClick={handleDelete}
                    label={"Delete Review"}
                    color={App_Second_Color}
                  />
                )}
                {userReview && (
                  <AnimButton0001
                    onClick={handleEdit}
                    label={"Edit Review"}
                    color={App_Primary_Color}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomerReview;
