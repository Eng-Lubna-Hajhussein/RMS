import {
    AnimationOutlined,
    Close,
    StyleOutlined,
    Upload,
  } from "@mui/icons-material";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Grid,
    Typography,
    Box,
    Fab,
    Divider,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { objTabsAssets, tabsOptions } from "appHelper/appVariables";
  import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
  import React, { useEffect, useRef, useState } from "react";

  
  function AddTab({
    open,
    handleClose,
    lang,
    dir,
    onSave,
  }) {
    const [option,setOption] = useState(tabsOptions[0].key)
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleClose();
            },
          }}
          maxWidth="md"
          fullWidth
          sx={{width:"100%"}}
        >
          <DialogTitle sx={{ height: "fit-content" }}>
            <Grid container justifyContent={"end"}>
              <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ py: "0",width:"100%" }}>
          <Grid container py={1} justifyContent={"center"}></Grid>
            <Grid container py={1} justifyContent={"center"}>
              <Grid item container xs="12">
                <Grid item xs="12" p={1}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                   Section Title
                  </Typography>
                </Grid>
                <Grid item xs="6" p={1} container>
                  <FormControl fullWidth>
                    <InputLabel>Background Animation</InputLabel>
                    <Select
                      value={option}
                      required
                      autoFocus
                      variant="outlined"
                      onChange={(e) =>
                        setOption(e.target.value)
                      }
                      sx={{ background: "#fff", borderRadius: "5px" }}
                    >
                      {tabsOptions.map((tab, index) => (
                        <MenuItem value={tab.key}>{tab.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid container py={1} justifyContent={"center"}>
              <Grid item container xs="12">
                <Grid item xs="12" p={1}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                   Section Title
                  </Typography>
                </Grid>
                <Grid item xs="6" p={1} container>
                  <Box component={'img'} height={'100px'} width={'100%'}  src={objTabsAssets[option].strIconPath} />
                </Grid>
                <Grid item xs="6" p={1} container>
                <Box component={'img'} height={'100px'} width={'100%'}  src={objTabsAssets[option].strImgPath} />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ py: "0" }}>
            <Grid
              container
              p={2}
              px={5}
              justifyItems={"flex-end"}
              justifyContent={"flex-end"}
            >
              <Grid item xs="2">
                <AnimButton0001
                  label={"save"}
                  color={App_Primary_Color}
                  fullWidth={true}
                  type="submit"
                />
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  
  export default AddTab;
  