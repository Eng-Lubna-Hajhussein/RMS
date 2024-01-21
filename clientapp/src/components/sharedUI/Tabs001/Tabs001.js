import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { AppRegistration } from "@mui/icons-material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabs001({ tabsContent }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{}}>
        <Grid container justifyContent={"center"}>
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            value={value}
            onChange={handleChange}
          >
            {tabsContent.map(({ tabLabel }, index) => (
              <Tab
                iconPosition="start"
                sx={{
                  width: "fit-content",
                  maxWidth: "fit-content",
                  minWidth: "200px",
                }}
                label={tabLabel}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Grid>
      </Box>
      {tabsContent.map(({ content }, index) => (
        <CustomTabPanel value={value} index={index}>
        {content}
      </CustomTabPanel>
      ))}
    </Box>
  );
}