import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Read location data
  const locationData = JSON.parse(
    readFileSync(join(process.cwd(), 'data', 'locations.json'), 'utf-8')
  );

  // Create dumpster sizes
  const dumpsterSizes = [
    {
      size: 10,
      name: '10 Yard Dumpster',
      slug: '10-yard-dumpster',
      dimensions: "12' L x 8' W x 3.5' H",
      capacity: 'Holds 3-4 pickup truck loads',
      basePrice: 350,
      description: 'Perfect for small projects like garage cleanouts, small roofing jobs, and yard waste removal.',
      idealFor: ['Garage cleanouts', 'Small roofing jobs', 'Yard waste removal', 'Basement cleanup'],
    },
    {
      size: 20,
      name: '20 Yard Dumpster',
      slug: '20-yard-dumpster',
      dimensions: "22' L x 8' W x 4' H",
      capacity: 'Holds 6-8 pickup truck loads',
      basePrice: 450,
      description: 'Ideal for whole-home cleanouts, medium construction projects, and large roofing jobs.',
      idealFor: ['Whole-home cleanouts', 'Medium construction', 'Large roofing projects', 'Kitchen/bath remodeling'],
    },
    {
      size: 30,
      name: '30 Yard Dumpster',
      slug: '30-yard-dumpster',
      dimensions: "22' L x 8' W x 6' H",
      capacity: 'Holds 9-12 pickup truck loads',
      basePrice: 550,
      description: 'Great for new construction, major demolition, and commercial cleanouts.',
      idealFor: ['New construction', 'Major demolition', 'Commercial cleanouts', 'Large remodels'],
    },
    {
      size: 40,
      name: '40 Yard Dumpster',
      slug: '40-yard-dumpster',
      dimensions: "22' L x 8' W x 8' H",
      capacity: 'Holds 12-16 pickup truck loads',
      basePrice: 650,
      description: 'Perfect for industrial projects, large demolition, and commercial construction.',
      idealFor: ['Industrial projects', 'Large demolition', 'Commercial construction', 'Estate cleanouts'],
    },
  ];

  console.log('Creating dumpster sizes...');
  for (const size of dumpsterSizes) {
    await prisma.dumpsterSize.upsert({
      where: { slug: size.slug },
      update: size,
      create: size,
    });
  }

  // Create service types
  const serviceTypes = [
    {
      name: 'Residential Dumpster Rental',
      slug: 'residential-dumpster-rental',
      description: 'Perfect for home cleanouts, renovations, landscaping, and yard waste removal. We offer flexible scheduling and competitive pricing for residential projects.',
      icon: '🏠',
    },
    {
      name: 'Commercial Dumpster Rental',
      slug: 'commercial-dumpster-rental',
      description: 'Business renovations, office cleanouts, retail updates, and industrial waste management. We understand commercial needs and offer reliable service.',
      icon: '🏢',
    },
    {
      name: 'Construction Dumpster Rental',
      slug: 'construction-dumpster-rental',
      description: 'New construction, remodeling, debris management, and site cleanup. Heavy-duty dumpsters designed for construction materials.',
      icon: '🏗️',
    },
    {
      name: 'Roll-Off Dumpster Rental',
      slug: 'roll-off-dumpster-rental',
      description: 'Versatile roll-off dumpsters for any project type. Available in multiple sizes with flexible rental periods.',
      icon: '🚛',
    },
    {
      name: 'Special Waste Disposal',
      slug: 'special-waste-disposal',
      description: 'Concrete, roofing shingles, yard waste, and other specialized debris. We handle materials that require special disposal methods.',
      icon: '♻️',
    },
  ];

  console.log('Creating service types...');
  for (const service of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Create states
  console.log('Creating states...');
  for (const stateData of locationData.states) {
    await prisma.state.upsert({
      where: { slug: stateData.slug },
      update: {
        name: stateData.name,
        abbreviation: stateData.abbreviation,
      },
      create: {
        name: stateData.name,
        slug: stateData.slug,
        abbreviation: stateData.abbreviation,
      },
    });
  }

  // Create cities
  console.log('Creating cities...');
  let cityCount = 0;
  for (const cityData of locationData.cities) {
    const state = await prisma.state.findUnique({
      where: { slug: cityData.stateSlug },
    });

    if (state) {
      await prisma.city.upsert({
        where: {
          stateId_slug: {
            stateId: state.id,
            slug: cityData.slug,
          },
        },
        update: {
          name: cityData.name,
          population: cityData.population,
          zipCodes: cityData.zipCodes,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        },
        create: {
          name: cityData.name,
          slug: cityData.slug,
          stateId: state.id,
          population: cityData.population,
          zipCodes: cityData.zipCodes,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        },
      });
      cityCount++;
      if (cityCount % 50 === 0) {
        console.log(`Created ${cityCount} cities...`);
      }
    }
  }

  console.log(`✅ Seed completed! Created ${cityCount} cities, ${dumpsterSizes.length} dumpster sizes, and ${serviceTypes.length} service types.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
