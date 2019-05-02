import { GiInvisible } from 'react-icons/gi';

export default {
  type: 'document',
  name: 'npc',
  title: 'NPC',
  icon: GiInvisible,
  fields: [
    {
      title: 'Character',
      name: 'character',
      type: 'character',
    },
    {
      title: 'Dead/Lost?',
      name: 'dead',
      type: 'boolean',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      characterName: 'character.characterName',
      media: 'character.mainImage',
    },
    prepare(data) {
      return {
        ...data,
        title: data.characterName,
        dead: data.dead,
      };
    },
  },
};
