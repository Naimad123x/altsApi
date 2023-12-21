import {GuildMember, PartialGuildMember, TextChannel} from "discord.js";
import {createEmbed} from "../utils/func";

export const guildMemberRemove = async (member: GuildMember | PartialGuildMember): Promise<void> => {

  if(member.user.bot)
    return;

  const channel = member.guild.channels.cache.get('1079818057280659586') as TextChannel;
  await channel.send({
    embeds: [createEmbed(
      `<:alt_n:1079820558776144023> **${member.user.tag}**.**${member.id}** from guild.**${member.guild.name}**`,
      {name: 'member.leaved'},
    )]
  })
}