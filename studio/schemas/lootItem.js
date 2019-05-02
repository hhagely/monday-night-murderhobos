export default {
  type: 'object',
  name: 'lootItem',
  title: 'Loot Item',
  fields: [
    {
      title: 'Item Name',
      name: 'itemName',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Wiki Link',
      name: 'link',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'http'],
        }),
    },
    {
      title: 'Value (optional)',
      name: 'value',
      type: 'string',
    },
  ],
};
