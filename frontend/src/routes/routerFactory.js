// src/routes/routerFactory.js
import { URLS } from "./urls";
import { userLoader } from "./loaders/userLoader";

// Lazy imports can stay, but do NOT include JSX here
export const routerFactory = (store) => [
  {
    path: URLS.HOME,
    element: "GuestLayout", // placeholder string, will map in AppRouter.jsx
    children: [
      { index: true, element: "Home" },
      { path: URLS.LOGIN, element: "Login" },
      { path: URLS.REGISTER, element: "Register" },
    ],
  },
  {
    path: "/",
    element: "AuthenticatedLayout",
    loader: () => userLoader(store),
    children: [
      { path: URLS.STUDENT_DASHBOARD, element: "StudentDashboard" },
      { path: URLS.STUDENT_PROFILE, element: "StudentProfile" },
      { path: URLS.HELP_DASHBOARD, element: "HelpDashboard" },
      { path: URLS.HELP_MATCHING, element: "HelpMatching" },
      { path: URLS.CHAT_SESSION, element: "ChatSession" },
      { path: URLS.SESSION_SUMMARY, element: "ChatSummary" },
    ],
  },
  { path: URLS.NOT_FOUND, element: "NotFound" },
];
