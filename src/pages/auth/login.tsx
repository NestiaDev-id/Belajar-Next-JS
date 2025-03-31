import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginViews from "@/views/auth/login";

function loginPage() {
  return (
    <>
      <LoginViews />
    </>
  );
}

export default loginPage;
