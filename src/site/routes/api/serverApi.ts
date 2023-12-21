import {ServerRepository} from "../../../utils/serverRepository";
import {Response} from "express";

const serverRepository = new ServerRepository();
export const getServer: (id: string, res: Response) => Promise<void> =
  async (id,res) => {
    await serverRepository.readById(id).then((rows) =>{
      return res.status(200).send(
        {
          message: 'Ok',
          data: rows
        }
      );
    })
  }