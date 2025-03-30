import React from "react";
import Navbar from "../Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShell(props: AppShellProps) {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
      <footer className="footer">Footer</footer>
    </main>
  );
}

export default AppShell;
