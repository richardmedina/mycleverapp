// src/services/auth.ts
import HttpClient from "../api/HttpClient";
import type { AuthResponse, AuthProfile } from '../types/Auth';

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_PROFILE_KEY = "auth_profile";

function toAuthProfile(authResponse: AuthResponse): AuthProfile {
  var payload = parseJwt(authResponse.token);

  const nameClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
  const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  const roleRaw = payload[roleClaim];
  const role =
    Array.isArray(roleRaw) ? roleRaw[0] : (roleRaw ?? payload.role ?? "User");

  return {
    sub: String(payload.sub ?? ""),
    unique_name: String(payload.unique_name ?? ""),
    jti: String(payload.jti ?? ""),
    name: String(payload[nameClaim] ?? payload.name ?? ""),
    role: String(role ?? ""),
    nbf: Number(payload.nbf ?? 0),
    exp: Number(payload.exp ?? 0),
    iss: String(payload.iss ?? ""),
    aud: String(payload.aud ?? ""),
    token: authResponse.token,
    expiresAtUtc: authResponse.expiresIn
  };
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function getAuthProfile(json: string | null): AuthProfile | null {
  try {
    if (!json) return null;

    const parsed = JSON.parse(json);

    // Validación mínima de que tenga algunos campos requeridos
    if (
      typeof parsed.sub === "string" &&
      typeof parsed.unique_name === "string" &&
      typeof parsed.token === "string"
    ) {
      return parsed as AuthProfile;
    }

    return null; // no cumple estructura mínima
  } catch (error) {
    console.error("Error parsing AuthProfile JSON:", error);
    return null;
  }
}

export async function login(username: string, password: string) : Promise<AuthProfile> {
  console.log("Logging In:", username, password);
  const { data } = await HttpClient.post<AuthResponse>("/auth/authenticate", {
    username,
    password,
  });
  const authProfile = toAuthProfile(data);

  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(authProfile));

  return authProfile;
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_PROFILE_KEY);
}

export const getCurrentAuthProfile = () : AuthProfile | null =>
{
  const serializedAuthProfile = localStorage.getItem(AUTH_TOKEN_KEY);
  const authProfile = getAuthProfile(serializedAuthProfile);

  return authProfile;
}

export const getCurrentAuthToken = () : string | null =>
{
  return localStorage.getItem(AUTH_TOKEN_KEY);
}