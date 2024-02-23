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
import { dictionary } from "appHelper/appDictionary";

const styles = {
  textField: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

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
  dir,
}) {
  return (
    <Grid item xs="12">
      <Grid
        item
        xs="12"
        px={1}
        container
        pb={10}
        justifyContent={"center"}
        sx={{
          background: "#f4fcfc",
          height: "fit-content",
          borderRadius: "20px",
          marginBottom: { lg: "50px", xs: "20px" },
          paddingX: { lg: "20px", xs: "10px" },
          paddingY: "20px",
        }}
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
      >
        <Grid item xs="12" container px={2} justifyContent={"start"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: { lg: "28px", xs: "18px" },
              fontWeight: "800",
              color: App_Primary_Color,
              borderBottom: "3px solid #ffd40d",
              width: "fit-content",
            }}
          >
            {dictionary.customerReview.title[lang]} !
          </Typography>
        </Grid>
        <Grid item xs="12" container justifyContent={"start"}>
          <Grid item xs="12" container pt={3}>
            <Grid item lg="6" xs="12" pb={2} px={2}>
              <Rating value={intRating} onChange={handleRatingChange} />
            </Grid>
            <Grid item xs="12" container>
              <Grid item lg={6} xs={12} px={2} sx={{ paddingY: "10px" }}>
                <TextField
                  sx={styles.textField}
                  variant="outlined"
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  dir="ltr"
                  inputRef={reviewTextEng}
                  defaultValue={userReview?.jsnComment["eng"]}
                  label={dictionary.labels.reviewEng[lang]}
                />
              </Grid>
              <Grid item lg={6} xs={12} px={2} sx={{ paddingY: "10px" }}>
                <TextField
                  sx={styles.textField}
                  variant="outlined"
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  defaultValue={userReview?.jsnComment["arb"]}
                  dir="rtl"
                  inputRef={reviewTextArb}
                  label={dictionary.labels.reviewArb[lang]}
                />
              </Grid>
            </Grid>
            <Grid item xs="12" container justifyContent={"end"} px={2} pt={2}>
              {!userReview && (
                <Grid item lg="2" xs="6">
                  <AnimButton0001
                    onClick={handleAdd}
                    label={dictionary.buttons.add[lang]}
                    fullWidth={true}
                    color={App_Primary_Color}
                  />
                </Grid>
              )}
              {userReview && (
                <Grid item lg="2" xs="6">
                  <AnimButton0001
                    onClick={handleDelete}
                    label={dictionary.buttons.delete[lang]}
                    fullWidth={true}
                    color={App_Second_Color}
                  />
                </Grid>
              )}
              {userReview && (
                <Grid item lg="2" xs="6">
                  <AnimButton0001
                    onClick={handleEdit}
                    label={dictionary.buttons.edit[lang]}
                    fullWidth={true}
                    color={App_Primary_Color}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomerReview;
