import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember, VoiceChannel } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-kick',
  defaultMemberPermissions: 'Connect',
  description: 'Выгнать пользователя из вашего канала.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "member",
      description: 'Выберите пользователя.',
      required: true,
      type: ApplicationCommandOptionType.User
    }
  ],
  
  run: async ({ interaction, client }) => {
    const workingChannel = interaction.guild.channels.cache.find(channel => channel.name === `voice-control`);
    const currentChannel = interaction.channel

    if(currentChannel !== workingChannel) {
      interaction.reply({
        content: `Вводить эту команду можно только в канале ${workingChannel}`,
        ephemeral: true
      })

      return;
    }

    const voiceChannel = interaction.member.voice.channel;
    const ownedChannel = client. voiceGenerator.get(interaction.member.id)
    const targetMember: any = interaction.options.getMember("member");
    
    if(!voiceChannel) {
      interaction.reply({
        content: `Вы не находитесь в голосовм канале!`,
        ephemeral: true
      })

      return;
    }

    if(!ownedChannel || voiceChannel.id !== ownedChannel){
      interaction.reply({
        content: `Вы не являетесь создателем этого канала!`,
        ephemeral: true
      })

      return;
    }
    
    voiceChannel.permissionOverwrites.edit(targetMember, {Connect: false});

    targetMember.send({
      content: `Пользователь ${interaction.member} выгнал вас из закрытого канала: ${voiceChannel}.`
    })

    interaction.reply({
      content: `Пользователь ${targetMember} был выгнан из закрытого канала ${voiceChannel}.`,
      ephemeral: true
    })
  }
})