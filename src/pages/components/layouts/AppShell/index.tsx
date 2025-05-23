import React from "react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

function AppShell(props: AppShellProps) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {/* <Navbar /> */}
      {children}
      {/* <footer className="footer">Footer</footer> */}
    </main>
  );
}

export default AppShell;
