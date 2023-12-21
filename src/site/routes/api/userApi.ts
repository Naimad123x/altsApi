import {UserRepository} from "../../../utils/userRepository";
import e, {Response} from "express";
import client from "../../../bot/index";
import { redisClient } from "../../../utils/redis"

const userRepository = new UserRepository();
export const getUser: (id: string, res: Response) => Promise<any> =
  async (id,res) => {
    try{
      let data = JSON.parse(await redisClient.get(id));
      if(!data){
        data =  await userRepository.readById(id)

        if(!data)
          return res.status(404).send(
            {
              error: 'User not found!',
            }
          );
        await redisClient.set(id, JSON.stringify(data));
      }
      return res.status(200).json(
        {
          message: 'Ok',
          data: data
        }
      )
    }catch(e){
      console.log(e)
    }
  }

export const putUser: (id: string, res: Response) => Promise<void | e.Response> =
  async (id,res) => {
    try{
      const user = await client.users.fetch(id);
      if(!user)
        return res.status(404).send(
          {
            error: 'User not found!',
          }
        );
      await userRepository.readById(id).then(async (rows) => {

        rows.negative += 1;
        if (!rows)
          await userRepository.update(rows);
        else
          await userRepository.create(rows);
        return res.status(200).send(
          {
            message: 'Ok',
            data: rows
          }
        );
      })
    }catch(e){
      console.log(e)
    }
  }