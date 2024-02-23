import { objAppActions } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlTables } from "./controller/CtrlTables";
import EditTable from "./editTable/EditTable";
import AddTable from "./addTable/AddTable";
import TablesInfo from "./tablesInfo/TablesInfo";
import { ctrlRouteAdmin } from "../controller/CtrlRouteAdmin";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "../uploadLogo/UploadLogo";
import SharedLink from "../sharedLink/SharedLink";

const styles = {
  container: {
    marginY: { lg: "50px", xs: "20px" },
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "250px",
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
  form: {
    width: "100%",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  tableContainer: {
    marginBottom: "50px",
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
  tablePagination: {
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
      textAlign: "center",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
    },
  },
  fitContentHeight: {
    height: "fit-content",
  },
  tableID: {
    fontSize: "18px",
    fontWeight: "800",
  },
  seatsNum: {
    fontSize: "18px",
    fontWeight: "800",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  viewBtnLabel: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
};

function Tables() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [tables, setTables] = useState([]);
  const { systemID, systemName } = useParams();
  const [tableOnAction, setTableOnAction] = useState();
  const [openEditTable, setOpenEditTable] = useState(false);
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);

  const handleFreeTable = (table,index) => {
    ctrlTables.freeTable({
      bigTableID: table.bigTableID,
      index: index,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      tables: tables,
      setTables: setTables,
    });
  }

  const handleDeleteTable = (table)=>{
    ctrlTables.deleteTable({
      bigTableID: table.bigTableID,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      setTables: setTables,
      tables: tables,
    });
  }

  const handleEditTable = (table)=>{
    setTableOnAction(table);
    setOpenEditTable(true);
  }


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
  const [isLoading, setIsLoading] = useState(false);
  const instalData = async () => {
    setIsLoading(true);
    const systemTables = await findTables(appState.systemInfo.bigSystemID);
    if (systemTables.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const actionItemNavList = [
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "حذف" } },

    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    ctrlTables.addTable({
      appState,
      isLoading,
      setIsLoading,
      formData,
      tables,
      setTables,
      reset,
    });
  };

  const columns = [
    "Table ID",
    " Seats Number",
    "Price Per Hour",
    "Status",
    "Reservation Info",
    "Actions",
  ];

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
        websiteLogo={appState?.systemInfo?.strLogoPath}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item lg="10" xs="12" px={2} container>
            <AddTable
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            trigger={trigger}
            lang={lang}
            dir={dir}
            />
            <TablesInfo
            appState={appState}
            lang={lang}
            dir={dir}
            handleDeleteTable={handleDeleteTable}
            handleEditTable={handleEditTable}
            handleFreeTable={handleFreeTable}
            tables={tables}
            />
          </Grid>
        </Grid>
      )}
      <EditTable
        open={openEditTable}
        handleClose={() => setOpenEditTable(false)}
        table={tableOnAction}
        lang={lang}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        tables={tables}
        setTables={setTables}
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

export default Tables;
