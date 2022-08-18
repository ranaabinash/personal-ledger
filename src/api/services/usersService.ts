import { User } from '../models/Users'

const apiURI = import.meta.env.VITE_API_URL

export class UserServices {

  public static async getUser(id: string): Promise<User> {
    const res = await fetch(`${apiURI}user/${id}`)
    return res.json()
  }
}
