// src/services/auth.ts
import HttpClient from "../api/HttpClient";

type AuthResponse = {
  token: string;
  expiresIn?: number; // depende de tu API
};

export async function login(username: string, password: string) {
  console.log("Logging In:", username, password);
  const { data } = await HttpClient.post<AuthResponse>("/auth/authenticate", {
    username,
    password,
  });
  console.log("Logged In:", data);
  // Guardamos el token en localStorage
  localStorage.setItem("auth_token", data.token);

  return data;
}

export function logout() {
  localStorage.removeItem("auth_token");
}
