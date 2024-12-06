import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { InputAdornment, Snackbar, TextField } from "@basetoolkit/ui";

const styles = {
  cursorPointer: {
    cursor: "pointer",
  },
};

const CopyToClipboardButton = ({ label, value }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(value.toString());
  };

  return (
    <>
      <TextField
        aria-readonly
        fullWidth
        value={value}
        sx={styles.cursorPointer}
        label={label}
        variant="filled"
        inputMode="url"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <ContentCopy sx={styles.cursorPointer} onClick={handleClick} />
            </InputAdornment>
          ),
        }}
      />

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

export default CopyToClipboardButton;
