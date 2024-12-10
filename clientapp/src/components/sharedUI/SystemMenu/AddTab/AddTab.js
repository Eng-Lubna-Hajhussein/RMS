import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Select,
  MenuItem,
  SvgIcon,
  useTheme,
} from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";
import { generateRandomID } from "appHelper/appFunctions";
import {
  objCategoriesType,
  objTabsAssets,
  tabsOptions,
} from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";

const styles = {
  dialog: {
    width: "100%",
  },
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
  inputLabel: {
    textTransform: "capitalize",
  },
  dialogContent: {
    py: "0",
    width: "100%",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  tabIconContainer: {
    height: "200px",
    border: "4px dashed #ececec",
    borderRadius: "20px",
  },
  tabIcon: {
    filter:
      "invert(19%) sepia(91%) saturate(3389%) hue-rotate(339deg) brightness(108%) contrast(91%)",
  },
  tabImgContainer: {
    height: "200px",
    border: "4px dashed #ececec",
    borderRadius: "20px",
  },
  dialogActions: {
    py: "0",
  },
};

function AddTab({ open, handleClose, tabsKey, systemID, lang, dir, onSave }) {
  const theme = useTheme();
  const options = useMemo(() => {
    return tabsOptions.filter((option) => !tabsKey.includes(`${option.key}`));
  }, [tabsKey]);
  const [option, setOption] = useState(options[0]?.key);
  useEffect(() => {
    if (options.length) {
      setOption(options[0].key);
    }
  }, [options]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const tabOp = tabsOptions.find(({ key }) => key === option);
    const bigID = generateRandomID(10);
    const tab = {
      bigID: bigID,
      bigCategoryTypeID: objCategoriesType.Menu,
      bigSystemID: systemID,
      jsnName: tabOp?.jsnName,
      jsnCategoryInfo: objTabsAssets[option],
      bigParentID: 0,
    };
    onSave(tab);
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        maxWidth="sm"
        fullWidth
        sx={styles.dialog}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"} p={1}>
            <SvgIcon icon="close" sx={styles.closeIcon} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1} justifyContent={"center"}></Grid>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1} container>
                <Select
                  value={{
                    value: option,
                    label: option,
                  }}
                  required
                  variant="outlined"
                  fullWidth
                  label={dictionary.menuSection.menuCategory[lang]}
                  onChange={(selected) => setOption(selected.value)}
                  sx={styles.select}
                >
                  {options.map((tab, index) => (
                    <MenuItem value={tab.key}>{tab.jsnName[lang]}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs={12}>
              <Grid item lg={6} xs={12} p={1} container>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={styles.tabIconContainer}
                >
                  <Box
                    component={"img"}
                    height={"60px"}
                    width={"60px"}
                    sx={styles.tabIcon}
                    src={objTabsAssets[option]?.strIconPath}
                  />
                </Grid>
              </Grid>
              <Grid item lg={6} xs={12} p={1} container>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={styles.tabImgContainer}
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
          <Grid container p={2} justifyItems={"end"} justifyContent={"end"}>
            <Grid item lg={3} xs={6}>
              <AnimButton0001
                label={dictionary.buttons.saveBtn[lang]}
                color={theme.palette.primary.main}
                fullWidth={true}
                type="submit"
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default AddTab;
