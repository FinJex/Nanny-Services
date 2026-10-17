"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";

export default function Header() {
    const { user } = useAuth();
    const pathname = usePathname();
    const isHome = pathname === "/";
  return (
    <header className={`${css.header} ${isHome ? css.headerHome : css.headerGray}`}>
          <Link className={css.logo} href="/">
          Nanny.Services
    </Link>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/nannies">Nannies</Link>
      {user && <Link href="/favorites">Favorites</Link>}
    </nav>
    <AuthNavigation/>
    </header>
  );
}