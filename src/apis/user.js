import { http } from "@/utils"

export function loginAPI(loginForm) {
  return http.post("/authorizations", loginForm)
}

export function getUserInfoAPI() {
  return http.get("/user/profile")
}