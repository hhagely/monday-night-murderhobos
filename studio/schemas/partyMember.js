import MdPerson from 'react-icons/lib/md/person';

export default {
  type: 'object',
  name: 'partyMember',
  title: 'Party Member',
  icon: MdPerson,
  fields: [
    {
      title: 'Character name',
      name: 'characterName',
      type: 'string'
    },
    {
      title: 'Class',
      name: 'class',
      type: 'string'
    },
    {
      title: 'Race',
      name: 'race',
      type: 'string'
    },
    {
      title: 'Player',
      name: 'person',
      type: 'reference',
      to: { type: 'person' }
    }
    // {
    //   title: 'Roles',
    //   name: 'roles',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   options: {
    //     layout: 'radio',
    //     list: [
    //       { title: 'Designer', value: 'designer' },
    //       { title: 'Developer', value: 'developer' },
    //       { title: 'Editor', value: 'editor' },
    //       { title: 'Manager', value: 'manager' }
    //     ]
    //   }
    // }
  ],
  preview: {
    select: {
      personName: 'person.name',
      // roles: 'roles',
      media: 'person.image'
    },
    prepare(data) {
      return {
        ...data,
        title: data.personName,
        subtitle: data.roles && data.roles.join('/')
      };
    }
  }
};
