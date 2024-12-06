import React, { useState } from "react";
import { Button, Grid, Typography } from "@basetoolkit/ui";
import AnimCard0001 from "components/sharedUI/AnimCard0001/AnimCard0001";
import EditReservation from "./EditReservation";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    lg:{my:"100px"},
    xs:{my:"20px"}
  },
  containerItem: {
    lg:{px:"60px"},
    xs:{px:"5px"}
  },
  midCard: {
    lg:{pt:"200px !important"},
    xs:{pt:"0px"}
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
  cardContainer:{
    xs:{my:"10px"}
  }
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

  const reservationBgImgs = [jsnReservation.strImg1Path,jsnReservation.strImg2Path,
    jsnReservation.strImg3Path,  
    ]

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
            xs={12}
          >
            <Button variant="text" style={{padding:"0px"}} onClick={handleEditOpen}>
              <Typography sx={styles.editNote}>
                {dictionary.reservationSection.title[lang]}
              </Typography>
            </Button>
          </Grid>
        )}
        <Grid container item xs={12} sx={styles.containerItem}>
          {
            reservationBgImgs.map((img, index) => (
              <Grid item lg={4}  xs={12} sx={index % 2 !== 0 && styles.midCard} p={2}>
                <AnimCard0001
                  title={jsnReservation.jsnTitle[lang]}
                  description={jsnReservation.jsnDescription[lang]}
                  bgImg={img}
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
