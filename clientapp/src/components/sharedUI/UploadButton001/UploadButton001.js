import { Upload } from "@mui/icons-material";
import { Button } from "@basetoolkit/ui";
import VisuallyHiddenInput from "../VisuallyHiddenInput/VisuallyHiddenInput";

function UploadButton001({ onChange, label, fullWidth, variant,style }) {
  return (
    <Button
      size="large"
      component="label"
      aria-label="add"
      variant="contained"
      role={undefined}
      tabIndex={-1}
      color="secondary"
      fullWidth={fullWidth}
      {...(style&&{style:style})}
      {...(variant !== "square" && {
        sx: {
          boxShadow: "none",
          borderRadius: "50% !important",
          p: "15px !important",
        },
      })}
      type="button"
      {...(variant==="square"&&{endIcon:<Upload />})}
    >
      {label && label}
      {variant!=="square"&&<Upload />}
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
}

export default UploadButton001;
