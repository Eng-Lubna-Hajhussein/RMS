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
  websiteLogo,
  dir
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
          dir={dir}
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
          dir={dir}
          userName={userName}
          blnUserLogin={blnUserLogin}
          userNavList={userNavList}
          userImg={userImg}
        />
      </AppBar>
      <DrawerNav
        openDrawer={openDrawer}
        navList={navList}
        setOpenDrawer={setOpenDrawer}
        lang={lang}
        editable={editable}
        jsnSystemContact={jsnSystemContact}
        onSaveUpperHeader={onSaveUpperHeader}
        userImg={userImg}
        dir={dir}
        userName={userName}
        blnUserLogin={blnUserLogin}
        userNavList={userNavList}
        systemPath={systemPath}
        websiteLogo={websiteLogo}
      />
    </React.Fragment>
  );
}

export default WebsiteHeader;
