import { GiBrute } from 'react-icons/gi';

export default {
  type: 'document',
  name: 'bestiary',
  title: 'Beast',
  icon: GiBrute,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'mainImage',
      type: 'mainImage',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockText',
    },
    {
      title: 'Campaign',
      name: 'campaign',
      type: 'reference',
      to: { type: 'campaign' },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Sessions Encountered In',
      name: 'sessions',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'session' } }],
    },
    {
      title: 'Wiki Link',
      name: 'link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelatvie: false,
          scheme: ['http', 'https'],
        }),
    },
    {
      title: 'Loot',
      name: 'loot',
      type: 'array',
      of: [{ type: 'lootItem' }],
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'bestiaryTag' } }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      media: 'mainImage',
    },
    prepare(data) {
      return {
        ...data,
        title: data.name,
      };
    },
  },
};
