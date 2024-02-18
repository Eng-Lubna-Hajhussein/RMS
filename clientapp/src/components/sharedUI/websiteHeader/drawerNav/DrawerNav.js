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
} from "@mui/material";
import { ExpandLess, ExpandMore, Close } from "@mui/icons-material";
import { lstWebsiteNav } from "appHelper/appVariables";
import { dictionary } from "appHelper/appDictionary";
import logoIcon from "assets/image/logo.png";

const styles = {
  listSubheader: {
    borderBottom: "1px solid #000",
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
  },
  collapseItemText: {
    textTransform: "capitalize",
    fontSize: "15px",
    color: "#555",
  },
  paddingY40: {
    paddingY: "40px",
  },
};

function DrawerNav({ openDrawer, setOpenDrawer, lang }) {
  const [nestedListOpen, setNestedListOpen] = useState(false);

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" sx={styles.listSubheader}>
            <Grid container>
              <Grid item xs={8}>
                <Box component={"img"} sx={styles.logo} src={logoIcon} />
              </Grid>
              <Grid item xs={4} container justifyContent={"end"}>
                <Close fontSize="large" onClick={() => setOpenDrawer(false)} />
              </Grid>
            </Grid>
          </ListSubheader>
        }
        sx={styles.list}
      >
        {lstWebsiteNav.map(({ bigNavID, nav, navList },index) => (
          <React.Fragment key={index}>
            {!navList?.length && (
              <ListItem button>
                <ListItemText
                  primary={
                    <Typography sx={styles.listItemText}>
                      {nav[lang]}
                    </Typography>
                  }
                />
              </ListItem>
            )}
            {navList?.length && (
              <>
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
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={nestedListOpen === bigNavID}
                  timeout="auto"
                  unmountOnExit
                >
                  {navList?.map(({ nav },index) => (
                    <List component="div" key={index} disablePadding>
                      <ListItem button>
                        <ListItemText
                          primary={
                            <Typography px={2} sx={styles.collapseItemText}>
                              {nav[lang]}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  ))}
                </Collapse>
              </>
            )}
          </React.Fragment>
        ))}
        <ListItem button sx={styles.paddingY40}>
          <Typography className="animated-btn-001">
            {dictionary.buttons.reverseTableBtn[lang]}
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DrawerNav;
