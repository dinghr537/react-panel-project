import { http } from "@/utils"

export function getChannelAPI() {
  return http.get("/channels")
}

export function createArticleAPI(article) {
  return http({
    method: 'POST',
    url: '/mp/articles?draft=false',
    data: article
  })
}