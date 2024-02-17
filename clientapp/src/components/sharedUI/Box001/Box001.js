import { Box, Grid, Typography } from "@mui/material";

const styles = {
    box: {
      width: "100%",
      background: "#f4fcfc !important",
      height: "100px",
      borderRadius: "20px",
      paddingX: "20px",
    },
    title: {
      textTransform: "capitalize",
      color: "#555",
      fontSize: "14px !important",
    },
    description: {
      textTransform: "capitalize",
      color: "#000",
      fontSize: "25px !important",
      fontWeight: "800 !important",
    },
    icon: {
      padding: "18px",
      background: "#ffd40d",
      borderRadius: "10px",
    },
    logo: {
      width: "150px",
    },
    container: {
      height: "fit-content",
      marginY: "50px",
      borderRadius: "20px",
      padding: "20px",
    },
    systemName: {
      color: "#000",
      textTransform: "capitalize",
      fontWeight: "800",
      fontSize: "30px",
    },
    systemAddress: {
      fontWeight: "700",
      fontSize: "15px",
      textTransform: "capitalize",
    },
    fitContentHeight:{
      height: "fit-content"
    },
    fullHeight:{
      height:"100%"
    }
  };

function Box001({title,description,img}){
    return <Box sx={styles.box}>
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      sx={styles.fullHeight}
    >
      <Grid item xs="10">
        <Grid container>
          <Grid item xs="12">
            <Typography sx={styles.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Typography sx={styles.description}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs="2">
        <img src={img} style={styles.icon} />
      </Grid>
    </Grid>
  </Box>
}

export default Box001;