import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useMemo, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Grid,
  Rating,
  TablePagination,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";
import ReviewsTable from "./reviewsTable/ReviewsTable";

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
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
};

function Box002({ title, subtitle, lang, dir }) {
  return (
    <Grid container>
      <Grid item container xs="5" px={2} justifyContent={"start"}>
        <Grid item xs="12">
          <Typography sx={styles.title}>{title}</Typography>
        </Grid>
        <Grid item xs="12">
          <Typography sx={styles.reviewsNum}>{subtitle}</Typography>
        </Grid>
      </Grid>
      <Grid item container xs="2" justifyContent={"start"} py={2}>
        <AnimationBox
          animationMode="reverse"
          easing={"ease-in"}
          forceTrigger={true}
          type="fadeOut"
          trigger="manual"
        >
          <Box component={"img"} sx={styles.arrowImg} src={arrowImg} />
        </AnimationBox>
      </Grid>
    </Grid>
  );
}

export default Box002;
