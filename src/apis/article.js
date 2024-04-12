import { http } from "@/utils"

export function getChannelAPI() {
  return http.get("/channels")
}