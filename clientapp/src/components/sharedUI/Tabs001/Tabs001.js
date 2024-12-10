import * as React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Tabs, Tab } from "@basetoolkit/ui";
import { tabClasses,svgIconClasses } from "@basetoolkit/ui/classes";

const styles = {
  box: {
    width: "100%",
  },
  tab: {
    width: "fit-content",
    maxWidth: "fit-content",
    minWidth: "200px",
  },
};

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
        <Box sx={{ py: 3 }}>
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

export default function Tabs001({ tabsContent, justifyContent }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.box} width={"100%"}>
      <Box>
        <Grid
          container
          justifyContent={justifyContent ? justifyContent : "center"}
        >
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            variant="standard"
            aria-label="full width tabs example"
            value={value}
            onChange={handleChange}
            sx={{
              [`& .${tabClasses.selected}`]:{
                [`& .${svgIconClasses.root}`]:{
                  fill:"primary"
                }
              }
            }}
          >
            {tabsContent.map(({ tabLabel }, index) => (
              <Tab
                iconPosition="start"
                sx={styles.tab}
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
