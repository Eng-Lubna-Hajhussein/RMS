import { Box, Button, Grid, Typography } from "@basetoolkit/ui";

const styles = {
  startIcon: {
    lg: { height: "40px", width: "40px" },
    xs: { height: "20px", width: "20px" },
  },
  label: {
    lg: { fontSize: "16px" },
    xs: { fontSize: "9px" },
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "800",
  },
};

function Button0001({ style, startIcon, label }) {
  return (
    <Button fullWidth variant="contained" sx={{ ...style }}>
      <Grid container justifyContent={"center"} justifyItems={"center"}>
        <Grid item xs={3} container alignContent={"center"}>
          <Box component={"img"} src={startIcon} sx={styles.startIcon} />
        </Grid>
        <Grid item container xs={8}>
          <Grid
            item
            xs={12}
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
