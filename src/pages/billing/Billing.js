import { Box, Button, Dialog, Grid, Paper } from "@mui/material";
import { Formik } from "formik";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Body from "./Body";

import Final from "./Final";
import Header from "./Header";
import Report from "./components/report/Report";
import { getSchema, validator } from "./Schema";
import "./style.css";
import { callApi } from "../../reducers/apiSlice";

const Billing = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <Report setOpen={setOpen} />
      </Dialog>

      <Formik
        initialValues={getSchema({})}
        validationSchema={validator}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            callApi({
              operationId: "api/orders",
              output: "orderSaved",
              parameters: {
                method: "POST",
                body: JSON.stringify(getSchema({ ...values, ...cart })),
              },
            })
          );
          setOpen(!open);
        }}
      >
        {(props) => {
          return (
            <Box>
              <Header {...props} />
              <Paper
                elevation={1}
                sx={{ p: 2, mt: 2, background: "#F5FFFA" }}
                square
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={9}>
                    <Body />
                  </Grid>
                  <Grid item md={3} sx={{ mt: 2 }}>
                    <Final {...props} />
                    <Button
                      variant="contained"
                      onClick={() => props.handleSubmit()}
                      type="submit"
                      sx={{ mt: 2 }}
                    >
                      SAVE AND PRINT
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          );
        }}
      </Formik>
    </>
  );
};

export default Billing;
