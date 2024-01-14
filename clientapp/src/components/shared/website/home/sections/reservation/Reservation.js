import React from "react";
import { Grid } from "@mui/material";
import AnimCard0001 from "components/sharedUI/AnimCard0001/AnimCard0001";

const styles = {
  container: {
    paddingX: "60px",
    marginY: "100px",
  },
  evenCard: {
    paddingTop: { lg: "200px !important", xs: "0px" },
  },
};

function Reservation({ jsnReservation, lang }) {
  return (
    <React.Fragment>
      <Grid container spacing={5} sx={styles.container}>
        <Grid item lg="4">
          <AnimCard0001
            title={jsnReservation.jsnTitle[lang]}
            description={jsnReservation.jsnDescription[lang]}
            bgImg={jsnReservation.strImg1Path}
            label={"reverse a table"}
          />
        </Grid>
        <Grid item lg="4" sx={styles.evenCard}>
          <AnimCard0001
            title={jsnReservation.jsnTitle[lang]}
            description={jsnReservation.jsnDescription[lang]}
            bgImg={jsnReservation.strImg2Path}
            label={"reverse a table"}
          />
        </Grid>
        <Grid item lg="4">
          <AnimCard0001
            title={jsnReservation.jsnTitle[lang]}
            description={jsnReservation.jsnDescription[lang]}
            bgImg={jsnReservation.strImg3Path}
            label={"reverse a table"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Reservation;
