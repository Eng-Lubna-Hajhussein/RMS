import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import { useNavigate, useParams } from "react-router-dom";
import { findUsers } from "appHelper/fetchapi/tblUser/tblUser";
import UserDetails from "./userDetails/UserDetails";
import UsersInfo from "./usersInfo/UsersInfo";
import { ctrlRouteAdmin } from "../controller/CtrlRouteAdmin";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "../uploadLogo/UploadLogo";
import SharedLink from "../sharedLink/SharedLink";

const styles = {
  container: { lg: { my: "50px" }, xs: { my: "20px" } },
  itemContainer: {
    background: "#f4fcfc",
    height: "140px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  usersNum: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
  columnTablecell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  tableContainer: {
    marginBottom: "50px",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  username: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  userRole: {
    fontSize: "14px",
    fontWeight: "800",
  },
  userEmail: {
    fontSize: "14px",
    fontWeight: "800",
  },
  userAddress: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  activity: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
};

function Users() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [users, setUsers] = useState([]);
  const { systemID, systemName } = useParams();
  const [userOnAction, setUserOnAction] = useState();
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);

  const handleUserDetails = (user) => {
    setUserOnAction(user);
    setOpenUserDetails(true);
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const handleSharedLinkOpen = () => {
    setSharedLinkOpen(true);
  };

  const handleUploadLogoOpen = () => {
    setUploadLogo(true);
  };

  const adminNavList = ctrlRouteAdmin.generateAdminNavList({
    handleSharedLinkOpen: handleSharedLinkOpen,
    handleUploadLogoOpen: handleUploadLogoOpen,
    systemID: systemID,
    systemName: systemName,
  });

  const userNavList = ctrlRouteAdmin.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteAdmin.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });

  const instalData = async () => {
    setIsLoading(true);
    const systemUsers = await findUsers(appState.systemInfo.bigSystemID);
    if (systemUsers.length) {
      const parsedUsers = systemUsers.map((user) => ({
        ...user,
        jsnFullName: JSON.parse(user?.jsnFullName),
        jsnLocation: JSON.parse(user?.jsnLocation),
        jsnAddress: JSON.parse(user?.jsnAddress),
        jsnClientPayment: JSON.parse(user?.jsnClientPayment),
      }));
      setUsers([...parsedUsers]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log({ users });
  }, [users]);

  useEffect(() => {
    instalData();
  }, []);

  const columns = ["Account", "Role", "Email", "Address", "Status", "Activity"];

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item lg={10} xs={12} px={2} container>
            <UsersInfo
              dir={dir}
              handleUserDetails={handleUserDetails}
              lang={lang}
              users={users}
              appState={appState}
            />
          </Grid>
        </Grid>
      )}
      <UserDetails
        open={openUserDetails}
        handleClose={() => setOpenUserDetails(false)}
        user={userOnAction}
        users={users}
        setUsers={setUsers}
        lang={lang}
        dir={dir}
      />
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
      <UploadLogo
        open={uploadLogoOpen}
        handleClose={() => setUploadLogo(false)}
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
      />
      <SharedLink
        open={sharedLinkOpen}
        handleClose={() => setSharedLinkOpen(false)}
      />
    </React.Fragment>
  );
}

export default Users;
