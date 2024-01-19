import React, { useContext, useState } from "react";
import { AppBar, CssBaseline } from "@mui/material";
import DrawerNav from "./drawerNav/DrawerNav";
import UpperToolbar from "./upperToolbar/UpperToolbar";
import LowerToolbar from "./lowerToolbar/LowerToolbar";

const styles = {
  appBar: {
    boxShadow: "none",
  },
};

function WebsiteHeader({ jsnSystemContact, navList, lang, editable,onSaveUpperHeader }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={styles.appBar} p={0} m={0}>
        <UpperToolbar jsnSystemContact={jsnSystemContact} onSaveUpperHeader={onSaveUpperHeader} lang={lang} editable={editable} />
        <LowerToolbar
          navList={navList}
          lang={lang}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          editable={editable}
        />
      </AppBar>
      <DrawerNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        lang={lang}
        editable={editable}
      />
    </React.Fragment>
  );
}

export default WebsiteHeader;
