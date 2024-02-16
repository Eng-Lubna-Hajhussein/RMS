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
import { dictionary } from "appHelper/appDictionary";
import { generateRandomID } from "appHelper/appFunctions";
import {
  objCategoriesType,
  objTabsAssets,
  tabsOptions,
} from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import React, { useEffect, useMemo, useRef, useState } from "react";

function AddTab({ open, handleClose, tabsKey, systemID, lang, dir, onSave }) {
  const options = useMemo(() => {
    return tabsOptions.filter((option) => !tabsKey.includes(`${option.key}`));
  }, [tabsKey]);
  const [option, setOption] = useState(options[0]?.key);
  useEffect(() => {
    if (options.length) {
      setOption(options[0].key);
    }
  }, [options]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const tabOp = tabsOptions.find(({ key }) => key === option);
            const bigID = generateRandomID(10);
            const tab = {
              bigID: bigID,
              bigCategoryTypeID: objCategoriesType.Menu,
              bigSystemID:systemID,
              jsnName: tabOp?.jsnName,
              jsnCategoryInfo: objTabsAssets[option],
              bigParentID: 0,
            };
            onSave(tab);
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
                  <InputLabel sx={{textTransform:"capitalize"}}>{dictionary.menuSection.menuCategory[lang]}</InputLabel>
                  <Select
                    value={option}
                    required
                    autoFocus
                    variant="outlined"
                    label={dictionary.menuSection.menuCategory[lang]}
                    onChange={(e) => setOption(e.target.value)}
                    sx={{ background: "#fff", borderRadius: "5px",textTransform:"capitalize" }}
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
                      filter:
                        "invert(19%) sepia(91%) saturate(3389%) hue-rotate(339deg) brightness(108%) contrast(91%)",
                    }}
                    src={objTabsAssets[option]?.strIconPath}
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
                    src={objTabsAssets[option]?.strImgPath}
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
                label={dictionary.buttons.saveBtn[lang]}
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
