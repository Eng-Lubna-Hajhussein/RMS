import { Grid, Typography } from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { formateTime } from "appHelper/appFunctions";
import React, { useEffect, useMemo, useRef, useState } from "react";

const styles = {
  container: {
    height: "60px",
    border: `3px solid ${App_Primary_Color}`,
    borderRadius: "10px",
  },
  hours: {
    fontSize: "20px",
    fontWeight: "800",
  },
  colons: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#fff",
  },
  minutes: {
    fontSize: "20px",
    fontWeight: "600",
  },
  seconds: {
    fontSize: "20px",
    fontWeight: "400",
  },
};

export default function DeliveryTimer({ deliveryTime, order }) {
  const initialCountDown = useMemo(() => {
    const orderDate = new Date(order.dtmOrderDate);
    const now = new Date();
    if(now.getFullYear()!==orderDate.getFullYear()){
      return 0;
    }
    if(now.getMonth()!==orderDate.getMonth()){
      return 0;
    }
    if(now.getDate()!==orderDate.getDate()){
      return 0;
    }
    const diff =
      now.getSeconds() -
      orderDate.getSeconds() +
      (now.getMinutes() - orderDate.getMinutes()) * 60 +
      (now.getHours() - orderDate.getHours()) * 3600;
    console.log({ orderDate });
    console.log({ now });
    console.log({ deliveryTime });
    console.log({ diff });
    if (diff >= deliveryTime) {
      return 0;
    }
    return deliveryTime - diff;
  }, []);
  const [countDown, setCountDown] = useState(initialCountDown);
  const time = formateTime(countDown);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);
  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timer.current);
    }
  }, [countDown]);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        sx={styles.container}
        dir="ltr"
      >
        <Grid item px={1}>
          <Typography sx={styles.hours}>{time.h || "00"}</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography sx={styles.colons}>:</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography sx={styles.minutes}>{time.m || "00"}</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography sx={styles.colons}>:</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography sx={styles.seconds}>{time.s || "00"}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
