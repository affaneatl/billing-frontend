import * as React from "react";
import PropTypes from "prop-types";
import { Paper, Tabs, Tab, Typography, Box, Button, Fade } from "@mui/material";
import Loader from "../components/Loader";
import { LogoutOutlined } from "@mui/icons-material";
const Billing = React.lazy(() => import("../pages/billing/Billing"));
const Products = React.lazy(() => import("../pages/products/Products"));
const Customers = React.lazy(() => import("../pages/customers/Customers"));
const Sales = React.lazy(() => import("../pages/sales/Sales"));
const About = React.lazy(() => import("../pages/about/About"));
function TabPanel(props) {
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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

export default function Layout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Suspense fallback={<Loader />}>
      <Box>
        <Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              background: "#f5f9f0",
              // flexDirection: "column",
              // justifyContent: "space-between",
              // alignItems: "space-between",
            }}
          >
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label="NEW BILL"
                {...a11yProps(0)}
              />
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label="SALES"
                {...a11yProps(1)}
              />
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label="CUSTOMERS"
                {...a11yProps(2)}
              />
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label="ITEMS"
                {...a11yProps(3)}
              />
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label="ABOUT"
                {...a11yProps(4)}
              />
              <Button
                startIcon={<LogoutOutlined />}
                variant="outlined"
                color="error"
                sx={{
                  ml: "auto",
                  mr: 2,
                  height: 30,
                  my: "auto",
                  borderRadius: 10,
                }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                LOGOUT
              </Button>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <React.Suspense fallback={<Loader />}>
              <Paper sx={{ minHeight: "93vh", bgcolor: "#e2ffff" }}>
                <Billing />
              </Paper>
            </React.Suspense>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper sx={{ padding: 2, bgcolor: "#e2ffff", minHeight: "93vh" }}>
              <Sales />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper sx={{ padding: 2, bgcolor: "#e2ffff", minHeight: "93vh" }}>
              <Customers />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Paper sx={{ padding: 2, bgcolor: "#e2ffff", minHeight: "93vh" }}>
              <Products />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Paper sx={{ p: 2, bgcolor: "#e2ffff", minHeight: "93vh" }}>
              <About />
            </Paper>
          </TabPanel>
        </Box>
      </Box>
    </React.Suspense>
  );
}
