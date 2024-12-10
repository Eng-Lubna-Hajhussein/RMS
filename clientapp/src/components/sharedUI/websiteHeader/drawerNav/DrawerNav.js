import React, { useState } from "react";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Drawer,
  Typography,
  Box,
  Grid,
  Divider,
  SvgIcon,
  IconButton,
} from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";
import { Link } from "react-router-dom";
import SystemContact from "../upperToolbar/SystemContact/SystemContact";
import SystemSocial from "../upperToolbar/SystemSocial/SystemSocial";

const styles = {
  listSubheader: {
    borderBottom: "1px solid #e4e4e4",
    width: "100%",
    height: "fit-content",
  },
  logo: {
    width: "150px",
    height: "50px",
  },
  list: {
    width: "100vw",
    paddingY: "20px",
  },
  listItemText: {
    textTransform: "capitalize",
    fontSize: "18px",
    color: "#000",
  },
  collapseItemText: {
    textTransform: "capitalize",
    fontSize: "15px",
    color: "#555",
  },
  paddingY40: {
    paddingY: "20px",
  },
};

function DrawerNav({
  openDrawer,
  navList,
  setOpenDrawer,
  lang,
  jsnSystemContact,
  dir,
  websiteLogo,
}) {
  const [nestedListOpen, setNestedListOpen] = useState(false);

  return (
    <Drawer
      anchor={dir === "ltr" ? "left" : "right"}
      open={openDrawer}
      sx={{ zIndex: "10000" }}
      width={"100%"}
      onClose={() => setOpenDrawer(false)}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" sx={styles.listSubheader}>
            <Grid container item xs={12}>
              <Grid item xs={8}>
                <Box component={"img"} sx={styles.logo} src={websiteLogo} />
              </Grid>
              <Grid item xs={4} container justifyContent={"end"}>
                <IconButton onClick={() => setOpenDrawer(false)}>
                  <SvgIcon icon="close" size="large" color="black" />
                </IconButton>
              </Grid>
            </Grid>
          </ListSubheader>
        }
        sx={{
          ...styles.list,
        }}
      >
        {navList.map(({ bigNavID, path, nav, navList }, index) => (
          <Grid container dir={dir} p={0} m={0} key={index}>
            {!navList?.length && (
              <Link to={path}>
                <ListItem button>
                  <ListItemText
                    primary={
                      <Typography sx={styles.listItemText}>
                        {nav[lang]}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            )}
            {navList?.length && (
              <div p={0} m={0} key={index}>
                <ListItem
                  button
                  onClick={() => {
                    setNestedListOpen((prev) =>
                      prev === bigNavID ? null : bigNavID
                    );
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={styles.listItemText}>
                        {nav[lang]}
                      </Typography>
                    }
                  />
                  {nestedListOpen === bigNavID ? (
                    <SvgIcon icon="expand_less" color="black" />
                  ) : (
                    <SvgIcon icon="expand_more" color="black" />
                  )}
                </ListItem>
                <Collapse
                  in={nestedListOpen === bigNavID}
                  timeout="auto"
                  unmountOnExit
                >
                  {navList?.map(({ nav, path }, index) => (
                    <Link to={path}>
                      <List component="div" key={index} disablePadding>
                        <ListItem button>
                          <ListItemText
                            primary={
                              <Typography
                                px={2}
                                dir="rtl"
                                sx={styles.collapseItemText}
                              >
                                {nav[lang]}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </List>
                    </Link>
                  ))}
                </Collapse>
              </div>
            )}
          </Grid>
        ))}
        <ListItem button sx={{ ...styles.paddingY40 }}>
          <Typography className="animated-btn-001">
            {dictionary.buttons.reverseTableBtn[lang]}
          </Typography>
        </ListItem>
        <Divider sx={{ mb: "10px" }} />
        <ListItem button>
          <Grid container item xs={12} justifyContent={"start"}>
            <SystemContact
              color={"#e4e4e4"}
              contact={{ type: "strEmail", value: jsnSystemContact.strEmail }}
              lang={lang}
            />
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container item xs={12}>
            <SystemContact
              color={"#e4e4e4"}
              contact={{ type: "strPhone", value: jsnSystemContact.strPhone }}
              lang={lang}
            />
          </Grid>
        </ListItem>
        <Divider />
        <ListItem button>
          <Grid container item xs={12} justifyContent={"center"}>
            <Grid item xs={3}>
              <SystemSocial
                social={{
                  type: "strFacebook",
                  path: jsnSystemContact.strFacebook,
                }}
                lang={lang}
              />
            </Grid>
            <Grid item xs={3}>
              <SystemSocial
                social={{
                  type: "strInstagram",
                  path: jsnSystemContact.strInstagram,
                }}
                lang={lang}
              />
            </Grid>
            <Grid item xs={3}>
              <SystemSocial
                social={{
                  type: "strYoutube",
                  path: jsnSystemContact.strYoutube,
                }}
                lang={lang}
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DrawerNav;
