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
const getLinkClass = (href: string) =>
  `${css.navigation} ${pathname === href ? css.active : ""}`;
return (
  <header className={`${css.header} ${isHome ? css.headerHome : css.headerGray}`}>
    <Link className={css.logo} href="/">
      Nanny.Services
    </Link>
    <nav className={css.nav}>
      <Link href="/" className={getLinkClass("/")}>
        Home
      </Link>
      <Link href="/nannies" className={getLinkClass("/nannies")}>
        Nannies
      </Link>
      {user && (
        <Link href="/favorites" className={getLinkClass("/favorites")}>
          Favorites
        </Link>
      )}
    </nav>
    <AuthNavigation />
  </header>
);
}

