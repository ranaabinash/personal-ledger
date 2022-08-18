import { RegisterCredentials, LoginCredentials } from '@/api/models/Users'

const apiURI = import.meta.env.VITE_API_URL

export class authServices {
  public static async login(
    user: LoginCredentials
  ): Promise<{ user: string } | undefined> {
    const payload = JSON.stringify(user)
    try {
      const res = await fetch(`${apiURI}login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      }).then((result) => result.json())
      if (res.errors) {
        const message = JSON.stringify(res.errors)
        throw Error(message)
      } else return res
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  public static async registerUser(
    user: RegisterCredentials
  ): Promise<{ user: string } | undefined> {
    const payload = JSON.stringify(user)
    try {
      const res = await fetch(`${apiURI}signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      }).then((result) => result.json())
      if (res.errors) {
        const message = JSON.stringify(res.errors)
        throw Error(message)
      } else return res
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }
}
