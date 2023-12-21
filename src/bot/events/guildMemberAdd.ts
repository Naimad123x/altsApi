import {GuildMember, TextChannel} from "discord.js";
import {createEmbed} from "../utils/func";

export const guildMemberAdd = async (member: GuildMember): Promise<void> => {

  if(member.user.bot)
    return;

  const channel = member.guild.channels.cache.get('1079818057280659586') as TextChannel;
  await channel.send({
    embeds: [createEmbed(
      `<:alt_y:1079821242665803897> **${member.user.tag}**.**${member.id}** to guild.**${member.guild.name}**`,
      {name: 'member.joined'},
    )]
  })
}