// import { GiSharpSmile } from 'react-icons/gi';
import { FaTags } from 'react-icons/fa';

export default {
  name: 'bestiaryTag',
  title: 'Bestiary Tag',
  type: 'document',
  icon: FaTags,
  fields: [
    {
      name: 'tagName',
      title: 'Bestiary Tag',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Bestiary tags a->z',
      name: 'bestiaryTagAlphabetical',
      by: [{ field: 'tagName', direction: 'asc' }],
    },
    {
      title: 'Bestiary tags z->a',
      name: 'bestiaryTagReverseAlphabetical',
      by: [
        {
          field: 'tagName',
          direction: 'desc',
        },
      ],
    },
  ],
  preview: {
    select: {
      bestiaryTag: 'tagName',
    },
    prepare(data) {
      return {
        ...data,
        title: data.bestiaryTag,
      };
    },
  },
};
