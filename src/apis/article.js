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

export function getArticleListAPI(params) {
    return http.get('/mp/articles', { params })
}

export function deleteArticleAPI(id) {
    return http.delete(`/mp/articles/${id}`)
} 

export function getArticleAPI(id) {
    return http.get(`/mp/articles/${id}`)
}