export interface User {
  _id: string
  username: string
  email: string,
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}
