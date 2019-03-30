import { GiOpenTreasureChest } from 'react-icons/gi';

export default {
  type: 'document',
  name: 'partyTreasury',
  title: 'Party Treasury',
  icon: GiOpenTreasureChest,
  fields: [
    {
      title: 'Item',
      name: 'item',
      type: 'lootItem',
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
      itemName: 'item.itemName',
      ownerName: 'owner.character.characterName',
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
