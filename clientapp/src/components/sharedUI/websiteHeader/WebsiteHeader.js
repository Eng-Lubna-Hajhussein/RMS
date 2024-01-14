import React, { useState } from "react";
import { AppBar, CssBaseline } from "@mui/material";
import DrawerNav from "./drawerNav/DrawerNav";
import UpperToolbar from "./upperToolbar/UpperToolbar";
import LowerToolbar from "./lowerToolbar/LowerToolbar";

const styles = {
  appBar: {
    boxShadow: "none",
  },
};

function WebsiteHeader({ jsnSystemContact, navList, lang }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={styles.appBar} p={0} m={0}>
        <UpperToolbar jsnSystemContact={jsnSystemContact} lang={lang} />
        <LowerToolbar
          navList={navList}
          lang={lang}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      </AppBar>
      <DrawerNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        lang={lang}
      />
    </React.Fragment>
  );
}

export default WebsiteHeader;
