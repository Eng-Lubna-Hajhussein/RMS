import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Icon, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";

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

function Orders() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;

  const [isLoading, setIsLoading] = useState(false);
  const instalData = async () => {
         setIsLoading(true);
         const objInput = {
            bigUserID:appState.userInfo.bigUserID,
            bigSystemID:appState.systemInfo.bigSystemID
         }
         const orders = await findUserOrders(objInput);
         console.log({orders})
  }

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];
  
  useEffect(()=>{
    instalData();
  },[])

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      <Grid container justifyContent={"center"} sx={{ marginY: "50px" }}>
        <Grid item xs="10" container>
          <Grid item xs="12" px={1}>
            <Table
              sx={{ minWidth: 650, border: "1px solid #c4c4c4" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "1px solid #c4c4c4",
                      background: App_Primary_Color,
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 800,
                    }}
                    align="center"
                  >
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid #c4c4c4",
                      background: App_Primary_Color,
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 800,
                    }}
                    align="center"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid #c4c4c4",
                      background: App_Primary_Color,
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 800,
                    }}
                    align="center"
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Orders;
