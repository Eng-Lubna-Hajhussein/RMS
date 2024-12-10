import * as React from "react";
import {
  IconButton,
  Typography,
  Divider,
  MenuItem,
  SvgIcon,
} from "@basetoolkit/ui";
import StyledMenu from "../StyledMenu/StyledMenu";

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
  endIcon = <SvgIcon icon="keyboard_arrow_down" color="black" />,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    console.log(navList);
  }, [navList]);
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
        onClick={(event) => {
          handleClick(event);
          if (onClick) {
            onClick();
          }
        }}
        endIcon={navList?.length && endIcon}
      >
        <SvgIcon icon="more_vert" />
      </IconButton>
      {navList?.length && (
        <StyledMenu
          id="demo-customized-menu"
          area-label="demo-customized-button"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
              {index !== navList.length - 1 && <Divider style={{background:"black"}} />}
            </div>
          ))}
        </StyledMenu>
      )}
    </div>
  );
}
