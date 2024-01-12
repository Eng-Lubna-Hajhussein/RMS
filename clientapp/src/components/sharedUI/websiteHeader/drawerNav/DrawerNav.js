import React, { useState } from "react";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  MoveToInbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Close,
  Grade,
} from "@mui/icons-material";
import { lstWebsiteNav } from "appHelper/appVariables";
import { dictionary } from "appHelper/appDictionary";
import { Button } from "bootstrap";
import logoIcon from "assets/image/logo.png";

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
          <ListSubheader
            component="div"
            sx={{
              borderBottom: "1px solid #000",
              width: "100%",
              height: "fit-content",
            }}
          >
            <Grid container>
              <Grid item xs="8">
                <Box
                  component={"img"}
                  sx={{ width: "150px", height: "50px" }}
                  src={logoIcon}
                />
              </Grid>
              <Grid item xs="4" container justifyContent={"end"}>
                <Close fontSize="large" onClick={() => setOpenDrawer(false)} />
              </Grid>
            </Grid>
          </ListSubheader>
        }
        sx={{ width: "100vw", paddingY: "20px" }}
      >
        {lstWebsiteNav.map(({ bigNavID, nav, navList }) => (
          <>
            {!navList?.length && (
              <ListItem button>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ textTransform: "capitalize", fontSize: "18px" }}
                    >
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
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "18px" }}
                      >
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
                  {navList?.map(({ nav }) => (
                    <List component="div" disablePadding>
                      <ListItem button>
                        <ListItemText
                          primary={
                            <Typography
                              px={2}
                              sx={{
                                textTransform: "capitalize",
                                fontSize: "15px",
                                color: "#555",
                              }}
                            >
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
          </>
        ))}
        <ListItem button sx={{ paddingY: "40px" }}>
          <Typography className="animated-btn-001">
            {dictionary.buttons.reverseTableBtn[lang]}
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DrawerNav;
