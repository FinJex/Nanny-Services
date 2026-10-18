import * as Yup from "yup";

export const appointmentSchema = Yup.object().shape({
  address: Yup.string()
    .trim()
    .min(3, "Address is too short")
    .required("Address is required"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Use format +380XXXXXXXXX")
    .required("Phone is required"),
  childAge: Yup.string()
    .matches(/^\d{1,2}$/, "Enter age as a number")
    .required("Child's age is required"),
  time: Yup.string().required("Meeting time is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  parentName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  comment: Yup.string()
    .trim()
    .min(5, "Comment is too short")
    .required("Comment is required"),
});