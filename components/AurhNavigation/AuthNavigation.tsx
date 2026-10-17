"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const closeLogin = useCallback(() => setIsLoginOpen(false), []);
  const closeRegister = useCallback(() => setIsRegisterOpen(false), []);

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
        <Modal onClose={closeRegister} height="580px">
          <RegisterForm onSuccess={closeRegister} />
        </Modal>
      )}
    </>
  );
}