import Cookies from "js-cookie";
import { useEffect } from "react";
import { redirect } from "react-router";
const VALIDE_RESPOSES = {
  201: true,
  200: true,
  400: false,
  401: false,
};

export function validateToken(res) {
  // const navigate = useNavigate()

  if (!VALIDE_RESPOSES[res.status]) {
    Cookies.remove("user");
    redirect("/login");
  }

  console.log("validate no errors responses");
}
