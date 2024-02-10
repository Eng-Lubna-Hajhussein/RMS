import { TimeToLeave } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function OrderTimer({ deliveryTime, order, formateTime }) {
  const initialCountDown = useMemo(() => {
    const orderDate = new Date(order.dtmOrderDate);
    const now = new Date();
    const diff =
      now.getSeconds() -
      orderDate.getSeconds() +
      (now.getMinutes() - orderDate.getMinutes()) * 60 +
      (now.getHours() - orderDate.getHours()) * 3600;
    return deliveryTime * 60 - diff;
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
        alignContent={'center'}
        alignItems={'center'}
        sx={{height:"60px",border:`3px solid ${App_Primary_Color}`,borderRadius:"10px"}}
      >
        <Grid item px={1}>
          <Typography
          sx={{fontSize:"20px",fontWeight:"800"}}>
            {time.h|'00'}</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography
          sx={{fontSize:"20px",fontWeight:"800",color:"#fff"}}>
            :</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography
          sx={{fontSize:"20px",fontWeight:"600"}}>
            {time.m||'00'}</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography
          sx={{fontSize:"20px",fontWeight:"800",color:"#fff"}}>
            :</Typography>
        </Grid>
        <Grid item px={1}>
          <Typography
          sx={{fontSize:"20px",fontWeight:"400"}}>
            {time.s||'00'}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
