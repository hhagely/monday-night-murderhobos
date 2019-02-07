export default {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockText',
    },
    {
      name: 'startedAt',
      title: 'Started at',
      type: 'datetime',
    },
    {
      name: 'endedAt',
      title: 'Ended at',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    // {
    //   name: 'sessions',
    //   title: 'Sessions',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'session' } }]
    // }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      image: 'mainImage',
    },
    prepare({ title = 'No title', publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date',
        media: image,
      };
    },
  },
};
