import {createPool, Pool, RowDataPacket} from "mysql2/promise";

// Interfaces
export interface IUser extends RowDataPacket {
  userId: string
  positive: number
  negative: number
}


export interface IToken extends RowDataPacket {
  description: string
  client: string
  key: string
  salt: string
}
export interface IServer extends RowDataPacket {
  serverId: string
  reputation: string
  scam: number
  nsfw: number
}

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'altfdev',
  idleTimeout: 60 * 60 * 1000,
  connectionLimit: 10
};

export const conn: Pool = createPool(dbConfig);
