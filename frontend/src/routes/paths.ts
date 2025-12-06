// src/routes/paths.ts
export enum PATHS {
  HOME = "/",
  // Authentication
  STUDENT_SIGNUP = "/signup/student",
  STUDENT_LOGIN = "/login/student",
  HELP_SEEKER_SIGNUP = "/signup/seeker",
  HELP_SEEKER_LOGIN = "/login/seeker",

  // Student dashboard & nested pages
  STUDENT_DASHBOARD = "/dashboard/student",
  STUDENT_TRAINING_CURRICULUM = "/dashboard/student/training-curriculum",
  STUDENT_PORTFOLIO = "/dashboard/student/portfolio",
  STUDENT_FORUM = "/dashboard/student/forum",
  STUDENT_SAFETY = "/dashboard/student/safety",

  // Help-seeker dashboard
  HELP_SEEKER_DASHBOARD = "/dashboard/seeker",

  // Chat (shared for both)
  CHAT = "/chat",

  // Public pages
  SAFETY = "/safety",
  PRIVACY = "/privacy",
  TERMS = "/terms",
  CONTACT = "/contact",
  FOR_UNIVERSITIES = "/for-universities",

  // University / professor
  UNIVERSITY_LOGIN = "/university-login",
  UNIVERSITY_SIGNUP = "/university-signup",
  UNIVERSITY_DASHBOARD = "/university-dashboard",
  UNIVERSITY_PORTFOLIO_LIST = "/portfolio-list",
  UNIVERSITY_ACTIVITY_LOG_LIST = "/activity-log-list",
}
