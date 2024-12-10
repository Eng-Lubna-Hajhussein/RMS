import {
  AccountCircle,
  Block,
  Checklist,
  Close,
  LiveHelp,
  LocationOn,
  Message,
  NoAccounts,
  RemoveCircle,
  Reviews,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  useTheme,
  useMediaQueryMatch,
} from "@basetoolkit/ui";
import Tabs001 from "components/sharedUI/Tabs001/Tabs001";
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Location from "./Location/Location";
import Review from "./Review/Review";
import Activities from "./Activities/Activities";
import { CtrlUsers } from "../controller/CtrlUsers";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  tabLabel: {
    textTransform: "capitalize",
    fontSize: "14px",
  },
  dialogContent: {
    py: "0",
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  userName: {
    fontSize: "18px",
    fontWeight: "800",
    textTransform: "capitalize",
    color: "#000",
  },
  unBanIcon: {
    cursor: "pointer",
    color: "red",
  },
  banIcon: {
    cursor: "pointer",
    color: "red",
  },
  deactivateIcon: {
    cursor: "pointer",
    color: "gray",
  },
  activateIcon: {
    cursor: "pointer",
    color: "gray",
  },
  messageIcon: {
    cursor: "pointer",
    color: "blue",
  },
  closeIcon: {
    cursor: "pointer",
  },
  divider: {
    borderColor: "secondary",
    borderWidth: "1px",
  },
};

function UserDetails({
  open,
  handleClose,
  users,
  user,
  setUsers,
  lang,
  dir,
  onSave,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));

  const tabsContent = [
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <LiveHelp fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={styles.tabLabel}>
              {dictionary.users.personalInfo[lang]}
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <PersonalInfo user={user} lang={lang} dir={dir} />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <Checklist fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={styles.tabLabel}>
              {dictionary.users.activities[lang]}
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <Activities user={user} lang={lang} />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <Reviews fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={styles.tabLabel}>
              {dictionary.users.review[lang]}
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <Review bigUserID={user?.bigUserID} lang={lang} />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}>
          <Grid item px={1}>
            <LocationOn fontSize="small" />
          </Grid>
          <Grid item>
            <Typography sx={styles.tabLabel}>
              {dictionary.users.location[lang]}
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
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1}>
            <Grid
              item
              xs="12"
              px={isExtraSmallAndDown?0:"30px"}
              container
              mx={0}
            >
              <Grid
                container
                item
                xs={10}
                sx={styles.fitContentHeight}
                alignItems={"center"}
                alignContent={"center"}
                justifyContent={"start"}
                p={0} m={0}
              >
                <Grid
                  item
                  pr={dir === "ltr" ? 1 : 0}
                  pl={dir === "rtl" ? 1 : 0}
                  alignContent={"start"}
                  alignItems={"start"}
                  sx={styles.fitContentHeight}
                >
                  <Avatar
                    variant="rounded"
                    src={user?.strImgPath}
                    height="50px"
                    width="50px"
                  />
                </Grid>
                {isLoading && <Typography>Loading...</Typography>}
                {!isLoading && (
                  <Grid
                    item
                    container
                    xs="10" m={0} p={0} 
                    alignContent={"center"}
                    alignItems={"center"}
                    sx={styles.fitContentHeight}
                  >
                    <Grid item xs="12">
                      <Typography sx={styles.userName}>
                        {user?.jsnFullName[lang]}
                      </Typography>
                    </Grid>
                    <Grid item xs="12" container p={0} m={0}>
                      <Grid
                        item
                        pr={dir === "ltr" ? 2 : 0}
                        pl={dir === "rtl" ? 2 : 0}
                      >
                        {user?.blnIsDeleted && (
                          <Tooltip title="unban user">
                            <Block
                              fontSize="small"
                              sx={styles.unBanIcon}
                              onClick={() => {
                                CtrlUsers.unBanCustomerHandler({
                                  bigUserID: user?.bigUserID,
                                  setIsLoading: setIsLoading,
                                  user: user,
                                  setUsers: setUsers,
                                  users: users,
                                  handleClose: handleClose,
                                });
                              }}
                            />
                          </Tooltip>
                        )}
                        {!user?.blnIsDeleted && (
                          <Tooltip title="ban user">
                            <RemoveCircle
                              fontSize="small"
                              sx={styles.banIcon}
                              onClick={() => {
                                CtrlUsers.banCustomerHandler({
                                  bigUserID: user?.bigUserID,
                                  setIsLoading: setIsLoading,
                                  user: user,
                                  setUsers: setUsers,
                                  users: users,
                                  handleClose: handleClose,
                                });
                              }}
                            />
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid
                        item
                        pr={dir === "ltr" ? 2 : 0}
                        pl={dir === "rtl" ? 2 : 0}
                      >
                        {user?.blnIsActive && (
                          <Tooltip title="deactivate user">
                            <AccountCircle
                              onClick={() => {
                                CtrlUsers.deactivateCustomerHandler({
                                  bigUserID: user?.bigUserID,
                                  setIsLoading: setIsLoading,
                                  user: user,
                                  setUsers: setUsers,
                                  users: users,
                                  handleClose: handleClose,
                                });
                              }}
                              fontSize="small"
                              sx={styles.deactivateIcon}
                            />
                          </Tooltip>
                        )}
                        {!user?.blnIsActive && (
                          <Tooltip title="activate user">
                            <NoAccounts
                              onClick={() => {
                                CtrlUsers.activateCustomerHandler({
                                  bigUserID: user?.bigUserID,
                                  setIsLoading: setIsLoading,
                                  user: user,
                                  setUsers: setUsers,
                                  users: users,
                                  handleClose: handleClose,
                                });
                              }}
                              fontSize="small"
                              sx={styles.activateIcon}
                            />
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid
                        item
                        pr={dir === "ltr" ? 2 : 0}
                        pl={dir === "rtl" ? 2 : 0}
                      >
                        <Tooltip title="message user">
                          <Message fontSize="small" sx={styles.messageIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs="2" py={2} container justifyContent={"end"}>
                <Close sx={styles.closeIcon} onClick={handleClose} />
              </Grid>
            </Grid>
            <Grid
              item
              xs="12"
              px={isExtraSmallAndDown?0:"30px"}
              mx={0}
            >
              <Divider sx={styles.divider} />
            </Grid>
            <Grid item xs="12" container p={0} m={0}>
              <Tabs001
                tabsContent={tabsContent}
                tabsMode="filled"
                justifyContent={"center"}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default UserDetails;
