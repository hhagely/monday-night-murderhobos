import { GiOpenTreasureChest } from 'react-icons/gi';

export default {
  type: 'document',
  name: 'partyTreasury',
  title: 'Party Treasury',
  icon: GiOpenTreasureChest,
  fields: [
    {
      title: 'Item Name',
      name: 'itemName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Wiki Link',
      name: 'link',
      type: 'url',
      validation: (Rule) =>
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
    {
      title: 'Owner',
      name: 'owner',
      type: 'reference',
      to: { type: 'partyMember' },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      itemName: 'itemName',
      ownerName: 'owner.name',
    },
    prepare(data) {
      return {
        ...data,
        title: data.itemName,
        subtitle: data.ownerName,
      };
    },
  },
};
