import { Button, Typography } from "@mui/material";
import "./AnimButton0001.css";

const styles = {
  inner: {
    fontWeight: "800",
    width: "100%",
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
          },
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}

export default AnimButton0001;
