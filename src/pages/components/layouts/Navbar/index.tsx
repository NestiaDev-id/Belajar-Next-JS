import React from "react";
import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div className="big">Navbar</div>
      <div className="">
        {data && data.user.fullname}
        {data ? (
          <button onClick={() => signOut()} className={styles.button}>
            Sign Out
          </button>
        ) : (
          <button onClick={() => signIn()} className={styles.button}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
