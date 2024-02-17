import { App_Second_Color } from "appHelper/appColor";

const { Typography } = require("@mui/material");

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
};

function Title0001({ title, dir }) {
  return (
    <Typography
      sx={{
        ...styles.title,
        borderLeft: dir === "ltr" && `5px solid ${App_Second_Color}`,
        borderRight: dir === "rtl" && `5px solid ${App_Second_Color}`,
      }}
    >
      {title}
    </Typography>
  );
}

export default Title0001;
