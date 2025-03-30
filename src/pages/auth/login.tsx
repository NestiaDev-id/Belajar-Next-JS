import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.css"; // Import CSS module for styling

function loginPage() {
  const { push } = useRouter();

  const handleLogin = () => {
    push("/products"); // Menggunakan router.push untuk navigasi
  };

  return (
    <div className={styles.login}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <p>
        Belum punya akun? <Link href="/auth/register">Register</Link>
      </p>
    </div>
  );
}

export default loginPage;
