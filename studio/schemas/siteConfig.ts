import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    // Site Info
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
    }),

    // Contact Information
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPhoneRaw',
      title: 'Contact Phone (Raw)',
      type: 'string',
      description: 'Phone number without spaces or formatting',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office Address',
      type: 'object',
      fields: [
        defineField({
          name: 'line1',
          title: 'Address Line 1',
          type: 'string',
        }),
        defineField({
          name: 'line2',
          title: 'Address Line 2',
          type: 'string',
        }),
      ],
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),

    // Agent Information
    defineField({
      name: 'agentName',
      title: 'Agent Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'agentFullName',
      title: 'Agent Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'agentTitle',
      title: 'Agent Title',
      type: 'string',
    }),
    defineField({
      name: 'agentImage',
      title: 'Agent Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'agentBio',
      title: 'Agent Bio',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Multiple paragraphs for agent bio',
    }),
    defineField({
      name: 'agentCommitment',
      title: 'Agent Commitment',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Multiple paragraphs for commitment section',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title Highlight',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'url',
    }),
    defineField({
      name: 'heroPrimaryButtonText',
      title: 'Hero Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'heroSecondaryButtonText',
      title: 'Hero Secondary Button Text',
      type: 'string',
    }),

    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'ctaPrimaryButtonText',
      title: 'CTA Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'CTA Secondary Button Text',
      type: 'string',
    }),

    // Additional Contact Info
    defineField({
      name: 'contactSecondaryEmail',
      title: 'Secondary Email',
      type: 'string',
    }),
    defineField({
      name: 'contactMapUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'contactMapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),

    // Working Hours
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'weekdays',
          title: 'Weekdays',
          type: 'object',
          fields: [
            { name: 'days', title: 'Days', type: 'string' },
            { name: 'hours', title: 'Hours', type: 'string' },
          ],
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'object',
          fields: [
            { name: 'days', title: 'Days', type: 'string' },
            { name: 'hours', title: 'Hours', type: 'string' },
          ],
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'object',
          fields: [
            { name: 'days', title: 'Days', type: 'string' },
            { name: 'hours', title: 'Hours', type: 'string' },
          ],
        }),
      ],
    }),

    // Contact Page
    defineField({
      name: 'contactPageTitle',
      title: 'Contact Page Title',
      type: 'string',
    }),
    defineField({
      name: 'contactPageSubtitle',
      title: 'Contact Page Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'contactPageFormTitle',
      title: 'Contact Page Form Title',
      type: 'string',
    }),
    defineField({
      name: 'contactPageInstantContactTitle',
      title: 'Contact Page Instant Contact Title',
      type: 'string',
    }),
    defineField({
      name: 'contactPageInstantContactSubtitle',
      title: 'Contact Page Instant Contact Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'contactPageOfficeTitle',
      title: 'Contact Page Office Title',
      type: 'string',
    }),

    // Trust Indicators
    defineField({
      name: 'trustIndicators',
      title: 'Trust Indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
          ],
        },
      ],
    }),

    // About Page - Credentials
    defineField({
      name: 'aboutCredentials',
      title: 'About - Credentials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{ name: 'text', title: 'Text', type: 'string' }],
        },
      ],
    }),

    // About Page - Trust Indicators
    defineField({
      name: 'aboutTrustIndicators',
      title: 'About - Trust Indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
          ],
        },
      ],
    }),

    // About Page - Why Choose Me
    defineField({
      name: 'aboutWhyChooseMe',
      title: 'About - Why Choose Me',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),

    // About Page - Property Types
    defineField({
      name: 'aboutPropertyTypes',
      title: 'About - Property Types',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // About Page - Key Locations
    defineField({
      name: 'aboutKeyLocations',
      title: 'About - Key Locations',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // About Page - Certifications
    defineField({
      name: 'aboutCertifications',
      title: 'About - Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'organization', title: 'Organization', type: 'string' },
            { name: 'date', title: 'Date', type: 'string' },
          ],
        },
      ],
    }),

    // About Page - Early Client Benefits
    defineField({
      name: 'aboutEarlyClientBenefits',
      title: 'About - Early Client Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),
  ],
});
