import React, { useState } from "react";
import {
  Toolbar,
  Grid,
  Icon,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { HowToRegOutlined } from "@mui/icons-material";
import SystemContact from "./SystemContact/SystemContact";
import SystemSocial from "./SystemSocial/SystemSocial";
import EditUpperToolbar from "./EditUpperToolbar/EditUpperToolbar";
import { Link, useParams } from "react-router-dom";
import NavList from "components/sharedUI/NavList/NavList";
import { dictionary } from "appHelper/appDictionary";

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
  editBox: {
    background: "#dad8d9",
  },
  editNote: {
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  regIcon: {
    color: "#000000",
  },
  fitContentHeight: {
    height: "fit-content",
  },
};

function UpperToolbar({
  jsnSystemContact,
  userImg,
  userName,
  blnUserLogin,
  userNavList,
  lang,
  editable,
  dir,
  onSaveUpperHeader,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const { systemID, systemName } = useParams();

  return (
    <React.Fragment>
      {editable && (
        <Grid
          item
          container
          justifyContent={"start"}
          sx={styles.editBox}
          xs="12"
        >
          <Button variant="text" onClick={handleEditOpen}>
            <Typography sx={styles.editNote}>
              {dictionary.upperHeaderSection.title[lang]}
            </Typography>
          </Button>
        </Grid>
      )}
      <Toolbar sx={styles.upperToolbar}>
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid container item xs="3" spacing={"3"} justifyContent={"start"}>
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
            xs={"3"}
            spacing={"3"}
            justifyContent={"flex-end"}
          >
            <Grid item container xs="12" justifyContent={"flex-end"}>
              <Grid item px={1}>
                {!blnUserLogin && (
                  <Box sx={styles.regIconBox}>
                    <Icon>
                      <HowToRegOutlined sx={styles.regIcon} />
                    </Icon>
                  </Box>
                )}
              </Grid>
              {!blnUserLogin && (
                <Grid item alignSelf={"center"}>
                  <Link
                    to={
                      systemID ? `/login/${systemName}/${systemID}` : "/login"
                    }
                  >
                    <Typography
                      component={"p"}
                      sx={styles.regTypography}
                      color={"#000000"}
                    >
                      login
                    </Typography>
                  </Link>
                </Grid>
              )}
              {!blnUserLogin && (
                <Grid item alignSelf={"center"} px={1}>
                  <Link
                    to={
                      systemID ? `/signup/${systemName}/${systemID}` : "/signup"
                    }
                  >
                    <Typography
                      component={"p"}
                      sx={styles.regTypography}
                      color={"#000000"}
                    >
                      / register
                    </Typography>
                  </Link>
                </Grid>
              )}
              {blnUserLogin && (
                <Grid item alignSelf={"center"}>
                  <NavList
                    nav={
                      <Grid
                        container
                        sx={styles.fitContentHeight}
                        alignItems={"center"}
                        alignContent={"center"}
                      >
                        <Grid item px={1} sx={styles.fitContentHeight}>
                          <Avatar src={userImg} height="50px" width="50px" />
                        </Grid>
                        <Grid item>{userName[lang]}</Grid>
                      </Grid>
                    }
                    navList={userNavList}
                    lang={lang}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <EditUpperToolbar
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        jsnSystemContact={jsnSystemContact}
        onSave={onSaveUpperHeader}
        dir={dir}
        lang={lang}
      />
    </React.Fragment>
  );
}

export default UpperToolbar;
