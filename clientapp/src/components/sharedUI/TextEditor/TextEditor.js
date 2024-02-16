import { useEffect, useState } from "react";
import "./TextEditor.css";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { fontList } from "appHelper/appVariables";

const styles = {
  dialogTitle: {
    height: "fit-content",
    width: "100%",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: { py: "0", width: "100%" },
  cursorPointer: {
    cursor: "pointer",
  },
  boldBtn: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  viewBox: {
    height: "250px",
    backgroundSize: "100% 100%",
    backgroundColor: "#000",
  },
};

const TextEditor = ({ objText, onChange, open, handleClose, lang, dir }) => {
  const [active, setActive] = useState({
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    boldBtn: false,
    fontColor:
      objText[objText?.onStyleKey]?.style?.color ||
      objText?.defaultStyle?.color,
    highlightColor:
      objText[objText?.onStyleKey]?.style?.background ||
      objText?.defaultStyle?.background,
  });

  useEffect(() => {
    setActive({
      justifyLeft: false,
      justifyCenter: false,
      justifyRight: false,
      justifyFull: false,
      boldBtn: false,
      fontColor:
        objText[objText?.onStyleKey]?.style?.color ||
        objText?.defaultStyle?.color,
      highlightColor:
        objText[objText?.onStyleKey]?.style?.background ||
        objText?.defaultStyle?.background,
    });
  }, [objText.onStyleKey]);

  useEffect(() => {
    if (objText.onStyleKey) {
      onChange({
        ...objText[objText.onStyleKey]?.style,
        fontWeight: active.boldBtn ? "bold" : "100",
        background: active.highlightColor,
        color: active?.fontColor,
      });
    }
  }, [active]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen maxWidth="sm">
      <DialogTitle sx={styles.dialogTitle}>
        <Grid container justifyContent={"end"}>
          <Close sx={styles.closeIcon} onClick={handleClose} />
        </Grid>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Grid container py={1} justifyContent={"center"}>
          <div class="text-editor-container">
            <div class="options">
              {/* <!-- Text Format --> */}
              <button
                style={styles.cursorPointer}
                onClick={(e) => {
                  setActive({
                    ...active,
                    boldBtn: !active.boldBtn,
                  });
                }}
                class="option-button format"
              >
                <i
                  id="bold"
                  style={{
                    backgroundColor: active.boldBtn ? "#e9e9ff" : "#fff",
                    ...styles.boldBtn,
                  }}
                  class="fa-solid fa-bold"
                ></i>
              </button>
              <button id="italic" class="option-button format">
                <i class="fa-solid fa-italic"></i>
              </button>
              <button id="underline" class="option-button format">
                <i class="fa-solid fa-underline"></i>
              </button>
              <button id="strikethrough" class="option-button format">
                <i class="fa-solid fa-strikethrough"></i>
              </button>
              <button id="superscript" class="option-button script">
                <i class="fa-solid fa-superscript"></i>
              </button>
              <button id="subscript" class="option-button script">
                <i class="fa-solid fa-subscript"></i>
              </button>

              {/* <!-- List --> */}
              <button id="insertOrderedList" class="option-button">
                <i class="fa-solid fa-list-ol"></i>
              </button>
              <button id="insertUnorderedList" class="option-button">
                <i class="fa-solid fa-list"></i>
              </button>

              {/* <!-- Undo/Redo --> */}
              <button id="undo" class="option-button">
                <i class="fa-solid fa-rotate-left"></i>
              </button>
              <button id="redo" class="option-button">
                <i class="fa-solid fa-rotate-right"></i>
              </button>

              {/* <!-- Link --> */}
              <button
                id="createLink"
                onClick={(e) => {
                  let userLink = prompt("Enter a URL");
                  //if link has http then pass directly else add http
                  if (/http/i.test(userLink)) {
                  } else {
                    userLink = "http://" + userLink;
                  }
                }}
                class="adv-option-button"
              >
                <i class="fa-solid fa-link"></i>
              </button>
              <button id="unlink" class="option-button">
                <i class="fa-solid fa-unlink"></i>
              </button>

              {/* <!-- Alignment --> */}

              <button
                id="justifyLeft"
                class="option-button align"
                onClick={(e) => {
                  let alreadyActive = false;
                  if (active.justifyLeft) {
                    e.target.style.backGroundColor = "#ffffff";
                    alreadyActive = true;
                  }

                  setActive({
                    ...active,
                    // justifyLeft:true,
                    justifyCenter: false,
                    justifyRight: false,
                    justifyFull: false,
                  });
                  if (!alreadyActive) {
                    e.target.style.backGroundColor = "#e9e9ff";
                    setActive({
                      ...active,
                      justifyLeft: true,
                      justifyCenter: false,
                      justifyRight: false,
                      justifyFull: false,
                    });
                  }
                }}
              >
                <i class="fa-solid fa-align-left"></i>
              </button>
              <button id="justifyCenter" class="option-button align">
                <i class="fa-solid fa-align-center"></i>
              </button>
              <button id="justifyRight" class="option-button align">
                <i class="fa-solid fa-align-right"></i>
              </button>
              <button id="justifyFull" class="option-button align">
                <i class="fa-solid fa-align-justify"></i>
              </button>
              <button id="indent" class="option-button spacing">
                <i class="fa-solid fa-indent"></i>
              </button>
              <button id="outdent" class="option-button spacing">
                <i class="fa-solid fa-outdent"></i>
              </button>

              {/* <!-- Headings --> */}
              <select id="formatBlock" class="adv-option-button">
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="H5">H5</option>
                <option value="H6">H6</option>
              </select>

              {/* <!-- Font --> */}
              <select id="fontName" class="adv-option-button">
                {fontList.map((font) => (
                  <option value={font}>{font}</option>
                ))}
              </select>
              <select id="fontSize" value={3} class="adv-option-button">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>

              {/* <!-- Color --> */}
              <div class="input-wrapper">
                <input
                  type="color"
                  id="foreColor"
                  class="adv-option-button"
                  onChange={(e) => {
                    setActive({
                      ...active,
                      fontColor: e.target.value,
                    });
                  }}
                />
                <label for="foreColor">Font Color</label>
              </div>
              <div class="input-wrapper">
                <input
                  type="color"
                  id="backColor"
                  class="adv-option-button"
                  onChange={(e) => {
                    setActive({
                      ...active,
                      highlightColor: e.target.value,
                    });
                  }}
                />
                <label for="backColor">Highlight Color</label>
              </div>
            </div>
            <Grid
              container
              sx={{
                background:
                  objText?.strImgPath && `url(${objText?.strImgPath})`,
                ...styles.viewBox,
              }}
              mt={5}
              p={2}
            >
              <Grid item xs="12">
                <Typography
                  sx={{
                    ...objText.defaultStyle,
                    ...objText[objText.onStyleKey]?.style,
                  }}
                >
                  {objText[objText?.onStyleKey] &&
                    objText[objText?.onStyleKey][lang]}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TextEditor;
