import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Drawer } from '@mui/material';

function DrawerComp({openDrawer,setOpenDrawer}){
  const [nestedListOpen,setNestedListOpen] = useState(false);
  return (
    <Drawer
    anchor="left"
    open={openDrawer}
    onClose={() => setOpenDrawer(false)} >
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={()=>setNestedListOpen(prev=>!prev)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {nestedListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={nestedListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
  )
}

// class NestedList extends React.Component {
//   state = { open: true };

//   handleClick = () => {
//     this.setState(state => ({ open: !state.open }));
//   };

//   render() {
//     return (
//       <div >
//         <List
//           component="nav"
//           subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
//         >
//           <ListItem button>
//             <ListItemIcon>
//               <SendIcon />
//             </ListItemIcon>
//             <ListItemText inset primary="Sent mail" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon>
//               <DraftsIcon />
//             </ListItemIcon>
//             <ListItemText inset primary="Drafts" />
//           </ListItem>
//           <ListItem button onClick={this.handleClick}>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             <ListItemText inset primary="Inbox" />
//             {this.state.open ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={this.state.open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button >
//                 <ListItemIcon>
//                   <StarBorder />
//                 </ListItemIcon>
//                 <ListItemText inset primary="Starred" />
//               </ListItem>
//             </List>
//           </Collapse>
//         </List>
//       </div>
//     );
//   }
// }
export default DrawerComp;