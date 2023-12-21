import express, {Express, Request, Response, NextFunction} from 'express';
import bodyParserInit, {BodyParser} from 'body-parser';
import routerMain from './routes/main';
import routerApi from './routes/api';
import limiter from './middleware/limiter'
import multer from 'multer';
const upload = multer();
import * as path from "path";
import routerLogin from "./routes/login";
import session from "express-session";
import {generatePassword} from "../utils/crypto";
require(`./passport/discord`);
import ms from "ms";
import passport from "passport";
import routerAuth from "./routes/auth";
import routerReport from "./routes/report";

const app: Express = express();
const bodyParser: BodyParser = bodyParserInit;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(upload.array())
  .use(limiter)
  .use(
    session({
      secret: generatePassword(),
      resave: false,
      saveUninitialized: false,
      maxAge: ms(`10m`),
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use("/", routerMain)
  .use("/api", routerApi)
  .use("/report", routerReport)
  .use("/login", routerLogin)
  .use("/auth", routerAuth)
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, 'public')))

  // custom 404
  .use((req: Request, res: Response) => {
    res.status(404).send({error: `404`})
  })

  // custom error handler
  .use((err, req:Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    if(err)
      return res.status(500).send('Something broke!')
    next();
  })

  .listen(3000, () => {
    console.log('Server listening on port 3000');
  });