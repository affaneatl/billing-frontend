import * as Yup from "yup";
const getSchema = (model = {}) => {
  const { username = "", password = "" } = model;
  return {
    username,
    password,
  };
};

const validator = Yup.object().shape({
  username: Yup.string().required("username is required").min(4,"Minimum 4 characters"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(1, "Your password must be longer than 5 characters.")
    // .max(25)
    // .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])/,
    //   "Must Contain One Uppercase, One Lowercase"
    // )
    // .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
});

export { getSchema, validator };