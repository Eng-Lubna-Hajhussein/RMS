import React, { useMemo, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TeamCard from "components/sharedUI/TeamCard/TeamCard";
import Carousel from "components/sharedUI/Carousel/Carousel";
import "./Team.css";
import { App_Second_Color } from "appHelper/appColor";
import AddIcon from "@mui/icons-material/Add";
import AddChef from "./AddChef";
import EditChef from "./EditChef";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    height: "fit-content",
    paddingX: { lg: "60px", xs: "15px" },
    marginY: "100px",
  },
  mainTitle: {
    fontSize: "50px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    lineHeight: "1.2 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    textTransform: "capitalize",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  addBox: {
    height: "54px",
    width: "54px",
    textAlign: "center",
    borderRadius: "50%",
    background: App_Second_Color,
    cursor: "pointer",
  },
  fullHeight:{
    height:"100%"
  }
};

export default function Team({
  lang,
  lstSystemTeam,
  dir,
  addChef,
  editChef,
  deleteChef,
  editable,
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [itemOnAction, setItemOnAction] = useState();

  const slides = useMemo(() => {
    return lstSystemTeam.map((item) => ({
      slideContent: (
        <TeamCard
          lang={lang}
          dir={dir}
          onDelete={deleteChef}
          onEdit={() => {
            setItemOnAction(item);
            setEditOpen(true);
          }}
          editable={editable}
          item={item}
        />
      ),
      sxStyle: { height: { lg: "fit-content", xs: "fit-content" } },
    }));
  }, [lstSystemTeam, lang, dir]);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"start"}
        sx={styles.container}
      >
        <Grid item lg="12" mb={4} container justifyContent={"center"}>
          <Grid item lg="12" container justifyContent={"center"}>
            <Typography sx={styles.mainTitle}>
              {dictionary.teamSection.title[lang]}
            </Typography>
          </Grid>
          <Grid item lg="3" xs={"6"} sx={styles.line} />
        </Grid>
        {editable && (
          <Grid
            item
            lg="12"
            px={3}
            pb={5}
            pt={0}
            container
            justifyContent={"end"}
          >
            <Box sx={styles.addBox} onClick={() => setAddOpen(true)}>
              <Grid
                container
                sx={styles.fullHeight}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <AddIcon fontSize="medium" />
              </Grid>
            </Box>
          </Grid>
        )}
        <Grid container item xs="12">
          <Carousel
            slides={slides}
            activeSlides={3}
            justify={"center"}
            activeColor={"#f3274c"}
            inactiveColor={"#b5b5b5"}
            lang={lang}
            dir={dir}
          />
        </Grid>
      </Grid>
      <AddChef
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        editable={editable}
        onSave={addChef}
        lang={lang}
        dir={dir}
      />
      <EditChef
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        editable={editable}
        onSave={editChef}
        chef={itemOnAction}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}
