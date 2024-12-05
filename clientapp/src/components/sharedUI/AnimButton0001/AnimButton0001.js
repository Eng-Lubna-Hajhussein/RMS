import { Typography,Button } from "@basetoolkit/ui";
import "./AnimButton0001.css";

const styles = {
  inner: {
    fontWeight: "800",
    width: "100%",
    lg:{p:"18px 20px !important",fontSize:"16px !important"},
    xs:{p:"12px 15px !important" ,fontSize:"14px !important"}
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
          "&:before": {
            borderColor: color,
            lg:{height:"78px"},
            xs:{height:"67px"}
          },
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}

export default AnimButton0001;
