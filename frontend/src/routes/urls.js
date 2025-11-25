// src/routes/urls.js
export const URLS = Object.freeze({
  // Landing & Auth
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Student
  STUDENT_BASE: "/student",
  STUDENT_DASHBOARD: "/student/dashboard",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_XP_BADGES: "/student/xp-badges",
  STUDENT_REFLECTIONS: "/student/reflections",
  STUDENT_MATCHING: "/student/matching",

  // Help-seeker
  HELP_BASE: "/help-seeker",
  HELP_DASHBOARD: "/help-seeker/dashboard",
  HELP_PROFILE: "/help-seeker/profile",
  HELP_MATCHING: "/help-seeker/matching",
  HELP_FEEDBACK: "/help-seeker/feedback",

  // Conversation / Chat (route definitions use placeholders)
  SESSIONS_BASE: "/sessions",
  CHAT_SESSION: "/sessions/:sessionId",
  SESSION_SUMMARY: "/sessions/:sessionId/summary",

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

// helper builders for generating URLs at runtime (safe)
// helpers function to help us navigate to URLs
export const build = {
  chat(sessionId) {
    if (!sessionId) throw new Error("build.chat requires sessionId");
    return `/sessions/${sessionId}`;
  },
  chatSummary(sessionId) {
    if (!sessionId) throw new Error("build.chatSummary requires sessionId");
    return `/sessions/${sessionId}/summary`;
  },
  student(path = "") {
    if (!path) return "/student";
    return `/student/${path.replace(/^\/+/, "")}`;
  },
  help(path = "") {
    if (!path) return "/help-seeker";
    return `/help-seeker/${path.replace(/^\/+/, "")}`;
  },
};
