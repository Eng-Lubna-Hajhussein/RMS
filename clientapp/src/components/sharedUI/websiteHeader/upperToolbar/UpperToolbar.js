import React, { useState } from "react";
import { Toolbar, Grid, Icon, Box, Typography } from "@mui/material";
import { HowToRegOutlined } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { dictionary } from "appHelper/appDictionary";
import SystemContact from "./SystemContact";
import SystemSocial from "./SystemSocial";
import Edit from "./Edit";
import { Link } from "react-router-dom";

const styles = {
  upperToolbar: {
    backgroundColor: "#ffd40d",
    boxShadow: "none",
    "&": {
      minHeight: "50px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    display: {
      xs: "none",
      lg: "flex",
    },
  },
  regTypography: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  regIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
    border: "2px solid #000",
  },
};

function UpperToolbar({ jsnSystemContact, lang, editable, onSaveUpperHeader }) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <React.Fragment>
      <Toolbar sx={styles.upperToolbar}>
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid container item xs="3" spacing={"3"}>
            <SystemContact
              contact={{ type: "strEmail", value: jsnSystemContact.strEmail }}
              lang={lang}
            />
          </Grid>
          <Grid container item xs="3" spacing={"3"}>
            <SystemContact
              contact={{ type: "strPhone", value: jsnSystemContact.strPhone }}
              lang={lang}
            />
          </Grid>
          <Grid container item xs="3" justifyContent={"center"} spacing={"3"}>
            <Grid item xs="3">
              <SystemSocial
                social={{
                  type: "strFacebook",
                  path: jsnSystemContact.strFacebook,
                }}
                lang={lang}
              />
            </Grid>
            <Grid item xs="3">
              <SystemSocial
                social={{
                  type: "strInstagram",
                  path: jsnSystemContact.strInstagram,
                }}
                lang={lang}
              />
            </Grid>
            <Grid item xs="3">
              <SystemSocial
                social={{
                  type: "strYoutube",
                  path: jsnSystemContact.strYoutube,
                }}
                lang={lang}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={editable ? "2" : "3"}
            spacing={"3"}
            justifyContent={"flex-end"}
          >
            <Grid item container xs='12'>
            <Grid item px={1}>
              <Box sx={styles.regIconBox}>
                <Icon>
                  <HowToRegOutlined sx={{ color: "#000000" }} />
                </Icon>
              </Box>
            </Grid>
            <Grid item alignSelf={"center"}>
              <Link to={'/login'}>
              <Typography
                component={"p"}
                sx={styles.regTypography}
                color={"#000000"}
              >
                login
              </Typography>
              </Link>
            </Grid>
            <Grid item alignSelf={"center"} px={1}>
              <Link to={'/signup'}>
              <Typography
                component={"p"}
                sx={styles.regTypography}
                color={"#000000"}
              >
                / register
              </Typography>
              </Link>
            </Grid>
            </Grid>
          </Grid>
          <Grid container item xs="1" display={editable?'flex':"none"} justifyContent={"flex-end"}>
            <EditIcon sx={{color:"#000",cursor:"pointer"}} onClick={handleEditOpen} />
          </Grid>
        </Grid>
      </Toolbar>
      <Edit
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        jsnSystemContact={jsnSystemContact}
        onSave={onSaveUpperHeader}
      />
    </React.Fragment>
  );
}

export default UpperToolbar;
