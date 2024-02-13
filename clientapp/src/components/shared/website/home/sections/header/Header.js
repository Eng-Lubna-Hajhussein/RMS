import React from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { lstWebsiteNav } from "appHelper/appVariables";

function Header({
  lang,
  dir,
  userImg,
  userName,
  blnUserLogin,
  intCartProduct,
  websiteLogo,
  customerEditMode,
  navList,
  systemPath,
  userNavList,
  jsnSystemContact,
  adminNavList,
  editable,
  onSaveUpperHeader,
}) {
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={lang}
        dir={dir}
        systemPath={systemPath}
        jsnSystemContact={jsnSystemContact}
        intCartProduct={intCartProduct}
        customerEditMode={customerEditMode}
        navList={navList}
        editable={editable}
        websiteLogo={websiteLogo}
        onSaveUpperHeader={onSaveUpperHeader}
        adminNavList={adminNavList}
        userImg={userImg}
        userName={userName}
        blnUserLogin={blnUserLogin}
        userNavList={userNavList}
      />
    </React.Fragment>
  );
}

export default Header;
