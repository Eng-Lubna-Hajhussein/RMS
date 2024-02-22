import React, { useEffect, useRef, useState } from "react";
import { Close, Upload } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import UploadButton001 from "components/sharedUI/UploadButton001/UploadButton001";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: {
    py: "0",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  dishImgContainer: {
    height: "186px",
    border: "4px dashed #ececec",
    borderRadius: "10px",
  },
  dishImgContainerItem: {
    height: "150px",
    backgroundSize: "100% 100%",
  },
  displayNone: {
    display: "none",
  },
  wsNote: {
    textTransform: "capitalize",
    "&": { margin: "0" },
  },
  formControlLabel: {
    textTransform: "capitalize",
    "&": { margin: "0" },
  },
  textfield: {
    textTransform: "capitalize",
  },
  dialogAction: {
    py: "0",
  },
};

function EditItem({
  open,
  handleClose,
  categoryOnAction,
  addWS,
  removeWS,
  ws,
  lang,
  dir,
  onSave,
}) {
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  const onSaleInput = useRef();
  const onFeaturedInput = useRef();
  const onMostOrderedInput = useRef();
  const onWeeklySpecial = useRef();
  const [onSaleChecked, setOnSaleChecked] = useState(
    !!categoryOnAction?.jsnCategoryInfo?.blnOnSale
  );
  const [img, setImg] = useState(categoryOnAction?.jsnCategoryInfo?.strImgPath);

  useEffect(() => {
    setOnSaleChecked(!!categoryOnAction?.jsnCategoryInfo?.blnOnSale);
    setImg(categoryOnAction?.jsnCategoryInfo?.strImgPath);
  }, [categoryOnAction]);

  useEffect(() => {
    if (!!data && data[0]?.strFileFullPath) {
      setImg(data[0]?.strFileFullPath);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { nameEng, nameArb, descEng, descArb, salePrice, price } = formJson;
    const item = {
      ...categoryOnAction,
      jsnName: { eng: nameEng, arb: nameArb },
      jsnCategoryInfo: {
        strImgPath: img,
        strPrice: price,
        jsnDescription: {
          eng: descEng,
          arb: descArb,
        },
        strSalePrice: salePrice ? salePrice : "",
        blnFeatured: !!onFeaturedInput?.current?.checked,
        blnOnSale: !!onSaleInput?.current?.checked,
        blnMostOrdered: !!onMostOrderedInput?.current?.checked,
      },
    };
    onSave(item);
    if (!!onWeeklySpecial?.current?.checked) {
      addWS(item.bigID);
    }
    if (!onWeeklySpecial?.current?.checked) {
      removeWS();
    }
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
        maxWidth="md"
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"}>
            <Close sx={styles.closeIcon} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid
            container
            py={1}
            justifyContent={"start"}
            alignContent={"start"}
            alignItems={"start"}
            sx={styles.fitContentHeight}
          >
            <Grid item lg={6} xs={12} container>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.menuSection.dishImg[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid
                item
                xs={12}
                p={1}
                m={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
                sx={styles.dishImgContainer}
              >
                <Grid
                  item
                  xs={8}
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    background: `url(${img})`,
                    ...styles.dishImgContainerItem,
                  }}
                >
                  <UploadButton001 onChange={onImgChange} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              sx={{
                paddingY: { xs: "10px", lg: "2px" },
                paddingX: { xs: "0px", lg: "10px" },
              }}
              container
              justifyContent={"start"}
              alignContent={"start"}
            >
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.menuSection.dishConfiguration[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid
                item
                xs={12}
                px={0}
                py={1}
                container
                sx={styles.fitContentHeight}
                alignContent={"start"}
              >
                <FormGroup>
                  {!!ws && ws !== categoryOnAction?.bigID && (
                    <InputLabel>
                      <Typography fontSize={"12px"} sx={styles.wsNote}>
                        {dictionary.menuSection.weeklySpecialMealNote[lang]}
                      </Typography>
                    </InputLabel>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!!ws && ws !== categoryOnAction?.bigID}
                        defaultChecked={ws === categoryOnAction?.bigID}
                      />
                    }
                    sx={styles.formControlLabel}
                    label={dictionary.menuSection.weeklySpecialMeal[lang]}
                    inputRef={onWeeklySpecial}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={onFeaturedInput}
                        defaultChecked={
                          categoryOnAction?.jsnCategoryInfo?.blnFeatured
                        }
                      />
                    }
                    sx={styles.formControlLabel}
                    label={dictionary.menuSection.featured[lang]}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={onMostOrderedInput}
                        defaultChecked={
                          categoryOnAction?.jsnCategoryInfo?.blnMostOrdered
                        }
                      />
                    }
                    sx={styles.formControlLabel}
                    label={dictionary.menuSection.mostOrdered[lang]}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={onSaleInput}
                        onChange={() => setOnSaleChecked((prev) => !prev)}
                        checked={onSaleChecked}
                      />
                    }
                    sx={styles.formControlLabel}
                    label={dictionary.menuSection.onSale[lang]}
                  />
                </FormGroup>
              </Grid>
              {onSaleChecked === true && (
                <Grid item xs={12} p={1}>
                  <TextField
                    color="warning"
                    required={onSaleChecked}
                    defaultValue={
                      categoryOnAction?.jsnCategoryInfo?.strSalePrice &&
                      categoryOnAction?.jsnCategoryInfo?.strSalePrice
                    }
                    name="salePrice"
                    sx={styles.textfield}
                    label={dictionary.labels.salePrice[lang]}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.menuSection.dishName[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  defaultValue={categoryOnAction?.jsnName["eng"]}
                  required
                  dir="ltr"
                  name="nameEng"
                  sx={styles.textfield}
                  label={dictionary.labels.nameEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  name="nameArb"
                  defaultValue={categoryOnAction?.jsnName["arb"]}
                  sx={styles.textfield}
                  label={dictionary.labels.nameArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.menuSection.dishDescription[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  defaultValue={
                    categoryOnAction?.jsnCategoryInfo?.jsnDescription["eng"]
                  }
                  name="descEng"
                  sx={styles.textfield}
                  label={dictionary.labels.descriptionEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  defaultValue={
                    categoryOnAction?.jsnCategoryInfo?.jsnDescription["arb"]
                  }
                  name="descArb"
                  sx={styles.textfield}
                  label={dictionary.labels.descriptionArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.menuSection.dishPrice[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  defaultValue={categoryOnAction?.jsnCategoryInfo?.strPrice}
                  name="price"
                  sx={styles.textfield}
                  label={dictionary.labels.price[lang]}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={styles.dialogAction}>
          <Grid
            container
            p={2}
            px={5}
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Grid item lg={2} xs={6}>
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

export default EditItem;
