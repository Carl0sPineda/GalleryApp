export interface User {
  id: string;
  name: string;
  email: string;
  otp_enabled: boolean;
}

export interface LoginResponse {
  status: number;
  token: string;
  user: User;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
