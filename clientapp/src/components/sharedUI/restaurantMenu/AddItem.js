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
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import React, { useEffect, useRef, useState } from "react";

function AddItem({ open, handleClose,systemID, activeTabID,addWS,ws, lang, dir, onSave }) {
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  const onSaleInput = useRef();
  const onFeaturedInput = useRef();
  const onMostOrderedInput = useRef();
  const onWeeklySpecial = useRef();
  const [onSaleChecked, setOnSaleChecked] = useState(false);
  const [img, setImg] = useState(null);

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
            const bigID = generateRandomID(10);
            const item = {
              bigID: Number(bigID),
              bigCategoryTypeID: objCategoriesType.Menu,
              bigParentID: activeTabID,
              bigSystemID:systemID,
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
            console.log({item})
            setImg(null);
            setOnSaleChecked(false);
            onSave(item);
            if(!!onWeeklySpecial?.current?.checked){
              addWS(item?.bigID);
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
            alignItems={'start'}
            sx={{height:"fit-content"}}
          >
            <Grid item xs="6" container>
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Dish Image
                </Typography>
              </Grid>
              <Grid item xs="12" p={1} container justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    height: "186px",
                    border: "4px dashed #ececec",
                    borderRadius: "10px",
                  }}>
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
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Dish Configuration
                </Typography>
              </Grid>
              <Grid
                item
                xs="12"
                p={1}
                container
                sx={{ height: "fit-content" }}
                alignContent={"start"}
              >
                <FormGroup>
                  {!!ws&&<InputLabel>
                  <Typography fontSize={'12px'}>You Can't Choose More Than One Meal For Weekly Special Meal</Typography>
                  </InputLabel>}
                  <FormControlLabel
                    control={<Checkbox disabled={!!ws}
                    inputRef={onWeeklySpecial}
                    />}
                    label="Weekly Special Meal"
                  />
                  <FormControlLabel
                    control={<Checkbox inputRef={onFeaturedInput} />}
                    label="Featured"
                  />
                  <FormControlLabel
                    control={<Checkbox inputRef={onMostOrderedInput} />}
                    label="Most Ordered"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={onSaleInput}
                        checked={onSaleChecked}
                        onChange={() => setOnSaleChecked((prev) => !prev)}
                      />
                    }
                    label="On Sale"
                  />
                </FormGroup>
              </Grid>
              {onSaleChecked === true && (
                <Grid item xs="12" p={1}>
                  <TextField
                    color="warning"
                    autoFocus
                    required={onSaleChecked}
                    name="salePrice"
                    label="Sale Price"
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
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Dish Name
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="nameEng"
                  label="Name English"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  dir="rtl"
                  name="nameArb"
                  label="Name Arabic"
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
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Dish Description
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="descEng"
                  label="Description English"
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
                  autoFocus
                  required
                  dir="rtl"
                  name="descArb"
                  label="Description Arabic"
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
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Dish Price
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="price"
                  label="Price"
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

export default AddItem;
