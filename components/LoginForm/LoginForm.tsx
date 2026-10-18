"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema} from "@/schemas/auth";
import { LoginRequest } from "@/types/auth";
import { loginUser } from "@/services/auth";
import css from "./LoginForm.module.css";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginRequest) => {
    try {
      setServerError("");
      await loginUser(values);
      onSuccess?.();
    } catch {
      setServerError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
        <div className={css.field}>
          <label htmlFor="email" className={css.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={css.input}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.field}>
          <label htmlFor="password" className={css.label}>
            Password
          </label>
          <div className={css.passwordWrap}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className={css.input}
              {...register("password")}
            />
<button
  type="button"
  className={css.eye}
  onClick={() => setShowPassword((prev) => !prev)}
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  <svg width="20" height="20" aria-hidden="true">
    <use href={`/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`} />
  </svg>
</button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        {serverError && <p className={css.error}>{serverError}</p>}

        <button type="submit" className={css.submit} disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
}