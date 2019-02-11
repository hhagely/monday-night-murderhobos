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
  ],
};
