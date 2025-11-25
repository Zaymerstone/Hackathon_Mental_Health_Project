import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
}
