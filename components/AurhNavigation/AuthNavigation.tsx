'use client'
import css from "./AuthNavigation.module.css";
import Link from "next/link";

const AuthNavigation = () => {
    
return isAuthenticated ? (
    <>
 <li className={css.navigationItem}>
  <Link href="/Favorites" prefetch={false} className={css.navigationLink}>
    Favorites
  </Link>
</li>



<li className={css.navigationItem}>
  <p className={css.userEmail}>{user?.email}</p>
  <button className={css.logoutButton} onClick={handleLogout}>
    Logout
  </button>
</li>
</>
) : (
  <> 
<li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
    Sign up
  </Link>
</li>
</>
);
};

export default AuthNavigation;