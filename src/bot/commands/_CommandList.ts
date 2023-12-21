import { SlashCommand } from "../types";
import { embed } from "./embed";
import { regen } from "./regen";

export const CommandList: SlashCommand[] = [embed, regen];