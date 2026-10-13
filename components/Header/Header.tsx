"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import { useIsFetching } from "@tanstack/react-query";
import AuthNavigation from "../AurhNavigation/AuthNavigation";

export default function Header() {
    const pathname = usePathname();
    const isFetching = useIsFetching({ queryKey: ["campers"] });
    const isHome = pathname === "/";
    const forceWhite = isFetching > 0;
  return (
    <header className={`${css.header} ${isHome || forceWhite ? css.headerHome : css.headerGray}`}>
          <Link className={css.logo} href="/" aria-label="TravelTrucks— головна">
          Nanny.Services
    </Link>
    <nav>
      <AuthNavigation/>
    </nav>
    </header>
  );
}