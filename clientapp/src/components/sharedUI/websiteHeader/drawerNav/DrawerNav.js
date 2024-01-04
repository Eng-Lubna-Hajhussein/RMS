import React, { useState } from "react";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
} from "@mui/material";
import {
  MoveToInbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";

function DrawerNav({ openDrawer, setOpenDrawer }) {
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
          <ListSubheader component="div">Nested List Items</ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText inset primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>
        <ListItem button onClick={() => setNestedListOpen((prev) => !prev)}>
          <ListItemIcon>
            <MoveToInbox />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {nestedListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={nestedListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}

export default DrawerNav;
