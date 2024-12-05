import React, { useState } from "react";
import { CssBaseline, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import DrawerNav from "./drawerNav/DrawerNav";
import UpperToolbar from "./upperToolbar/UpperToolbar";
import LowerToolbar from "./lowerToolbar/LowerToolbar";

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
  dir,
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <React.Fragment>
      <CssBaseline />
      {!isExtraSmallAndDown && (
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
      )}
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
