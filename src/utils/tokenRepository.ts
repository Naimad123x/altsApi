import {OkPacket} from "mysql2"

import {conn, IToken} from "./sql"

export class TokenRepository {
  readAll(): Promise<IToken[]> {
    return new Promise((resolve, reject) => {
      conn.query<IToken[]>("SELECT * FROM tokens")
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0])
        })
    })
  }

  readById(client: string): Promise<IToken | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<IToken[]>(
        "SELECT * FROM tokens WHERE client = ?",
        [client])
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0][0])
        })
    })
  }

  create(userId: string, credentials: IToken): Promise<IToken> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "INSERT INTO tokens (userId,description, client,`key`,salt) VALUES(?,?,?,?,?)",
        [userId, credentials.description, credentials.client, credentials.key, credentials.salt])
        .then(()=>{
          this.readById(credentials.credentials)
            .then(credentials => resolve(credentials))
            .catch(reject)
        })
    })
  }

  update(userId: string, credentials: IToken): Promise<IToken | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "UPDATE tokens SET client = ?, `key` = ?, salt = ? WHERE userId = ?",
        [credentials.client, credentials.key, credentials.salt, userId])
        .then(()=> {
          this.readById(credentials.client)
            .then(resolve)
            .catch(reject)
        })
    })
  }

  remove(client: string): Promise<number> {
    return new Promise(() => {
      conn.query<OkPacket>(
        "DELETE FROM tokens WHERE client = ?",
        [client])
    })
  }
}