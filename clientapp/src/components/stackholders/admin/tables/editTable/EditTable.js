import React from "react";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  useTheme,
} from "@basetoolkit/ui";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { ctrlTables } from "../controller/CtrlTables";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: {
    py: "0",
  },
  dialogActions: {
    py: "0",
  },
};

function EditTable({
  open,
  handleClose,
  table,
  isLoading,
  setIsLoading,
  tables,
  setTables,
  lang,
  dir,
}) {
  const theme = useTheme();
  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    ctrlTables.updateTable({
      bigTableID: table.bigTableID,
      formData: formJson,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      tables: tables,
      setTables: setTables,
    });
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handelSubmit,
        }}
        maxWidth="md"
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"}>
            <Close sx={styles.closeIcon} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001 title={"Edit Table Info"} dir={dir} />
              </Grid>
              <Grid item xs={6} p={1}>
                <TextField
                  color="warning"
                  required
                  name="seatsNum"
                  label="Seats Number"
                  type="number"
                  fullWidth
                  defaultValue={table?.intSeatsNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} p={1}>
                <TextField
                  color="warning"
                  required
                  name="pricePerHour"
                  label="Price Per Hour"
                  type="text"
                  defaultValue={table?.strTablePrice}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Grid
            container
            width={"100%"}
            justifyItems={"end"}
            justifyContent={"end"}
          >
            <Grid item xs={4}>
              <AnimButton0001
                label={"Save"}
                color={theme.palette.primary.main}
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

export default EditTable;
