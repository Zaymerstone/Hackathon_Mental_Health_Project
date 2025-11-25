// src/AppRouter.jsx
import React, { useMemo, Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerFactory } from "./routes/routerFactory.js";
import { store } from "./store/store.js";

// Lazy load pages & layouts
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const StudentDashboard = lazy(() => import("./pages/student/Dashboard.jsx"));
const StudentProfile = lazy(() => import("./pages/student/Profile.jsx"));

const HelpDashboard = lazy(() => import("./pages/help-seeker/Dashboard.jsx"));
const HelpMatching = lazy(() =>
  import("./pages/help-seeker/HelpSeekerMatching.jsx")
);

const ChatSession = lazy(() => import("./pages/chat/ChatSession.jsx"));
const ChatSummary = lazy(() => import("./pages/chat/ChatSummary.jsx"));

const AuthenticatedLayout = lazy(() =>
  import("./layouts/AuthenticatedLayout.jsx")
);
const GuestLayout = lazy(() => import("./layouts/GuestLayout.jsx"));

// Map placeholder strings to actual components
const componentMap = {
  Home,
  Login,
  Register,
  NotFound,
  StudentDashboard,
  StudentProfile,
  HelpDashboard,
  HelpMatching,
  ChatSession,
  ChatSummary,
  AuthenticatedLayout,
  GuestLayout,
};

export default function AppRouter() {
  const router = useMemo(() => {
    const routes = routerFactory(store);

    // replace string placeholders with actual components
    const replaceElements = (routes) =>
      routes.map((route) => {
        const newRoute = { ...route };
        if (typeof newRoute.element === "string") {
          newRoute.element = React.createElement(
            componentMap[newRoute.element]
          );
        }
        if (newRoute.children) {
          newRoute.children = replaceElements(newRoute.children);
        }
        return newRoute;
      });

    return createBrowserRouter(replaceElements(routes));
  }, [store]);

  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
