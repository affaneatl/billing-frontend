import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Stack,
  TextField,
  Box,
  Dialog,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import { FieldArray } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import ServiceDetails from "../components/service-details/ServiceDetails";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const AddItem = ({ values }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { items = [] } = useSelector(selectApi);
  useEffect(() => {
    setTimeout(
      () =>
        dispatch(
          callApi({
            operationId: `api/courses`,
            output: "items",
          })
        ),
      1000
    );
  }, [dispatch]);

  let alreadySelectedOptions = values.orderDetailList.map((el) => el.id);
  let filterSelectedOptions = items.filter(
    (el) => alreadySelectedOptions.indexOf(el.id) == -1
  );
  const filterOptions = createFilterOptions({
    stringify: ({ masterServiceName, id }) => `${masterServiceName} ${id}`,
  });
  console.log(filterSelectedOptions, alreadySelectedOptions);
  return (
    <Box>
      <Stack direction="row">
        <FieldArray
          name="orderDetailList"
          render={(arrayHelpers) => (
            <Autocomplete
              size="medium"
              disablePortal
              noOptionsText="No Match Found"
              filterOptions={filterOptions}
              id="id"
              sx={{ width: 300 }}
              options={filterSelectedOptions}
              autoHighlight
              blurOnSelect
              clearOnBlur={true}
              // filterSelectedOptions
              // autoSelect
              getOptionLabel={(option) => option.masterServiceName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label="Select an item"
                  inputProps={{
                    ...params.inputProps,
                  }}
                  placeholder="Add Service by Id/Name"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.masterServiceName} ({option.id})
                </Box>
              )}
              onChange={(e, value) =>
                value?.id &&
                arrayHelpers.push({
                  ...value,
                  ...{ quantity: 1 },
                  ...{ discountAmount: 0 },
                })
              }
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default AddItem;
