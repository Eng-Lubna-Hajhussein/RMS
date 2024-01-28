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
import { objCategoriesType, objTabsAssets, tabsOptions } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import React, { useEffect, useMemo, useRef, useState } from "react";

function AddTab({ open, handleClose,tabsIDs, lang, dir, onSave }) {
  const options = useMemo(()=>{
   return tabsOptions.filter((option)=>!tabsIDs.includes(`${option.key}`))
  },[tabsIDs]);
  const [option, setOption] = useState(options[0]?.key);
  useEffect(()=>{
    if(options.length){
      setOption(options[0].key)
    }
  },[options])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const tabOp = tabsOptions.find(({key})=>key===option);
            const tab = {
              bigID:option,
              bigCategoryTypeID:objCategoriesType.Menu,
              jsnName:tabOp?.jsnName,
              jsnCategoryInfo:objTabsAssets[option],
              bigParentID: 0,
            }
            onSave(tab)
            handleClose();
          },
        }}
        maxWidth="sm"
        fullWidth
        sx={{ width: "100%" }}
      >
        <DialogTitle sx={{ height: "fit-content" }}>
          <Grid container justifyContent={"end"}>
            <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ py: "0", width: "100%" }}>
          <Grid container py={1} justifyContent={"center"}></Grid>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs="12">
              <Grid item xs="12" p={1} container>
                <FormControl fullWidth>
                  <InputLabel>Menu Category</InputLabel>
                  <Select
                    value={option}
                    required
                    autoFocus
                    variant="outlined"
                    label='Menu Category'
                    onChange={(e) => setOption(e.target.value)}
                    sx={{ background: "#fff", borderRadius: "5px" }}
                  >
                    {options.map((tab, index) => (
                      <MenuItem value={tab.key}>{tab.jsnName[lang]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs="12">
              <Grid item xs="6" p={1} container>
                <Grid
                  item
                  xs="12"
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    height: "200px",
                    border: "4px dashed #ececec",
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    component={"img"}
                    height={"60px"}
                    width={"60px"}
                    sx={{
                      filter:"invert(19%) sepia(91%) saturate(3389%) hue-rotate(339deg) brightness(108%) contrast(91%)",
                    }}
                    src={objTabsAssets[option].strIconPath}
                  />
                </Grid>
              </Grid>
              <Grid item xs="6" p={1} container>
                <Grid
                  item
                  xs="12"
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    height: "200px",
                    border: "4px dashed #ececec",
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    component={"img"}
                    height={"150px"}
                    width={"150px"}
                    src={objTabsAssets[option].strImgPath}
                  />
                </Grid>
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
            <Grid item xs="4">
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
