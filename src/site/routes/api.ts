import express, { Request, Response } from "express";
import {getUser, putUser} from "./api/userApi";
import {getServer} from "./api/serverApi";
import {validateConnection} from "./api/validateConnection";
const routerApi = express.Router();

routerApi.all(`/v1/:target/:id/`,  async (req: Request, res: Response, next) => {
  const target: string = req.params.target as string;
  const id: string = req.params.id as string;
  const key: string = req.query.key as string;
  const client: string = req.query.client as string;

  // Checking for params and API key,client (just if exist)
  if (
    !target || !id || !key || !client ||
    target !== `servers` && target !== `users`
  )
    return res.status(400).send(
      {error: 'Wrong request params'}
    );

  await validateConnection(client, key).then(async (validate) => {
    if (!validate) {
      return res.status(401).send(
        {error: 'Wrong credentials'}
      );
    }
    next();
  });
})
routerApi.get(`/v1/:target/:id/`,  async (req: Request, res: Response) => {
  const target: string = req.params.target as string;
  const id: string = req.params.id as string;

  if(target === `users`)
    return await getUser(id, res);

  else if(target === `servers`)
    return await getServer(id, res);

});

routerApi.post(`/v1/:target/:id/`,  async (req: Request, res: Response) => {
  const target: string = req.params.target as string;
  const id: string = req.params.id as string;
  const reason: string = req.body.reason as string;
  const executor: string = req.body.executor as string;

  if(!reason || !executor)
    return res.status(400).send({
      error: `wrong body format`,
      body: req.body
    })

  if(target === `users`)
    return await putUser(id, res);

  else if(target === `servers`)
    return await getServer(id, res);

});

export default routerApi;