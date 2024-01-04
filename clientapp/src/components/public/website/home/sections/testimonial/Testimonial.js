import { Box, Grid, Rating, Typography } from "@mui/material";
import quoteIcon from "assets/image/quote.png";

function Testimonial() {
  return (
    <Grid
      container
      sx={{
        paddingLeft: "100px",
        paddingRight: "100px",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <Grid item container xs="6">
        <Grid item xs="12">
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#f3274c",
              fontSize: "18px",
              letterSpacing: "2px",
              fontWeight: "800",
            }}
          >
            TESTIMONIALS & REVIEWS
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography
            sx={{
              color: "#000",
              fontSize: "50px",
              fontWeight: "800",
            }}
          >
            Our Customar Feedbacks
          </Typography>
        </Grid>
        <Grid item xs="10">
          <Box
            sx={{
              padding: "40px",
              border: "5px solid #ffd40d",
              borderRadius: "30px",
            }}
          >
            <Grid item container xs="12">
              <Grid item xs="12">
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#555",
                    fontWeight: "400",
                  }}
                >
                  A good restaurant is like a vacation; it transports you, and
                  it becomes a lot more than just about the food. All great
                  deeds and all great thoughts
                </Typography>
              </Grid>
              <Grid
                item
                xs="10"
                pt={2}
                container
                alignContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs="12">
                  <Typography
                    sx={{
                      fontSize: "26px",
                      color: "#000",
                      fontWeight: "800",
                      textTransform: "capitalize",
                    }}
                  >
                    Bratlee Hamint
                  </Typography>
                </Grid>
                <Grid item xs="12" container alignContent={"center"}>
                  <Rating value={5} />
                </Grid>
              </Grid>
              <Grid
                item
                xs="2"
                container
                alignContent={"end"}
                alignItems={"end"}
              >
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    textAlign: "center",
                    background: "#ffd40d",
                    borderRadius: "100%",
                  }}
                >
                    <Grid container sx={{height:"100%"}} justifyContent={'center'} alignContent={'center'}>

                  <img src={quoteIcon} height={"30px"} width={"30px"} />
                    </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Testimonial;
