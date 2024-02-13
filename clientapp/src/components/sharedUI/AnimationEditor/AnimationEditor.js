import { useEffect, useMemo, useState } from "react";
import "./AnimationEditor.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AnimButton0001 from "../AnimButton0001/AnimButton0001";
import { Close } from "@mui/icons-material";
import { App_Primary_Color } from "appHelper/appColor";
import AnimationBox from "../AnimationBox/AnimationBox";

const AnimationEditor = ({
  objText,
  onChange,
  open,
  handleClose,
  lang,
  dir,
}) => {
  const options = [
    //  *   type:  '' | '' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight',
    { key: "none", value: "none" },
    { key: "fadeIn", value: "fadeIn" },
    { key: "fadeOut", value: "fadeOut" },
    { key: "fadeInGrow", value: "fadeInGrow" },
    { key: "fadeOutGrow", value: "fadeOutGrow" },
    { key: "slideIn", value: "slideIn" },
    { key: "slideOut", value: "slideOut" },
    { key: "grow", value: "grow" },
    { key: "slideInRotate", value: "slideInRotate" },
    { key: "slideOutRotate", value: "slideOutRotate" },
    { key: "fadeOutSlideOut", value: "fadeOutSlideOut" },
    { key: "wobble", value: "wobble" },
    { key: "hinge", value: "hinge" },
    { key: "flip", value: "flip" },
    { key: "flipInX", value: "flipInX" },
    { key: "flipOutX", value: "flipOutX" },
    { key: "flipInY", value: "flipInY" },
    { key: "flipOutY", value: "flipOutY" },
    { key: "rollIn", value: "rollIn" },
    { key: "rollOut", value: "rollOut" },
    { key: "rotateOut", value: "rotateOut" },
    { key: "rotateIn", value: "rotateIn" },
    { key: "slideInUp", value: "slideInUp" },
    { key: "slideInDown", value: "slideInDown" },
    { key: "slideInLeft", value: "slideInLeft" },
    { key: "slideInRight", value: "slideInRight" },
    { key: "slideOutUp", value: "slideOutUp" },
  ];
  return (
    <Dialog open={open} onClose={handleClose} fullScreen maxWidth="sm">
      <DialogTitle sx={{ height: "fit-content", width: "100%" }}>
        <Grid container justifyContent={"end"}>
          <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ py: "0", width: "100%" }}>
        <div class="animation-editor-container">
          <Grid container py={1} justifyContent={"center"}>
            <Grid container xs='12'>
            <FormControl fullWidth>
                    <InputLabel>Background Animation</InputLabel>
                    <Select
                    label='Background Animation'
                      value={objText[objText.onAnimationKey]?.strAnimationType || "none"}
                      required
                      autoFocus
                      variant="outlined"
                      onChange={(e) =>
                        {
                            console.log(e.target.value)
                            onChange(e.target.value)
                        }
                      }
                      sx={{ background: "#fff", borderRadius: "5px" }}
                    >
                      {options.map((type, index) => (
                        <MenuItem value={type.key}>{type.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
            </Grid>
            <Grid
              container
              xs='12'
              sx={{
                height: "250px",
                background:
                  objText?.strImgPath && `url(${objText?.strImgPath})`,
                backgroundSize: "100% 100%",
                backgroundColor: "#000",
              }}
              mt={5}
              p={2}
            >
              <Grid item xs="12">
                <AnimationBox
              animationMode="loop"
              easing={"linear"}
              forceTrigger={true}
              trigger="manual"
              type={
                objText[objText.onAnimationKey]?.strAnimationType
              }
            >
                <Typography
                  sx={{
                    ...objText.defaultStyle,
                    ...objText[objText.onAnimationKey]?.style,
                  }}
                >
                  {objText[objText?.onAnimationKey] &&
                    objText[objText?.onAnimationKey][lang]}
                </Typography>
            </AnimationBox>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimationEditor;
