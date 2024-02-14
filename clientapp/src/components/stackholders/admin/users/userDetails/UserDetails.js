import {
  AccountBox,
  AccountCircle,
  AppRegistrationSharp,
  Block,
  Checklist,
  Close,
  Delete,
  FoodBank,
  LiveHelp,
  LocationCity,
  LocationOn,
  Message,
  NoAccounts,
  RemoveCircle,
  Reviews,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
  Avatar,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { generateRandomID } from "appHelper/appFunctions";
import { createOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import Tabs001 from "components/sharedUI/Tabs001/Tabs001";
import { AppContext } from "contextapi/context/AppContext";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Location from "./Location/Location";
import Review from "./Review/Review";
import Activities from "./Activities/Activities";
import { CtrlUsers } from "../controller/CtrlUsers";

function UserDetails({ open, handleClose,users, user,setUsers, lang, dir, onSave }) {
  const { appState, appDispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);


  useEffect(() => {
    console.log({ user });
  }, []);

  const tabsContent = [
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <LiveHelp fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
              Personal Info
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <PersonalInfo user={user} lang={lang} />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <Checklist fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
              Activities
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <Activities />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <Reviews fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
              Review
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <Review bigUserID={user?.bigUserID} />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <LocationOn fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
              Location
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <Location userLocation={user?.jsnLocation} />,
    },
  ];

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent sx={{ py: "0" }}>
          <Grid container py={1}>
            <Grid item xs="12" px={3} container mx={0}>
              <Grid
                container
                item
                xs="10"
                sx={{ height: "fit-content" }}
                alignItems={"center"}
                alignContent={"center"}
                justifyContent={"start"}
                py={2}
              >
                <Grid
                  item
                  pr={1}
                  alignContent={"start"}
                  alignItems={"start"}
                  sx={{ height: "fit-content" }}
                >
                  <Avatar
                    variant="rounded"
                    src={user?.strImgPath}
                    height="50px"
                    width="50px"
                  />
                </Grid>
                {isLoading&&<Typography>Loading...</Typography>}
                {!isLoading&&<Grid
                  item
                  container
                  xs="10"
                  alignContent={"center"}
                  alignItems={"center"}
                  sx={{ height: "fit-content" }}
                >
                  <Grid item xs="12">
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "800",
                        textTransform: "capitalize",
                        color: "#000",
                      }}
                    >
                      {user?.jsnFullName[lang]}
                    </Typography>
                  </Grid>
                  <Grid item xs="12" container>
                    <Grid item pr={2}>
                      {user?.blnIsDeleted&&<Tooltip title="unban user">
                        <Block
                          fontSize="small"
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={()=>
                            {CtrlUsers.unBanCustomerHandler({
                              bigUserID:user?.bigUserID,
                              setIsLoading:setIsLoading,
                              user:user,
                              setUsers:setUsers,
                              users:users,
                              handleClose:handleClose
                            })}
                          }
                        />
                      </Tooltip>}
                      {!(user?.blnIsDeleted)&&<Tooltip title="ban user">
                        <RemoveCircle
                          fontSize="small"
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={()=>
                            {CtrlUsers.banCustomerHandler({
                              bigUserID:user?.bigUserID,
                              setIsLoading:setIsLoading,
                              user:user,
                              setUsers:setUsers,
                              users:users,
                              handleClose:handleClose
                            })}
                          }
                        />
                      </Tooltip>}
                    </Grid>
                    <Grid item pr={2}>
                      {user?.blnIsActive&&<Tooltip title="deactivate user">
                        <AccountCircle
                          onClick={()=>
                            {CtrlUsers.deactivateCustomerHandler({
                              bigUserID:user?.bigUserID,
                              setIsLoading:setIsLoading,
                              user:user,
                              setUsers:setUsers,
                              users:users,
                              handleClose:handleClose
                            })}
                          }
                          fontSize="small"
                          sx={{ cursor: "pointer", color: "gray" }}
                        />
                      </Tooltip>}
                      {!(user?.blnIsActive)&&<Tooltip title="activate user">
                        <NoAccounts
                          onClick={()=>
                            {CtrlUsers.activateCustomerHandler({
                              bigUserID:user?.bigUserID,
                              setIsLoading:setIsLoading,
                              user:user,
                              setUsers:setUsers,
                              users:users,
                              handleClose:handleClose
                            })}
                          }
                          fontSize="small"
                          sx={{ cursor: "pointer", color: "gray" }}
                        />
                      </Tooltip>}
                    </Grid>
                    <Grid item pr={2}>
                      <Tooltip title="message user">
                        <Message
                          fontSize="small"
                          sx={{ cursor: "pointer", color: "blue" }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>}
              </Grid>
              <Grid item xs="2" py={2} container justifyContent={"end"}>
                <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
              </Grid>
            </Grid>
            <Grid item xs="12" px={3} mx={0}>
              <Divider sx={{borderColor:App_Second_Color,borderWidth:"1px"}} />
            </Grid>
            <Grid item xs="12" container>
              <Tabs001 tabsContent={tabsContent} tabsMode='filled' justifyContent={"center"} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default UserDetails;
