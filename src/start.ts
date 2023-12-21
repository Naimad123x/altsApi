import * as path from 'path';
import { config } from "dotenv";
config();

console.log(`Launching site`)
require(path.join(__dirname, `./site/app`));
console.log(`Launching bot`)
require(path.join(__dirname, `./bot/index`));