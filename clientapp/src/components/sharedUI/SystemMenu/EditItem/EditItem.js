import {
  AnimationOutlined,
  Close,
  Favorite,
  FavoriteBorder,
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
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import React, { useEffect, useMemo, useRef, useState } from "react";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
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

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { nameEng, nameArb, descEng, descArb, salePrice, price } =
              formJson;
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
          },
        }}
        maxWidth="md"
      >
        <DialogTitle sx={{ height: "fit-content" }}>
          <Grid container justifyContent={"end"}>
            <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ py: "0" }}>
          <Grid
            container
            py={1}
            justifyContent={"start"}
            alignContent={"start"}
            alignItems={"start"}
            sx={{ height: "fit-content" }}
          >
            <Grid item xs="6" container>
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.menuSection.dishImg[lang]}
                </Typography>
              </Grid>
              <Grid
                item
                xs="12"
                p={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
                sx={{
                  height: "186px",
                  border: "4px dashed #ececec",
                  borderRadius: "10px",
                }}
              >
                <Grid
                  item
                  xs="8"
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    height: "150px",
                    background: `url(${img})`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={onImgChange}
                    />

                    <Fab
                      size="large"
                      component="span"
                      aria-label="add"
                      variant="extended"
                      sx={{
                        background: App_Second_Color,
                      }}
                    >
                      <Upload />
                    </Fab>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs="6"
              p={1}
              px={4}
              container
              justifyContent={"start"}
              alignContent={"start"}
            >
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.menuSection.dishConfiguration[lang]}
                </Typography>
              </Grid>
              <Grid
                item
                xs="12"
                px={0}
                py={1}
                container
                sx={{ height: "fit-content" }}
                alignContent={"start"}
              >
                <FormGroup>
                  {!!ws && ws !== categoryOnAction?.bigID && (
                    <InputLabel>
                      <Typography
                        fontSize={"12px"}
                        sx={{
                          textTransform: "capitalize",
                          "&": { margin: "0" },
                        }}
                      >
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
                    sx={{
                      textTransform: "capitalize",
                      "&": { margin: "0" },
                    }}
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
                    sx={{ textTransform: "capitalize", "&": { margin: "0" } }}
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
                    sx={{ textTransform: "capitalize", "&": { margin: "0" } }}
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
                    sx={{ textTransform: "capitalize", "&": { margin: "0" } }}
                    label={dictionary.menuSection.onSale[lang]}
                  />
                </FormGroup>
              </Grid>
              {onSaleChecked === true && (
                <Grid item xs="12" p={1}>
                  <TextField
                    color="warning"
                    
                    required={onSaleChecked}
                    defaultValue={
                      categoryOnAction?.jsnCategoryInfo?.strSalePrice &&
                      categoryOnAction?.jsnCategoryInfo?.strSalePrice
                    }
                    name="salePrice"
                    sx={{ textTransform: "capitalize" }}
                    label={dictionary.labels.salePrice[lang]}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                   {dictionary.menuSection.dishName[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  
                  defaultValue={categoryOnAction?.jsnName["eng"]}
                  required
                  dir="ltr"
                  name="nameEng"
                  sx={{ textTransform: "capitalize" }}
                  label={dictionary.labels.nameEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  
                  required
                  dir="rtl"
                  name="nameArb"
                  defaultValue={categoryOnAction?.jsnName["arb"]}
                  sx={{ textTransform: "capitalize" }}
                  label={dictionary.labels.nameArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
              <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.menuSection.dishDescription[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  
                  required
                  defaultValue={
                    categoryOnAction?.jsnCategoryInfo?.jsnDescription["eng"]
                  }
                  name="descEng"
                  sx={{ textTransform: "capitalize" }}
                  label={dictionary.labels.descriptionEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  
                  required
                  dir="rtl"
                  defaultValue={
                    categoryOnAction?.jsnCategoryInfo?.jsnDescription["arb"]
                  }
                  name="descArb"
                  sx={{ textTransform: "capitalize" }}
                  label={dictionary.labels.descriptionArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
              <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.menuSection.dishPrice[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  
                  required
                  defaultValue={categoryOnAction?.jsnCategoryInfo?.strPrice}
                  name="price"
                  sx={{ textTransform: "capitalize" }}
                  label={dictionary.labels.price[lang]}
                  fullWidth
                  variant="outlined"
                />
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
