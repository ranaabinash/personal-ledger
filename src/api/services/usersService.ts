import { SetUser, User } from '../models/Users'

const apiURI = import.meta.env.API_URL;

export class UserServices {
  public static async getUsers(): Promise<User[]> {
    const res = await fetch(`http://localhost:4000/users`)
    return res.json()
  }

  public static async getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:4000/users/${id}`);
    return res.json();
  }

  public static async addUser(user: SetUser) { // : Promise<{ id: string }>
    const payload = JSON.stringify(user)
    console.log(apiURI);
    const res = await fetch(`http://127.0.0.1:3001/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload,
    }).catch(err => console.log(err))

    return res
  }
}
