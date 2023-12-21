import {OkPacket} from "mysql2"

import {conn, IServer} from "./sql"

export class ServerRepository {
  readAll(): Promise<IServer[]> {
    return new Promise((resolve, reject) => {
      conn.query<IServer[]>("SELECT * FROM servers")
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0])
        })
    })
  }

  readById(server_id: string): Promise<IServer | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<IServer[]>(
        "SELECT * FROM servers WHERE serverId = ?",
        [server_id])
        .then((res) => {
          if (res.length < 1) reject('empty array');
          else resolve(res[0][0])
        })
    })
  }

  create(server: IServer): Promise<IServer> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "INSERT INTO servers (serverId,reputation) VALUES(?,?)",
        [server.serverId, server.reputation])
        .then(()=>{
          this.readById(server.serverId)
            .then(server => resolve(server))
            .catch(reject)
        })
    })
  }

  update(server: IServer): Promise<IServer | undefined> {
    return new Promise((resolve, reject) => {
      conn.query<OkPacket>(
        "UPDATE servers SET reputation = ? WHERE serverId = ?",
        [server.reputation, server.serverId])
        .then(()=> {
          this.readById(server.serverId)
            .then(resolve)
            .catch(reject)
        })
    })
  }

  remove(serverId: string): Promise<number> {
    return new Promise(() => {
      conn.query<OkPacket>(
        "DELETE FROM servers WHERE serverId = ?",
        [serverId])
    })
  }
}