// src/services/auth.ts
import HttpClient from "../api/HttpClient";

type AuthResponse = {
  token: string;
  expiresIn?: number; // depende de tu API
};

export async function login(username: string, password: string) {
  const { data } = await HttpClient.post<AuthResponse>("/auth/authenticate", {
    username,
    password,
  });

  // Guardamos el token en localStorage
  localStorage.setItem("auth_token", data.token);

  return data;
}

export function logout() {
  localStorage.removeItem("auth_token");
}
