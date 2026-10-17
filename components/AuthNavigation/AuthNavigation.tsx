"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { logoutUser } from "@/services/auth";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const closeLogin = useCallback(() => setIsLoginOpen(false), []);
  const closeRegister = useCallback(() => setIsRegisterOpen(false), []);

  const handleLogout = async () => {
    await logoutUser();
  };

  if (isLoading) {
    return null;
  }

  if (user) {
  return (
    <div className={css.wrapper}>
      <div className={css.user}>
        <span className={css.avatar}>
          <svg width="40" height="40" aria-hidden="true">
            <use href="/sprite.svg#icon-avatar" />
          </svg>
        </span>
        <span className={css.userName}>{user.displayName}</span>
      </div>
      <button type="button" className={css.loginBtn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
  }

  return (
    <>
      <div className={css.wrapper}>
        <button
          type="button"
          className={css.loginBtn}
          onClick={() => setIsLoginOpen(true)}
        >
          Log In
        </button>
        <button
          type="button"
          className={css.registerBtn}
          onClick={() => setIsRegisterOpen(true)}
        >
          Registration
        </button>
      </div>

      {isLoginOpen && (
        <Modal onClose={closeLogin}>
          <LoginForm onSuccess={closeLogin} />
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal onClose={closeRegister} height="620px">
          <RegisterForm onSuccess={closeRegister} />
        </Modal>
      )}
    </>
  );
}