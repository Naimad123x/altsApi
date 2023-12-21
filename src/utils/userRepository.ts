import {OkPacket} from "mysql2"

import {conn, IUser} from "./sql"
import {RowDataPacket} from "mysql2/promise";

export class UserRepository {
  readAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      conn.query<IUser[]>("SELECT * FROM users")
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0])
        })
    })
  }

  readById(user_id: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<IUser[]>(
        "SELECT * FROM users WHERE userId = ?",
        [user_id])
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0][0])
        })
    })
  }

  create(user: { negative: number; positive: number; userId: string }): Promise<IUser> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "INSERT INTO users (userId,positive,negative) VALUES(?,?,?)",
        [user.userId, user.positive,user.negative])
        .then(()=>{
          this.readById(user.userId)
            .then(user => resolve(user))
            .catch(reject)
        })
    })
  }

  findOrCreate(user_id: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<IUser[]>(
        "SELECT * FROM users WHERE userId = ?",
        [user_id])
        .then(async (res) => {
          if (res.length < 1) {
            await this.create(
              {
                userId: user_id,
                positive: 0,
                negative: 0
              }
            )
          }
          else resolve(res[0][0])
        })
    })
  }

  update(user: IUser): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "UPDATE users SET reputation = ? WHERE userId = ?",
        [user.reputation, user.userId])
        .then(()=> {
          this.readById(user.userId)
            .then(resolve)
            .catch(reject)
        })
    })
  }

  remove(user_id: string): Promise<number> {
    return new Promise(() => {
      conn.query<OkPacket>(
        "DELETE FROM users WHERE userId = ?",
        [user_id])
    })
  }
}