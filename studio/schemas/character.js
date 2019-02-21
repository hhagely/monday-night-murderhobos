export default {
  type: 'object',
  name: 'character',
  title: 'Character',
  fields: [
    {
      title: 'Character Name',
      name: 'characterName',
      type: 'string',
    },
    {
      title: 'Character Image',
      name: 'mainImage',
      type: 'mainImage',
      options: {
        hotspot: true,
      },
    },
  ],
};
