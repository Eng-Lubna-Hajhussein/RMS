import { Menu, alpha, cssInjection } from "@basetoolkit/ui";
import {
  menuClasses,
  menuItemClasses,
  svgIconClasses,
} from "@basetoolkit/ui/classes";

const StyledMenu = cssInjection((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  [`&.${menuClasses.root}`]: {
    minWidth: 180,
    marginTop: theme.spacing(1),
    border: "none",
    borderTop: "10px #f3274c solid !important",
    transform: "translatex(-40px)",
    borderRadius: "25px",
    background: "#ffd40d !important",
    padding: "10px",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    [`& .${menuClasses.list}`]: {
      padding: "4px 0",
    },
    [`& .${menuItemClasses.root}`]: {
      [`& .${svgIconClasses.root}`]: {
        fontSize: 18,
        fill: theme.palette.text.secondary + " !important",
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default StyledMenu;
