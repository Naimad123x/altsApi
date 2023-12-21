import express, { Request, Response } from "express";
const routerMain = express.Router();
import client from "../../bot";
import custom_slogans from '../utils/custom_slogans.json';
import {format} from "date-fns";

routerMain.get(`/`,  (req: Request, res: Response) => {
  return res.render(
    `index`,
    {
      "slogan": custom_slogans[Math.floor(Math.random()*custom_slogans.length)]
    }
  );
});

routerMain.get('/info', (req: Request, res: Response) => {
  // @ts-ignore
  res.json(req.user);
})

routerMain.get(`/user`,  async (req: Request, res: Response) => {
  const search = req.query.search;
  if(!/\d{1,21}/g.test(<string>search))
    return res.redirect(`/`);
  // @ts-ignore
  const user = await client.users.fetch(search);
  return res.render(`user`, {
    user,
    avatar: user.displayAvatarURL({extension: "webp", size: 4096}),
    avatarPhone: user.displayAvatarURL({extension: "webp", size: 64}),
    review: "none",
    date: format(new Date(user.createdTimestamp), "dd/MM/yyyy"),
    badges: user.flags.toArray().map(a => {
      return `<img src="/assets/img/badges/${a}.svg" alt="${a}" height="35vh" width="auto"></img>`
    }).join(``),
  });
});

export default routerMain;