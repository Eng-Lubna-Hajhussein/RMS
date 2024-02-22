import { Upload } from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import { App_Second_Color } from "appHelper/appColor";

const styles = {
  fab: {
    background: App_Second_Color,
    ":hover": { background: App_Second_Color },
    width: "100%",
    boxShadow: "none",
    width: "100%",
    height: "55px",
  },
  label: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "800",
    fontSize: { lg: "16px", xs: "13px" },
  },
};

function UploadButton001({ onChange, label, fullWidth, variant }) {
  return (
    <label htmlFor="upload-photo" style={{ width: fullWidth && "100%" }}>
      <input
        style={{ display: "none", width: fullWidth && "100%" }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        onChange={onChange}
      />
      <Fab
        size="large"
        component="span"
        aria-label="add"
        variant="extended"
        sx={{
          borderRadius: variant === "square" ? "5px" : "50%",
          ...styles.fab,
        }}
      >
        <Upload />
        {label && (
          <Typography px={2} sx={styles.label}>
            {label}
          </Typography>
        )}
      </Fab>
    </label>
  );
}

export default UploadButton001;
