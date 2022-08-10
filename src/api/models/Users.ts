export interface User {
  _id: string
  username: string
  email?: string,
  password: string
}

export interface SetUser {
  username: string
  email?: string
  password: string
}
