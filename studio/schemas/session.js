export default {
  name: 'session',
  title: 'Session',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockText'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'postAuthor' }]
    },
    {
      name: 'partyMembers',
      title: 'Party Members',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'partyMember' } }]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'campaign',
      title: 'Campaign',
      type: 'reference',
      to: [{ type: 'campaign' }]
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'category' } }]
    // },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  orderings: [
    {
      title: 'Publishing date new–>old',
      name: 'publishingDateAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Publishing date old->new',
      name: 'publishingDateDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      image: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date',
        media: image
      };
    }
  }
};
