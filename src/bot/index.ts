import {Client, GatewayIntentBits} from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onReady } from "./events/ready";
import { onInteraction } from "./events/interactionCreate";
import {guildMemberAdd} from "./events/guildMemberAdd";
import {guildMemberRemove} from "./events/guildMemberRemove";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
});
(async () => {

  if (!validateEnv()) return;

  client.on("ready", async () => await onReady(client));

  client.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  client.on(
    "guildMemberAdd",
    async (member) => await guildMemberAdd(member)
  )

  client.on(
    "guildMemberRemove",
    async (member) => await guildMemberRemove(member)
  )

  await client.login(process.env.TOKEN as string);
})().catch((e) => {console.log(e)});

export default client;