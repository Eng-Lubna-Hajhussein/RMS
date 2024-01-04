import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useForm,
  Box,
  FormField,
  Button,
  Typography,
  Grid,
  FileUploader,
  Note,
  Icon,
  List,
} from "@cbmisorg/client-app";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as appVariables from "../../../appHelper/appVariables";
import * as appFunctions from "../../../appHelper/appFunctions";

const style = {
  box: {
    height: "fit-content",
    background: "#ffffff",
    width: "100% !important",
    borderRadius: "30px !important",
  },
  fullHeight: {
    height: "100%",
  },
  container: {
    position: "relative",
    height: "fit-content",
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
  },
};

export default function AddTab({ addTabOpen, setAddTabOpen, objTabs,funAddTab }) {
  const tabsAssets = appVariables.objTabsAssets;
  const optionsRef = useRef();
  const options = useMemo(() => {
    return appVariables.tabsOptions.filter(
      (tab) => !Object.keys(objTabs.tabsContent).includes(`${tab.key}`)
    );
  }, [objTabs]);
  const [selectedTab, setSelectedTab] = useState({bigID:options[0]?.key,strName:options[0]?.value});
  useEffect(()=>{
    setSelectedTab({bigID:options[0]?.key,strName:options[0]?.value});
  },[options])

  return (
    <React.Fragment>
      <Modal
        open={addTabOpen}
        eventClose={() => {
          setAddTabOpen(false);
        }}
        size="lg"
      >
        <ModalHeader />
        <ModalBody>
          <Grid
            container
            justify={"center"}
            alignItems={"flex-start"}
            alignSelf={"flex-start"}
            sx={style.container}
          >
            <Grid
              item
              lg="10"
              xs={"12"}
              px-4
              alignItems={"flex-start"}
              alignSelf={"flex-start"}
            >
              <Box sx={style.box}>
                <Grid
                  container
                  sx={style.fullHeight}
                  justify={"start"}
                  alignItems={"flex-start"}
                  alignSelf={"flex-start"}
                  px-4
                  py-5
                >
                  <Grid item xs="12" pb-5>
                    <Grid container>
                      <Grid item xs={"5"}>
                        <Grid container>
                          <Grid item xs={"12"}>
                            <List
                              ref={optionsRef}
                              icon={"category"}
                              label="Menu Category"
                              defaultValue={options[0]}
                              options={options}
                              onChange={(e) => {
                                setSelectedTab({ bigID: optionsRef.current.key, strName:optionsRef.current.value });
                              }}
                            />
                          </Grid>
                          <Grid item xs={"12"}>
                            <Grid
                              container
                              alignItems={"center"}
                              justify={"center"}
                              sx={{
                                background: "transparent",
                                width: "100%",
                                height: "150px !important",
                                border: "2px dashed #e4e4e4",
                                borderRadius: "10px",
                              }}
                            >
                              <Grid item xs={"12"}>
                                {
                                  <img
                                    className="tab-icon"
                                    style={{
                                      filter: 'invert(19%) sepia(91%) saturate(3389%) hue-rotate(339deg) brightness(108%) contrast(91%)'
                                    }}
                                    src={tabsAssets[selectedTab.bigID]?.icon}
                                    height={"100px"}
                                    width={"100px"}
                                  />
                                }
                              </Grid>
                              <Grid item xs={"12"}>
                                <Typography as={"caption"}>
                                  Category Icon
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={"7"}>
                        <Grid item xs={"12"}>
                          <Grid
                            container
                            alignItems={"center"}
                            justify={"center"}
                            sx={{
                              background: "transparent",
                              width: "100%",
                              height: "210px !important",
                              border: "2px dashed #e4e4e4",
                              borderRadius: "10px",
                            }}
                          >
                            <Grid item xs={"12"}>
                              <img
                                src={tabsAssets[selectedTab.bigID]?.img}
                                height={"160px"}
                                width={"180px"}
                              />
                            </Grid>
                            <Grid item xs={"12"}>
                              <Typography as={"caption"}>
                                Category Image
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs="12"
                    alignItems={"flex-start"}
                    alignSelf={"flex-start"}
                    justify={'end'}
                  >
                    <Button
                      mode="link"
                      className="header-nav-002"
                      onClick={() => {
                        funAddTab(selectedTab);
                        setAddTabOpen(false);
                      }}
                      label={
                        <Typography className="animated-btn-002">
                          Save
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
