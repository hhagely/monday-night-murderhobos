import { GiGraveyard } from 'react-icons/gi';

export default {
  name: 'graveyard',
  title: 'Graveyard',
  type: 'document',
  icon: GiGraveyard,
  fields: [
    {
      name: 'lastSession',
      title: 'Last Session Played',
      type: 'reference',
      to: { type: 'session' },
    },
    {
      name: 'character',
      title: 'Character/NPC',
      type: 'reference',
      to: [
        {
          type: 'npc',
        },
        {
          type: 'partyMember',
        },
      ],
    },
  ],
  preview: {
    select: {
      characterName: 'character.character.characterName',
      lastSession: 'lastSession.title',
      media: 'character.character.mainImage',
    },
    prepare(data) {
      console.log('data: ', data);
      return {
        ...data,
        title: data.characterName,
        subtitle: data.lastSession,
      };
    },
  },
};
