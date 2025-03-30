import React from "react";
import Link from "next/link";

function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <p>
        Sudah punya akun? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
