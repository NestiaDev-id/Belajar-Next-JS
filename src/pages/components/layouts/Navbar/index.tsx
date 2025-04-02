import React from "react";
import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data }: any = useSession();
  console.log("isi data", data);
  return (
    <div className={styles.navbar}>
      <div className="big">Navbar</div>
      <div className={styles.profile}>
        {data && data.user.image && (
          <img className={styles.avatar} src={data.user.image} />
        )}
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
