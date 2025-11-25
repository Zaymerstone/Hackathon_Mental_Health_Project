// src/routes/routerFactory.js
import { URLS } from "./urls.js";
import { userLoader } from "./loaders/userLoader.js";

// Layouts
import GuestLayout from "../layouts/GuestLayout.jsx";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.jsx";

// Pages (lazy or normal imports, up to you)
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import StudentDashboard from "../pages/student/Dashboard.jsx";
import StudentProfile from "../pages/student/Profile.jsx";
import HelpDashboard from "../pages/help-seeker/Dashboard.jsx";
import HelpMatching from "../pages/help-seeker/HelpSeekerMatching.jsx";
import ChatSession from "../pages/chat/ChatSession.jsx";
import ChatSummary from "../pages/chat/ChatSummary.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routerFactory = (store) => [
  // =========================================
  // PUBLIC ROUTES (guests only)
  // =========================================
  {
    path: URLS.HOME,
    element: <GuestLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: URLS.LOGIN, element: <Login /> },
      { path: URLS.REGISTER, element: <Register /> },
    ],
  },

  // =========================================
  // AUTHENTICATED ROUTES (logged-in only)
  // =========================================
  {
    path: "/",
    element: <AuthenticatedLayout />,
    loader: () => userLoader(store), // protects everything inside
    children: [
      { path: URLS.STUDENT_DASHBOARD, element: <StudentDashboard /> },
      { path: URLS.STUDENT_PROFILE, element: <StudentProfile /> },
      { path: URLS.HELP_DASHBOARD, element: <HelpDashboard /> },
      { path: URLS.HELP_MATCHING, element: <HelpMatching /> },
      { path: URLS.CHAT_SESSION, element: <ChatSession /> },
      { path: URLS.SESSION_SUMMARY, element: <ChatSummary /> },
    ],
  },

  // 404 fallback
  { path: URLS.NOT_FOUND, element: <NotFound /> },
];
