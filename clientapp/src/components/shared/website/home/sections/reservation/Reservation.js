import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import AnimCard0001 from "components/sharedUI/AnimCard0001/AnimCard0001";
import EditReservation from "./EditReservation";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    marginY: "100px",
  },
  containerItem: {
    paddingX: "60px",
  },
  midCard: {
    paddingTop: { lg: "200px !important", xs: "0px" },
  },
  editNote: {
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  editBox: {
    background: "#dad8d9",
  },
};

function Reservation({
  jsnReservation,
  lang,
  dir,
  onSaveReservation,
  editable,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <React.Fragment>
      <Grid container sx={styles.container}>
        {editable && (
          <Grid
            my={2}
            item
            container
            justifyContent={"start"}
            sx={styles.editBox}
            xs="12"
          >
            <Button variant="text" onClick={handleEditOpen}>
              <Typography sx={styles.editNote}>
                {dictionary.reservationSection.title[lang]}
              </Typography>
            </Button>
          </Grid>
        )}
        <Grid container item xs="12" sx={styles.containerItem}>
          {Array(3)
            .fill(1)
            .map((_, index) => (
              <Grid item lg="4" sx={index % 2 !== 0 && styles.midCard} px={1}>
                <AnimCard0001
                  title={jsnReservation.jsnTitle[lang]}
                  description={jsnReservation.jsnDescription[lang]}
                  bgImg={jsnReservation.strImg2Path}
                  label={dictionary.buttons.reverseTableBtn[lang]}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <EditReservation
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
