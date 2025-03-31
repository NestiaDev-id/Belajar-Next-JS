import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss"; // Import CSS module for styling

const LoginViews = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    push("/products"); // Menggunakan router.push untuk navigasi
  };
  return (
    <div className={styles.login}>
      <h1 className="big">Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: "red", fontSize: "12px" }}>
        Belum punya akun? <Link href="/auth/register">Register</Link>
      </p>
      {/* Lupa password tailwind */}
      <p className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
        Lupa Password?
      </p>
    </div>
  );
};

export default LoginViews;
