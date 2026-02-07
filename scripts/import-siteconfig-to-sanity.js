import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: 'rx98mfqq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
});

// Read the site config JSON file
const siteConfigPath = path.join(__dirname, '../src/app/data/site-config.json');
const siteConfigData = JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'));

async function uploadImageFromUrl(imageUrl, filename) {
  try {
    if (!imageUrl.startsWith('http')) {
      console.log(`Skipping local image path: ${imageUrl}`);
      return null;
    }

    console.log(`Uploading image from URL: ${imageUrl}`);
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: filename,
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imageUrl}:`, error);
    return null;
  }
}

async function importSiteConfig() {
  try {
    console.log('Starting site config import to Sanity...\n');

    // Check if site config already exists
    const existingConfig = await client.fetch('*[_type == "siteConfig"][0]');

    if (existingConfig) {
      console.log('Site config already exists. Updating...');
    } else {
      console.log('Creating new site config...');
    }

    // Upload agent image if it's a URL
    let agentImageRef = null;
    if (siteConfigData.about.agent.image.startsWith('http')) {
      const imageAssetId = await uploadImageFromUrl(
        siteConfigData.about.agent.image,
        'agent-photo.jpg'
      );
      if (imageAssetId) {
        agentImageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        };
      }
    }

    // Transform the data to match Sanity schema
    const siteConfigDoc = {
      _type: 'siteConfig',
      _id: existingConfig?._id || 'siteConfig',
      siteName: siteConfigData.site.name,
      siteTagline: siteConfigData.site.tagline,
      siteDescription: siteConfigData.site.description,
      contactPhone: siteConfigData.contact.phone,
      contactPhoneRaw: siteConfigData.contact.phoneRaw,
      contactEmail: siteConfigData.contact.email,
      contactSecondaryEmail: siteConfigData.contact.secondaryEmail,
      whatsappNumber: siteConfigData.contact.whatsapp,
      officeAddress: {
        _type: 'object',
        line1: siteConfigData.contact.address.line1,
        line2: siteConfigData.contact.address.line2,
      },
      contactMapUrl: siteConfigData.contact.mapUrl,
      contactMapEmbedUrl: siteConfigData.contact.mapEmbedUrl,
      socialMedia: {
        _type: 'object',
        facebook: siteConfigData.socialMedia.facebook,
        instagram: siteConfigData.socialMedia.instagram,
        linkedin: siteConfigData.socialMedia.linkedin,
      },
      workingHours: {
        _type: 'object',
        weekdays: {
          _type: 'object',
          days: siteConfigData.workingHours.weekdays.days,
          hours: siteConfigData.workingHours.weekdays.hours,
        },
        saturday: {
          _type: 'object',
          days: siteConfigData.workingHours.saturday.days,
          hours: siteConfigData.workingHours.saturday.hours,
        },
        sunday: {
          _type: 'object',
          days: siteConfigData.workingHours.sunday.days,
          hours: siteConfigData.workingHours.sunday.hours,
        },
      },
      agentName: siteConfigData.about.agent.name,
      agentFullName: siteConfigData.about.agent.fullName,
      agentTitle: siteConfigData.about.agent.title,
      agentImage: agentImageRef,
      agentBio: siteConfigData.about.agent.bio,
      agentCommitment: siteConfigData.about.agent.commitment,
      heroTitle: siteConfigData.hero.title,
      heroTitleHighlight: siteConfigData.hero.titleHighlight,
      heroDescription: siteConfigData.hero.description,
      heroBackgroundImage: siteConfigData.hero.backgroundImage,
      heroPrimaryButtonText: siteConfigData.hero.primaryButtonText,
      heroSecondaryButtonText: siteConfigData.hero.secondaryButtonText,
      ctaTitle: siteConfigData.cta.title,
      ctaSubtitle: siteConfigData.cta.subtitle,
      ctaPrimaryButtonText: siteConfigData.cta.primaryButtonText,
      ctaSecondaryButtonText: siteConfigData.cta.secondaryButtonText,
      contactPageTitle: siteConfigData.contactPage.title,
      contactPageSubtitle: siteConfigData.contactPage.subtitle,
      contactPageFormTitle: siteConfigData.contactPage.formTitle,
      contactPageInstantContactTitle: siteConfigData.contactPage.instantContactTitle,
      contactPageInstantContactSubtitle: siteConfigData.contactPage.instantContactSubtitle,
      contactPageOfficeTitle: siteConfigData.contactPage.officeTitle,
      trustIndicators: siteConfigData.trustIndicators,
      aboutCredentials: siteConfigData.about.credentials,
      aboutTrustIndicators: siteConfigData.about.trustIndicators,
      aboutWhyChooseMe: siteConfigData.about.whyChooseMe,
      aboutPropertyTypes: siteConfigData.about.propertyTypes,
      aboutKeyLocations: siteConfigData.about.keyLocations,
      aboutCertifications: siteConfigData.about.certifications,
      aboutEarlyClientBenefits: siteConfigData.about.earlyClientBenefits,
    };

    // Create or update the document
    const result = await client.createOrReplace(siteConfigDoc);

    console.log('\n✅ Site config imported successfully!');
    console.log(`Document ID: ${result._id}`);
    console.log('\nYou can now view it in Sanity Studio at:');
    console.log('http://localhost:3333/desk/siteConfig');

  } catch (error) {
    console.error('\n❌ Error importing site config:', error);
    throw error;
  }
}

// Run the import
importSiteConfig()
  .then(() => {
    console.log('\n✅ Import completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
