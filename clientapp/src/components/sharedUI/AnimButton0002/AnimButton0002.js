import "./AnimButton0002.css";
import { Typography } from "@mui/material";

const styles = {
  label: {
    fontWeight: "800 ",
    cursor: "pointer",
    textTransform: "capitalize",
    fontSize:{lg:"16px",xs:"14px"},
    padding:{lg:"18px 20px",xs:"12px 15px"},
  },
};

function AnimButton0002({ label, icon, img, text, src }) {
  return (
    <div className="anim-btn-0002" style={{ cursor: "pointer" }}>
      <a href={src} target="_blank">
        <i>
          {icon && { icon }}
          {img && <img src={img} width="15" height="22" />}
        </i>
        <Typography  mx={2} sx={styles.label}>
          {label}
        </Typography>
      </a>
    </div>
  );
}

export default AnimButton0002;
