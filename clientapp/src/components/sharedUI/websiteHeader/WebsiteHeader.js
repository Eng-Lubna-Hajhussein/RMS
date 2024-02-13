import React, { useContext, useState } from "react";
import { AppBar, CssBaseline } from "@mui/material";
import DrawerNav from "./DrawerNav/DrawerNav";
import UpperToolbar from "./UpperToolbar/UpperToolbar";
import LowerToolbar from "./LowerToolbar/LowerToolbar";

const styles = {
  appBar: {
    boxShadow: "none",
  },
};

function WebsiteHeader({
  jsnSystemContact,
  navList,
  lang,
  editable,
  onSaveUpperHeader,
  adminNavList,
  intCartProduct,
  userImg,
  userName,
  blnUserLogin,
  systemPath,
  userNavList,
  customerEditMode,
  websiteLogo
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={styles.appBar} p={0} m={0}>
        <UpperToolbar
          jsnSystemContact={jsnSystemContact}
          onSaveUpperHeader={onSaveUpperHeader}
          lang={lang}
          editable={editable}
          userImg={userImg}
          userName={userName}
          blnUserLogin={blnUserLogin}
          userNavList={userNavList}
          systemPath={systemPath}
        />
        <LowerToolbar
          navList={navList}
          lang={lang}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          editable={editable}
          intCartProduct={intCartProduct}
          adminNavList={adminNavList}
          customerEditMode={customerEditMode}
          websiteLogo={websiteLogo}
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
