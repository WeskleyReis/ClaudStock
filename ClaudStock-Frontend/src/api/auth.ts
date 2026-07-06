import { api } from "./axios";

export async function login(user: string, password: string) {
  return api.post("/token/", {
    username: user,
    password: password,
  })
}