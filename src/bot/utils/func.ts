import {ColorResolvable, EmbedAuthorData, EmbedBuilder} from "discord.js";


export const createEmbed: (description: string, author: EmbedAuthorData, color?: string) => EmbedBuilder =
  (description, author, color)=>{
    return new EmbedBuilder()
      .setDescription(description)
      .setAuthor(author)
      .setColor((color || '#2b4c9b') as ColorResolvable)
  }