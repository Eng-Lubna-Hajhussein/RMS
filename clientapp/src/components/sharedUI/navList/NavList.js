import * as React from "react";
import {
  Button,
  MenuItem,
  Divider,
  Typography,
  Box,
  SvgIcon,
} from "@basetoolkit/ui";
import StyledMenu from "../StyledMenu/StyledMenu";
import { Link } from "react-router-dom";

const styles = {
  nav: {
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "#000 !important",
    height: "40px !important",
  },
  subNav: {
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  divider: {
    background: "black",
  },
};

export default function NavList({
  nav,
  navList,
  lang,
  endIcon = <SvgIcon icon="keyboard_arrow_down" color="black" />,
  path,
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
    <Box>
      {path && (
        <Link to={path}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="link"
            disableElevation
            onClick={handleClick}
            endIcon={navList?.length && endIcon}
            sx={styles.nav}
          >
            {nav}
            &nbsp;
          </Button>
        </Link>
      )}
      {!path && (
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="link"
          disableElevation
          onClick={handleClick}
          endIcon={navList?.length && endIcon}
          sx={styles.nav}
        >
          {nav}
          &nbsp;
        </Button>
      )}
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
          {navList.map(({ nav, onClick, path }, index) => (
            <Link to={path} key={index}>
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
              {index !== navList.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </Link>
          ))}
        </StyledMenu>
      )}
    </Box>
  );
}
