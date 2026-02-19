import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Bugatti Residences, Vincitore Wellness Estate',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated URL identifier. Click "Generate" after entering the project name.',
    }),
    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'string',
      description: 'e.g., Binghatti, Vincitore, Emaar Properties, DAMAC',
    }),
    defineField({
      name: 'location',
      title: 'Location / Area',
      type: 'string',
      description: 'e.g., Business Bay, Jumeirah Village Circle, Downtown Dubai',
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price (AED)',
      type: 'number',
      description: 'Minimum unit price in AED',
    }),
    defineField({
      name: 'completionDate',
      title: 'Expected Completion',
      type: 'string',
      description: 'e.g., Q4 2027, December 2026',
    }),
    defineField({
      name: 'paymentPlan',
      title: 'Payment Plan',
      type: 'string',
      description: 'e.g., 60/40, 30/70, 10% down payment',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Primary image shown on project cards and detail page hero',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the project gallery',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Full project description shown on the detail page',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key selling points, e.g., "World-class amenities", "Prime location"',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Infinity Pool, Gym, Concierge, Valet Parking',
    }),
    defineField({
      name: 'unitTypes',
      title: 'Unit Types Available',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Studio, 1 Bedroom, 2 Bedrooms, 3 Bedrooms, Penthouse, Villa',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Newly Launched', value: 'newly-launched' },
          { title: 'Under Construction', value: 'under-construction' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'newly-launched',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project in the featured section on homepage',
    }),
    defineField({
      name: 'brochureUrl',
      title: 'Brochure URL',
      type: 'url',
      description: 'Link to downloadable PDF brochure',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Project Website',
      type: 'url',
      description: 'Official developer or project website URL',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      developer: 'developer',
      status: 'status',
      media: 'mainImage',
    },
    prepare({ title, developer, status, media }) {
      const statusLabels: Record<string, string> = {
        'newly-launched': 'New Launch',
        'under-construction': 'Under Construction',
        'coming-soon': 'Coming Soon',
        'completed': 'Completed',
      };
      return {
        title,
        subtitle: `${developer || ''}${status ? ` · ${statusLabels[status] || status}` : ''}`,
        media,
      };
    },
  },
});
