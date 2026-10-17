import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required")
});


export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required")
});

export type LoginRequest = Yup.InferType<typeof loginSchema>;

