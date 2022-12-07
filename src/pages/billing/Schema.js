import * as Yup from "yup";
const getSchema = (model = {}) => {
  const {
    orderDetailList = [],
    total = 0,
    discount = 0,
    advance = 0,
    customerId = "6379aab9a1dee234eb1831cf",
  } = model;

  return {
    orderDetailList,
    total,
    discount,
    advance,
    customerId,
  };
};

const validator = Yup.object().shape({
  // date: Yup.string(),
  // orgName: Yup.string(),
});

export { getSchema, validator };
