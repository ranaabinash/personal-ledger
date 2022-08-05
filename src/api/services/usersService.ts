import { SetUser, User } from '../models/Users'

export class UserServices {
  public static async getUsers(): Promise<User[]> {
    const res = await fetch(`http://localhost:4000/users`)
    return res.json()
  }

  public static async getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:4000/users/${id}`);
    return res.json();
  }

  public static async addUser(user: SetUser): Promise<{ id: string }> {
    const payload = JSON.stringify(user)
    const res = await fetch(`http://localhost:4000/users`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload,
    })

    return res.json()
  }
}
