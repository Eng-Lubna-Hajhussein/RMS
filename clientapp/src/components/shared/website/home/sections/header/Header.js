import React from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { lstWebsiteNav } from "appHelper/appVariables";

function Header({lang,dir, userImg,
  userName,
  blnUserLogin,
  intCartProduct,
  userNavList,jsnSystemContact,adminNavList,editable,onSaveUpperHeader}) {
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={lang}
        dir={dir}
        jsnSystemContact={jsnSystemContact}
        intCartProduct={intCartProduct}
        navList={lstWebsiteNav}
        editable={editable}
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
