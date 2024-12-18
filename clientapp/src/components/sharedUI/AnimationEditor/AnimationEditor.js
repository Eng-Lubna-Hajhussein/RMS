import "./AnimationEditor.css";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Select,
  MenuItem,
  SvgIcon,
} from "@basetoolkit/ui";
import AnimationBox from "../AnimationBox/AnimationBox";
import { animationEditorOptions } from "appHelper/appVariables";

const styles = {
  dialogTitle: {
    height: "fit-content",
    width: "100%",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: {
    py: "0",
    width: "100%",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
  },
  viewBoxContainer: {
    height: "250px",
    backgroundSize: "100% 100%",
    backgroundColor: "#000",
  },
};

const AnimationEditor = ({
  objText,
  onChange,
  open,
  handleClose,
  lang,
  dir,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={styles.dialogTitle}>
        <Grid container justifyContent={"end"} p={1}>
          <SvgIcon icon="close" sx={styles.closeIcon} onClick={handleClose} />
        </Grid>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <div className="animation-editor-container">
          <Grid container py={1} justifyContent={"center"}>
            <Grid container xs={12}>
              <Select
                fullWidth
                label="Background Animation"
                value={{
                  value:
                    objText[objText.onAnimationKey]?.strAnimationType || "none",
                  label:
                    objText[objText.onAnimationKey]?.strAnimationType || "none",
                }}
                required
                autoFocus
                variant="outlined"
                onChange={(selected) => {
                  onChange(selected.value);
                }}
                sx={styles.select}
              >
                {animationEditorOptions.map((type, index) => (
                  <MenuItem key={index} value={type.key}>
                    {type.value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              container
              xs={12}
              sx={{
                ...styles.viewBoxContainer,
                background:
                  objText?.strImgPath && `url(${objText?.strImgPath})`,
              }}
              mt={5}
              p={2}
            >
              <Grid item xs={12}>
                <AnimationBox
                  animationMode="loop"
                  easing={"linear"}
                  forceTrigger={true}
                  trigger="manual"
                  type={objText[objText.onAnimationKey]?.strAnimationType}
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
