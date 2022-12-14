import { Box, Button, ButtonGroup, Dialog, Grid, Paper } from "@mui/material";
import { Formik } from "formik";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Body from "./Body";

import Final from "./Final";
import Header from "./Header";
import Report from "./components/report/Report";
import { getSchema, validator } from "./Schema";
import { callApi } from "../../reducers/apiSlice";
import {
  PrinterOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";

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
              <Paper outlined sx={{ p: 2, bgcolor: "#e2ffff" }} square>
                <Grid container spacing={2}>
                  <Grid item md={9}>
                    <Header {...props} />
                    <Body />
                  </Grid>
                  <Grid item md={3} sx={{ height: "100%" }}>
                    <Paper sx={{ p: 2, bgcolor: "#f5f9f0" }}>
                      <Final {...props} />
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                        disableElevation
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={
                            <PrinterOutlined style={{ fontSize: 16 }} />
                          }
                          onClick={() => props.handleSubmit()}
                          type="submit"
                          sx={{ mt: 2, borderRadius: 10 }}
                          disabled={
                            !props.values.customerId ||
                            !cart.orderDetailList.length
                          }
                        >
                          SAVE
                        </Button>
                        <Button
                          startIcon={
                            <ReloadOutlined style={{ fontSize: 16 }} />
                          }
                          color="primary"
                          variant="outlined"
                          sx={{ mt: 2 }}
                        >
                          CANCEL
                        </Button>
                        <Button
                          startIcon={<SaveOutlined style={{ fontSize: 16 }} />}
                          color="info"
                          onClick={() => props.handleSubmit()}
                          disabled={!props.values.customerId}
                          type="submit"
                          sx={{ mt: 2, borderRadius: 10 }}
                        >
                          DRAFT
                        </Button>
                      </ButtonGroup>
                    </Paper>
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
