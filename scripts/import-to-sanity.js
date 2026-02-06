import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Sanity client
const client = createClient({
  projectId: 'rx98mfqq',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN, // You'll need to set this
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Read the JSON data
const dataPath = path.join(__dirname, '../src/app/data/properties.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

async function importProperties() {
  console.log('🚀 Starting property import...\n');

  for (const property of data.properties) {
    try {
      // Transform the data to match Sanity schema
      const sanityProperty = {
        _type: 'property',
        title: property.title,
        price: property.price,
        location: property.location,
        neighborhood: property.neighborhood,
        type: property.type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        featured: property.featured || false,
        new: property.new || false,
        description: property.description,
        amenities: property.amenities || [],
        nearbyFacilities: property.nearbyFacilities || [],
        coordinates: property.coordinates || { lat: 0, lng: 0 },
      };

      // Note: Images need to be uploaded separately or use URLs
      // For now, we'll skip images in this basic import
      console.log(`Importing: ${property.title}...`);

      await client.create(sanityProperty);
      console.log(`✅ Imported: ${property.title}`);
    } catch (error) {
      console.error(`❌ Error importing ${property.title}:`, error.message);
    }
  }

  console.log('\n🎉 Property import complete!');
}

async function importNeighborhoods() {
  console.log('\n🚀 Starting neighborhood import...\n');

  for (const neighborhood of data.neighborhoods) {
    try {
      const sanityNeighborhood = {
        _type: 'neighborhood',
        name: neighborhood.name,
        slug: { _type: 'slug', current: neighborhood.slug },
        description: neighborhood.description,
        fullDescription: neighborhood.fullDescription || '',
        highlights: neighborhood.highlights || [],
        facilities: neighborhood.facilities || [],
      };

      console.log(`Importing: ${neighborhood.name}...`);

      await client.create(sanityNeighborhood);
      console.log(`✅ Imported: ${neighborhood.name}`);
    } catch (error) {
      console.error(`❌ Error importing ${neighborhood.name}:`, error.message);
    }
  }

  console.log('\n🎉 Neighborhood import complete!');
}

// Run the import
async function main() {
  try {
    await importProperties();
    await importNeighborhoods();
    console.log('\n✨ All data imported successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

main();
