// src/routes/urls.js
export const URLS = Object.freeze({
  // Landing & Auth
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ROLE_SELECTION: "/role-selection",

  // Student-specific pages
  STUDENT_DASHBOARD: "/student/dashboard",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_XP_BADGES: "/student/xp-badges",
  STUDENT_REFLECTIONS: "/student/reflections",
  STUDENT_MATCHING: "/student/matching",

  // Help-Seeker-specific pages
  HELPER_DASHBOARD: "/help-seeker/dashboard",
  HELPER_PROFILE: "/help-seeker/profile", // optional if you want profiles for help-seekers
  HELPER_MATCHING: "/help-seeker/matching",
  HELPER_FEEDBACK: "/help-seeker/feedback",

  // Conversation / Chat
  CHAT_SESSION: "/chat/:sessionId",
  SESSION_SUMMARY: "/chat/:sessionId/summary",

  // Safety & Crisis
  SAFETY_GUIDELINES: "/safety-guidelines",
  CRISIS_HELP: "/crisis-help",

  // Settings / Account
  ACCOUNT_SETTINGS: "/settings",
  CULTURAL_CONTEXT: "/settings/cultural-context",

  // Admin / University (optional later)
  ADMIN_DASHBOARD: "/admin/dashboard",
  UNIVERSITY_REPORTS: "/admin/reports",

  // Misc / Fallback
  NOT_FOUND: "*",
});

// add some URLS later
