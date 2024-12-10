import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "contextapi/context/AppContext";
import menuIcon from "assets/image/menu-icon.svg";
import { Grid, Typography } from "@basetoolkit/ui";
import { findUserTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import Box001 from "components/sharedUI/Box001/Box001";
import { dictionary } from "appHelper/appDictionary";

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
    lg: { fontSize: "14px" },
    xs: { fontSize: "10px" },
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    lg: { fontSize: "25px" },
    xs: { fontSize: "14px" },
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
      return b.dtmOrderDate - a.dtmOrderDate;
    });
    return moment(new Date(ascOrders[0]?.dtmOrderDate)).format("MMM DD,YYYY");
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
      title: dictionary.users.lastOrderDate[lang],
      description: lastOrder,
      img: menuIcon,
    },
    {
      title: dictionary.users.lastReservationDate[lang],
      description: lastReservation,
      img: menuIcon,
    },
    {
      title: dictionary.users.totalOrders[lang],
      description: orders?.length,
      img: menuIcon,
    },
    {
      title: dictionary.users.totalReservations[lang],
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
                lg="6"
                xs="12"
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
