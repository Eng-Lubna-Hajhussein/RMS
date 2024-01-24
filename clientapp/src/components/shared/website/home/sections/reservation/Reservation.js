import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import AnimCard0001 from "components/sharedUI/AnimCard0001/AnimCard0001";
import Edit from "./Edit";

const styles = {
  container: {
    marginY: "100px",
  },
  containerItem:{
    paddingX: "60px",
  },
  evenCard: {
    paddingTop: { lg: "200px !important", xs: "0px" },
  },
};

function Reservation({ jsnReservation, lang,dir,onSaveReservation,editable }) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <React.Fragment>
      <Grid container sx={styles.container}>
      {editable&&<Grid my={2} item container justifyContent={'start'} sx={{background:"#dad8d9"}} xs='12'>
        <Button variant="text" onClick={handleEditOpen}>
          <Typography sx={{color:"#000",fontSize:"15px",fontWeight:"600",textTransform:"capitalize"}}>
          edit reservation cards info
          </Typography>
          </Button>
        </Grid>}
        <Grid container item xs='12' spacing={5} sx={styles.containerItem}>
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
      </Grid>
      <Edit
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        jsnReservation={jsnReservation}
        onSave={onSaveReservation}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}

export default Reservation;
