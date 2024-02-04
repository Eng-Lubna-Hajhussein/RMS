import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Grid, Icon, IconButton, Typography } from "@mui/material";
import StyledMenu from "../StyledMenu/StyledMenu";
import { MoreVert } from "@mui/icons-material";

const styles = {
  nav: {
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "#000",
  },
  subNav: {
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    textTransform: "capitalize",
  },
};

export default function OptionList({
  nav,
  navList,
  lang,
  onClick,
  endIcon = <KeyboardArrowDownIcon />,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={(event)=>{
          handleClick(event);
          if(onClick){
            onClick();
          }
        }}
        endIcon={navList?.length && endIcon}
      >
        <MoreVert />
      </IconButton>
      {navList?.length && (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {navList.map(({ nav, onClick }, index) => (
            <div>
              <MenuItem
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }
                  handleClose();
                }}
                disableRipple
              >
                <Typography color={"#000"} sx={styles.subNav}>
                  {nav[lang]}
                </Typography>
              </MenuItem>
              {index !== navList.length - 1 && <Divider />}
            </div>
          ))}
        </StyledMenu>
      )}
    </div>
  );
}
