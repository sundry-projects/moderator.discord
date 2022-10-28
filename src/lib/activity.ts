import { ActivityType, Client } from "discord.js";

export default (client: Client): void => {
  client.user?.setPresence({
    activities: [{
      name: '/set-activity',
      type: ActivityType.Playing,
    }],
    status: 'online'
  })
  
  console.log('Activity set.');
}