export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
