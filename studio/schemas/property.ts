import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (AED)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Dubai Marina, Downtown Dubai',
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Specific neighborhood within the location',
    }),
    defineField({
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'Villa' },
          { title: 'Apartment', value: 'Apartment' },
          { title: 'Penthouse', value: 'Penthouse' },
          { title: 'Townhouse', value: 'Townhouse' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'area',
      title: 'Area (sq ft)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Primary image shown in property listings',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: 'Additional images for property gallery',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
      description: 'Show this property in featured listings',
    }),
    defineField({
      name: 'new',
      title: 'New Listing',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as new listing with badge',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(50),
      description: 'Detailed property description',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Swimming Pool, Gym, Parking, etc.',
    }),
    defineField({
      name: 'nearbyFacilities',
      title: 'Nearby Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Facility Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'distance',
              title: 'Distance',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., 5 min walk, 2 km',
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  'School',
                  'Hospital',
                  'Mall',
                  'Restaurant',
                  'Metro',
                  'Beach',
                  'Park',
                  'Supermarket',
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
      ],
      description: 'GPS coordinates for map display',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      price: 'price',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, location, price, media } = selection;
      return {
        title: title,
        subtitle: `${location} - AED ${price?.toLocaleString()}`,
        media: media,
      };
    },
  },
});
