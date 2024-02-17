import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "contextapi/context/AppContext";
import menuIcon from "assets/image/menu-icon.svg";
import { Box, Grid, Typography } from "@mui/material";
import { findUserTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import Box001 from "components/sharedUI/Box001/Box001";

const style = {
  box: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "100px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: "14px !important",
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: "25px !important",
    fontWeight: "800 !important",
  },
  icon: {
    padding: "18px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
  fitContentHeight: {
    height: "fit-content",
  },
};

function Activities({ user, lang }) {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const instalData = async () => {
    setIsLoading(true);
    const objInputOrder = {
      bigUserID: user?.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInputOrder);
    if (jsnOrdersData?.length) {
      const ordersData = jsnOrdersData.map((order) => ({
        ...order,
        lstProduct: JSON.parse(order?.lstProduct || []),
        jsnAddress: JSON.parse(order?.jsnAddress || {}),
        jsnLocation: JSON.parse(order?.jsnLocation || {}),
        jsnClientPayment: JSON.parse(order?.jsnClientPayment || {}),
      }));
      setOrders([...ordersData]);
    }
    const objInputTables = {
      bigUserID: user?.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInputTables);
    console.log({ jsnUserTables });
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table) => ({
        ...table,
        jsnClientPayment: JSON.parse(table?.jsnClientPayment || {}),
      }));
      setTables([...userTables]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const lastOrder = useMemo(() => {
    if (!orders?.length) {
      return "-";
    }
    const ascOrders = orders.sort((a, b) => {
      return Number(b.dtmOrderDate) - Number(a.dtmOrderDate);
    });
    return moment(new Date(Number(ascOrders[0]?.dtmOrderDate))).format(
      "MMM DD,YYYY"
    );
  }, [orders]);

  const lastReservation = useMemo(() => {
    if (!tables?.length) {
      return "-";
    }
    const ascTables = tables.sort((a, b) => {
      return new Date(b.dtmReservationStart) - new Date(a.dtmReservationStart);
    });
    return moment(new Date(ascTables[0]?.dtmReservationStart)).format(
      "MMM DD,YYYY"
    );
  }, [tables]);

  const activities = [
    {
      title: "Last Order",
      description: lastOrder,
      img: menuIcon,
    },
    {
      title: "Last Reservation",
      description: lastReservation,
      img: menuIcon,
    },
    {
      title: "Total Orders",
      description: orders?.length,
      img: menuIcon,
    },
    {
      title: "Total Reservations",
      description: tables?.length,
      img: menuIcon,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
          <Grid item xs="12" py={2} container justifyContent={"center"}>
            {activities.map(({ title, description, img }, index) => (
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={style.fitContentHeight}
                px={2}
                pb={3}
              >
                <Box001 title={title} description={description} img={img} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Activities;
