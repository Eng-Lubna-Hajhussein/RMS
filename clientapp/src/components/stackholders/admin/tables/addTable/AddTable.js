import { objAppActions } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Chip,
  Grid,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/optionList/OptionList";
import { MoreVert, Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { dictionary } from "appHelper/appDictionary";
// import { ctrlTables } from "./controller/CtrlTables";
// import EditTable from "./editTable/EditTable";

const styles = {
  container: {
    marginY: { lg: "50px", xs: "20px" },
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "fit-content",
    marginBottom: { lg: "50px", xs: "20px" },
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: { lg: "28px", xs: "16px" },
    fontWeight: "800",
    color: App_Primary_Color,
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
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  tablePagination: {
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
      textAlign: "center",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
    },
  },
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

function AddTable({ handleSubmit, onSubmit, register, errors, trigger,lang,dir }) {
  return (
    <Grid
      item
      xs="12"
      px={1}
      pb={10}
      justifyContent={"center"}
      sx={styles.itemContainer}
    >
      <Grid container>
        <Grid item xs="12" container p={2} justifyContent={"start"}>
          <Typography sx={styles.title}>{dictionary.tables.addTable[lang]} !</Typography>
        </Grid>
        <Grid item xs="12" container justifyContent={"start"}>
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <Grid item xs="12" container>
              <Grid item lg="6" xs="12" p={2}>
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
              <Grid item lg="6" xs="12" p={2}>
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
              <Grid item xs="12" container justifyContent={"end"} p={2}>
                <AnimButton0001
                  label={dictionary.buttons.addTableBtn[lang]}
                  color={App_Primary_Color}
                  type="submit"
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddTable;
