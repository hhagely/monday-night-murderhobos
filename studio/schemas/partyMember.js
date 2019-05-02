import { GiBackup } from 'react-icons/gi';

export default {
  type: 'document',
  name: 'partyMember',
  title: 'Party Member',
  icon: GiBackup,
  fields: [
    {
      title: 'Character',
      name: 'character',
      type: 'character',
    },
    {
      title: 'Class',
      name: 'class',
      type: 'string',
    },
    {
      title: 'Race',
      name: 'race',
      type: 'string',
    },
    {
      title: 'Player',
      name: 'person',
      type: 'reference',
      to: { type: 'person' },
    },
    {
      title: 'Active',
      name: 'active',
      type: 'boolean',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      characterName: 'character.characterName',
      personName: 'person.name',
      media: 'character.mainImage',
    },
    prepare(data) {
      return {
        ...data,
        title: data.characterName,
        subtitle: data.personName,
      };
    },
  },
};
