import { Box, Button, Grid, Typography } from "@mui/material";

const styles = {
  startIcon: {
    height: { lg: "40px", xs: "20px" },
    width: { lg: "40px", xs: "20px" },
  },
  label: {
    fontSize: { lg: "16px", xs: "6px" },
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "800",
  },
};

function Button0001({ style, startIcon, label }) {
  return (
    <Button fullWidth variant="contained" sx={{ ...style }}>
      <Grid container justifyContent={"center"} justifyItems={"center"}>
        <Grid item xs="3" container alignContent={"center"}>
          <Box component={"img"} src={startIcon} sx={styles.startIcon} />
        </Grid>
        <Grid item container xs="8">
          <Grid
            item
            xs="12"
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography sx={styles.label}>{label}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

export default Button0001;
