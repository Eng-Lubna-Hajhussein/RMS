import { Button, Typography } from "@mui/material";
import "./AnimButton0001.css";

const styles = {
  inner: {
    fontWeight: "800",
    width: "100%",
    fontSize:{lg:"16px",xs:"14px"},
    padding:{lg:"18px 20px",xs:"12px 15px"},
    // ":before":{
    //   height: {lg:"72px",xs:"80px"}
    // }
  },
};

function AnimButton0001({
  label,
  color,
  disabled,
  fullWidth,
  onClick = () => {},
  type = "button",
}) {
  return (
    <Button
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Typography
        className="animated-btn"
        sx={{
          ...styles.inner,
          backgroundColor: color,
          ":before": {
            borderColor: color,
            height: {lg:"72px",xs:"58px"}
          },
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}

export default AnimButton0001;
