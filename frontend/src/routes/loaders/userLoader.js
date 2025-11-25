import { redirect } from "react-router-dom";
import { URLS } from "../urls";

// Minimal loader for now (you can later dispatch Redux checkUser)
export async function userLoader(store) {
  // check token from localStorage or store
  const token = localStorage.getItem("token");
  if (!token) return redirect(URLS.LOGIN);
  return null;
}
