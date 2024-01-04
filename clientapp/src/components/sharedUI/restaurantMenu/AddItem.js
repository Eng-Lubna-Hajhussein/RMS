import {
  Box,
  Modal,
  ModalBody,
  ModalHeader,
  useForm,
  Grid,
  Typography,
  useNavigate,
  Button,
  FormField,
  Alert,
} from "@cbmisorg/client-app";
import React from "react";
import { dictionary } from "../../../appHelper/appLanguage/dictionary";

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

export default function AddItem({
  addItemOpen,
  setAddItemOpen,
  funAddItem,
}) {
  const initialState = {
    appLanguage: "eng",
    validationsMsg: dictionary?.shared?.formValidationsMsg,
    fields: {
      strName: {
        control: "text",
        value: "",
        error: "",
        validations: {
          required: true,
        },
      },
      strDescription: {
        control: "textarea",
        value: "",
        error: "",
        validations: {
          required: true,
        },
      },
      strPrice: {
        control: "text",
        value: "",
        error: "",
        validations: {
          required: true,
        },
      },
    },
  };

  const { controller } = useForm(initialState);

  const funHandleSubmit=()=>{
    if (!controller.isFormValid()) {
      Alert.viewAlert("Invalid Form Values", "error");
      return;
    }
    const { strName, strDescription, strPrice } = controller.getCurrentFormValues();
    funAddItem({strName:strName.trim(),strDescription:strDescription.trim(),strPrice:strPrice.trim()});
    controller.resetForm()
    setAddItemOpen(false);
  }
  return (
    <React.Fragment>
      <Modal
        open={addItemOpen}
        eventClose={() => {
          setAddItemOpen(false);
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
                  <Grid item xs={"6"} py-2>
                    <FormField
                      controller={controller}
                      fieldName="strName"
                      label="Dish Name"
                      icon={"foodBank"}
                      color="#000"
                    />
                  </Grid>
                  <Grid item xs={"6"} py-2>
                    <FormField
                      controller={controller}
                      fieldName="strPrice"
                      label="Dish Price"
                      icon={"priceChange"}
                      color="#000"
                    />
                  </Grid>
                  <Grid item xs={"12"} py-2>
                    <FormField
                      controller={controller}
                      fieldName="strDescription"
                      label="Dish Description"
                      color="#000"
                    />
                  </Grid>
                  <Grid
                    item
                    xs="12"
                    alignItems={"flex-start"}
                    alignSelf={"flex-start"}
                    justify={"end"}
                  >
                    <Button
                      mode="link"
                      className="header-nav-002"
                      onClick={funHandleSubmit}
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
