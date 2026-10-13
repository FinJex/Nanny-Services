"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  return (
    <>
      <div className={css.wrapper}>
        <button type="button" className={css.loginBtn} onClick={openLogin}>
          Log In
        </button>
      </div>

      {isLoginOpen && (
        <Modal onClose={closeLogin}>
          <LoginForm onSuccess={closeLogin} />
        </Modal>
      )}
    </>
  );
}