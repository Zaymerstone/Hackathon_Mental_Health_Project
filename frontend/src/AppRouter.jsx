// src/AppRouter.jsx
import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerFactory } from "./routes/routerFactory.jsx";
import { store } from "./store/store.js";

export default function AppRouter() {
  const router = createBrowserRouter(routerFactory(store));

  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
