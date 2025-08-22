export type Credentials = { username: string, password: string };

export type AuthResponse = {
  token: string;
  expiresIn?: number; // depende de tu API
};

export type AuthProfile = {
    sub: string,
    unique_name: string,
    jti: string,
    name: string,
    role: string,
    nbf: number,
    exp: number,
    iss: string,
    aud: string,
    token: string,
    expiresAtUtc?: number
}

