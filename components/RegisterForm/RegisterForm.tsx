"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { registerSchema } from "@/schemas/auth";
import { RegisterRequest } from "@/types/auth";
import { registerUser } from "@/services/auth";
import css from "../LoginForm/LoginForm.module.css";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
    defaultValues: { userName: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterRequest) => {
    try {
      setServerError("");
      await registerUser(values);
      onSuccess?.();
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setServerError("This email is already registered");
      } else {
        setServerError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div>
      <h2 className={css.title}>Registration</h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following
        information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
        <div className={css.field}>
          <div className={css.inputWrap}>
            <input
              id="userName"
              type="text"
              placeholder="Name"
              className={css.input}
              {...register("userName")}
            />
            <label htmlFor="userName" className={css.label}>
              Name
            </label>
          </div>
          {errors.userName && (
            <p className={css.error}>{errors.userName.message}</p>
          )}
        </div>

        <div className={css.field}>
          <div className={css.inputWrap}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={css.input}
              {...register("email")}
            />
            <label htmlFor="email" className={css.label}>
              Email
            </label>
          </div>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.field}>
          <div className={css.passwordWrap}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={css.input}
              {...register("password")}
            />
            <label htmlFor="password" className={css.label}>
              Password
            </label>
            <button
              type="button"
              className={css.eye}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use
                  href={`/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`}
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        {serverError && <p className={css.error}>{serverError}</p>}

        <button type="submit" className={css.submit} disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}