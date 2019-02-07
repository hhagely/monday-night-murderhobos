import { MdPerson } from 'react-icons/md';

export default {
  type: 'document',
  name: 'partyMember',
  title: 'Party Member',
  icon: MdPerson,
  fields: [
    {
      title: 'Character Name',
      name: 'characterName',
      type: 'string',
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
      title: 'Character Image',
      name: 'mainImage',
      type: 'mainImage',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Active',
      name: 'active',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      characterName: 'characterName',
      personName: 'person.name',
      media: 'mainImage',
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
