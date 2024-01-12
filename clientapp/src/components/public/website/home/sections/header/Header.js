import React from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { lstWebsiteNav } from "appHelper/appVariables";

function Header({lang,dir,jsnSystemContact}) {
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={lang}
        dir={dir}
        jsnSystemContact={jsnSystemContact}
        navList={lstWebsiteNav}
      />
    </React.Fragment>
  );
}

export default Header;
