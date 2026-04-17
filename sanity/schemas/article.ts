import { defineField, defineType } from 'sanity'

/**
 * Article schema — the content type that powers /news on the public site.
 * The fields here match the NewsArticle type in src/data/news.ts so the
 * frontend doesn't need to care whether the data came from Sanity or
 * from the static sample file.
 */
export const articleSchema = defineType({
  name: 'article',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required().min(5).max(140),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      description: "Shows in the article URL — e.g. 'chambers-ranking-2026'",
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication date',
      type: 'date',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary (one short sentence)',
      description: 'Shown on the news list and at the top of the article.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Press Release', value: 'Press Release' },
          { title: 'Case Update', value: 'Case Update' },
          { title: 'Class Actions', value: 'Class Actions' },
          { title: 'Commentary', value: 'Commentary' },
          { title: 'Firm Update', value: 'Firm Update' },
          { title: 'Careers', value: 'Careers' },
          { title: 'Media', value: 'Media' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Banton Group',
    }),
    defineField({
      name: 'source',
      title: 'External source (for republished press pieces)',
      description: 'Only fill this in if the article links out to another publication.',
      type: 'object',
      fields: [
        { name: 'name', title: 'Source name', type: 'string' },
        { name: 'url', title: 'Source URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  { name: 'href', title: 'URL', type: 'url' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, category, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title,
        subtitle: [category, formattedDate].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
