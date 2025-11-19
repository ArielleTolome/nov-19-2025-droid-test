import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Dumpster sizes data
const dumpsterSizes = [
  {
    size: 10,
    name: '10 Yard Dumpster',
    slug: '10-yard-dumpster',
    dimensions: "14' L x 8' W x 4' H",
    capacity: 'Holds 3-4 pickup truck loads',
    basePrice: 299.0,
    description:
      'Our 10 yard dumpster is perfect for small-scale projects and cleanouts. This compact container is ideal for residential use and can fit in tight spaces like driveways or small construction sites. Despite its smaller size, it provides ample capacity for most home improvement projects, garage cleanouts, and minor renovations. The low height makes it easy to load debris, and its compact footprint means it won\'t take up much space on your property.',
    idealFor: [
      'Small bathroom or kitchen renovations',
      'Garage or basement cleanouts',
      'Minor landscaping projects',
      'Roof repairs or small roof replacements',
      'Deck removal',
      'Carpet or flooring removal from several rooms',
      'Spring cleaning and decluttering',
    ],
    weight: '2-3 tons (4,000-6,000 lbs) weight limit',
  },
  {
    size: 20,
    name: '20 Yard Dumpster',
    slug: '20-yard-dumpster',
    dimensions: "22' L x 8' W x 4.5' H",
    capacity: 'Holds 6-8 pickup truck loads',
    basePrice: 399.0,
    description:
      'The 20 yard dumpster is our most popular size and offers the perfect balance of capacity and convenience. This mid-sized container is versatile enough for both residential and commercial applications. It can handle medium-sized renovation projects, larger cleanouts, and moderate construction debris. The 20 yard dumpster is commonly chosen for whole-room renovations, estate cleanouts, and medium-scale construction projects. Its size makes it manageable for most driveways while still providing substantial waste capacity.',
    idealFor: [
      'Full kitchen or bathroom remodels',
      'Whole-home carpet or flooring removal',
      'Large estate cleanouts',
      'Roof replacement for average-sized homes',
      'Deck demolition and removal',
      'Multiple room renovations',
      'Medium-sized landscaping projects',
      'Furniture and appliance disposal',
      'Window or siding replacement projects',
    ],
    weight: '3-4 tons (6,000-8,000 lbs) weight limit',
  },
  {
    size: 30,
    name: '30 Yard Dumpster',
    slug: '30-yard-dumpster',
    dimensions: "22' L x 8' W x 6' H",
    capacity: 'Holds 9-12 pickup truck loads',
    basePrice: 499.0,
    description:
      'Our 30 yard dumpster is designed for large-scale projects that generate significant amounts of waste. This heavy-duty container is ideal for major home renovations, new construction, commercial projects, and substantial demolition work. The increased height and capacity make it perfect for bulky items and large volumes of construction debris. Despite its size, it maintains a manageable footprint for most residential and commercial properties. This size is often preferred by contractors and businesses handling major renovation or construction projects.',
    idealFor: [
      'Major home additions or renovations',
      'New home construction',
      'Large-scale demolition projects',
      'Complete home cleanouts or foreclosure cleanups',
      'Commercial construction and renovation',
      'Major landscaping overhauls',
      'Multi-room or whole-house remodeling',
      'Large estate or business cleanouts',
      'Community cleanup events',
      'Removal of large furniture quantities',
    ],
    weight: '4-5 tons (8,000-10,000 lbs) weight limit',
  },
  {
    size: 40,
    name: '40 Yard Dumpster',
    slug: '40-yard-dumpster',
    dimensions: "22' L x 8' W x 8' H",
    capacity: 'Holds 12-16 pickup truck loads',
    basePrice: 599.0,
    description:
      'The 40 yard dumpster is our largest container, engineered for the most demanding waste management needs. This industrial-sized dumpster is perfect for major commercial construction, large-scale demolition, and projects that generate enormous amounts of debris. Its exceptional capacity reduces the need for multiple containers or frequent haul-aways, making it cost-effective for large projects. The 40 yard dumpster is commonly used by commercial contractors, large businesses, and industrial facilities. While it requires more space than smaller options, it provides unmatched capacity for handling substantial waste volumes efficiently.',
    idealFor: [
      'Major commercial construction projects',
      'Large-scale building demolition',
      'Industrial cleanup and decommissioning',
      'Warehouse or factory cleanouts',
      'Major storm debris removal',
      'Large commercial renovations',
      'Multi-family property cleanouts',
      'Major landscaping and land clearing',
      'Community-wide cleanup initiatives',
      'Post-disaster cleanup operations',
      'Large manufacturing facility waste',
    ],
    weight: '5-6 tons (10,000-12,000 lbs) weight limit',
  },
];

// Service types data
const serviceTypes = [
  {
    name: 'Residential Dumpster Rental',
    slug: 'residential',
    description:
      'Our residential dumpster rental service is designed specifically for homeowners tackling projects around the house. Whether you\'re renovating your kitchen, cleaning out the garage, or doing a major spring cleaning, we provide convenient and affordable dumpster solutions. We understand the unique needs of residential customers and offer flexible rental periods, competitive pricing, and excellent customer service. Our containers are sized appropriately for driveways and residential streets, and we take care to protect your property during delivery and pickup. From small 10-yard dumpsters for bathroom remodels to larger 30-yard containers for whole-house renovations, we have the right size for your project.',
    metaTitle: 'Residential Dumpster Rental Services | Home Projects & Cleanouts',
    metaDesc:
      'Affordable residential dumpster rentals for home renovations, cleanouts, and remodeling projects. Multiple sizes available with flexible rental periods. Get a free quote today!',
  },
  {
    name: 'Commercial Dumpster Rental',
    slug: 'commercial',
    description:
      'Our commercial dumpster rental service caters to businesses, contractors, and commercial property managers who need reliable waste management solutions. We offer a comprehensive range of container sizes and flexible service schedules to accommodate projects of any scale. Whether you\'re managing ongoing waste at a retail location, coordinating a major office renovation, or handling construction debris at a commercial site, our team provides professional, responsive service. We understand that time is money in commercial operations, which is why we prioritize prompt delivery, reliable pickup schedules, and excellent communication. Our commercial clients appreciate our competitive pricing, professional staff, and commitment to keeping their projects on schedule.',
    metaTitle: 'Commercial Dumpster Rental | Business & Contractor Services',
    metaDesc:
      'Professional commercial dumpster rental for businesses, contractors, and commercial properties. Reliable service, flexible schedules, and competitive rates. Request a quote now!',
  },
  {
    name: 'Construction Dumpster Rental',
    slug: 'construction',
    description:
      'Construction projects generate substantial amounts of waste, and our construction dumpster rental service is built to handle it all. We work with contractors, builders, and construction companies on projects ranging from small residential builds to large commercial developments. Our heavy-duty dumpsters are designed to hold construction debris including lumber, drywall, concrete, roofing materials, and more. We offer flexible rental terms to accommodate project timelines, from short-term rentals for quick demolition jobs to long-term rentals for extended construction projects. Our team understands construction industry needs and provides reliable service that won\'t slow down your project. We also offer multiple dumpsters for larger sites and can coordinate delivery and pickup around your construction schedule.',
    metaTitle: 'Construction Dumpster Rental | Contractors & Builders',
    metaDesc:
      'Heavy-duty construction dumpsters for contractors and builders. Handle debris from demolition, renovation, and new construction. Flexible rental terms and reliable service.',
  },
  {
    name: 'Roll-off Dumpster Rental',
    slug: 'roll-off',
    description:
      'Roll-off dumpsters are the most versatile waste container solution, featuring an open-top design and wheels that allow for easy placement and removal. Our roll-off dumpster rental service provides these convenient containers for projects of all types and sizes. The roll-off design means our delivery trucks can precisely position the dumpster exactly where you need it on your property. These containers are perfect for projects that generate large volumes of waste, as they can be easily swapped out or hauled away when full. Roll-off dumpsters are ideal for construction sites, major cleanouts, demolition projects, and any situation requiring efficient waste removal. We offer various sizes from 10 to 40 yards, all featuring the convenient roll-off design for easy loading and removal.',
    metaTitle: 'Roll-off Dumpster Rental | Flexible Waste Container Solutions',
    metaDesc:
      'Rent roll-off dumpsters in multiple sizes for easy waste removal. Perfect for construction, demolition, and large cleanout projects. Professional delivery and pickup service.',
  },
  {
    name: 'Demolition Debris Removal',
    slug: 'demolition',
    description:
      'Demolition projects create unique waste management challenges, with large volumes of heavy materials that need proper handling and disposal. Our demolition debris removal service provides specialized dumpsters designed to handle the rigorous demands of demolition work. Whether you\'re tearing down a single wall or demolishing an entire structure, we have the right container for your needs. Our dumpsters can accommodate concrete, brick, lumber, metal, drywall, and other common demolition materials. We work with demolition contractors, renovation specialists, and property owners to ensure efficient debris removal that keeps projects moving forward. Our team understands proper disposal requirements for demolition materials and ensures compliance with local regulations.',
    metaTitle: 'Demolition Debris Removal | Heavy-Duty Dumpster Service',
    metaDesc:
      'Specialized dumpsters for demolition debris removal. Handle concrete, brick, lumber, and heavy materials. Professional service for contractors and property owners.',
  },
  {
    name: 'Renovation & Remodeling',
    slug: 'renovation',
    description:
      'Renovation and remodeling projects transform spaces but also generate significant waste. Our renovation and remodeling dumpster service provides the perfect solution for managing debris from your improvement projects. From small bathroom updates to whole-house remodels, we offer appropriately sized containers and flexible rental terms to match your project timeline. Our dumpsters accommodate common renovation waste including old cabinets, countertops, flooring, fixtures, drywall, and more. We understand that renovation projects often uncover unexpected challenges, which is why we offer flexible rental extensions and can swap out full containers quickly. Many homeowners and contractors choose our service because we make waste management one less thing to worry about during the renovation process.',
    metaTitle: 'Renovation & Remodeling Dumpster Rental | Home Improvement',
    metaDesc:
      'Convenient dumpster rentals for renovation and remodeling projects. Perfect for kitchen, bathroom, and whole-house remodels. Flexible rental periods and easy scheduling.',
  },
  {
    name: 'Roofing Projects',
    slug: 'roofing',
    description:
      'Roofing projects require specialized waste management due to the heavy, bulky nature of roofing materials. Our roofing dumpster rental service provides containers specifically suited for shingle removal, roof tear-offs, and roofing debris. We work extensively with roofing contractors and homeowners to provide appropriately sized dumpsters that can handle the weight and volume of roofing materials. Our containers feature protective boards to prevent damage to driveways during heavy loading. We understand that roofing projects often have tight timelines due to weather concerns, so we prioritize quick delivery and pickup. Whether you\'re replacing the roof on a small home or managing a large commercial re-roofing project, we have the right dumpster solution.',
    metaTitle: 'Roofing Dumpster Rental | Shingle Removal & Roof Tear-Offs',
    metaDesc:
      'Specialized dumpsters for roofing projects and shingle removal. Heavy-duty containers for roof tear-offs and replacements. Protect your driveway with our professional service.',
  },
  {
    name: 'Cleanout Services',
    slug: 'cleanout',
    description:
      'From estate cleanouts to hoarding situations, our cleanout dumpster service helps you tackle any cleaning project efficiently. We provide dumpsters for garage cleanouts, attic and basement clearing, estate sales preparation, foreclosure cleanups, and general decluttering projects. Our service is designed to make the cleanout process as stress-free as possible with flexible rental periods that give you time to sort through items at your own pace. We offer various sizes to match the scope of your cleanout, from small 10-yard containers for single-room projects to large 30-yard dumpsters for whole-house estate cleanouts. Many customers appreciate our compassionate, professional approach to what can often be emotionally challenging cleanout situations.',
    metaTitle: 'Cleanout Dumpster Rental | Estate, Garage & Home Cleanouts',
    metaDesc:
      'Dumpster rental for estate cleanouts, garage cleaning, and decluttering projects. Flexible rental periods and compassionate service. Multiple sizes available.',
  },
  {
    name: 'Landscaping & Yard Waste',
    slug: 'landscaping',
    description:
      'Landscaping projects and yard waste removal require dumpsters that can handle organic materials, soil, rocks, and plant debris. Our landscaping dumpster rental service provides containers suitable for tree removal, brush clearing, garden renovations, and major yard cleanup projects. We accommodate various types of yard waste including branches, stumps, grass clippings, leaves, soil, and rocks. Our dumpsters are sized appropriately for residential landscaping projects and larger commercial landscape installations. We understand seasonal demands for yard waste removal and strive to provide quick delivery during peak seasons. Whether you\'re clearing land for a new garden, removing trees, or completing a major landscape renovation, our dumpsters make waste removal simple and efficient.',
    metaTitle: 'Landscaping Dumpster Rental | Yard Waste & Tree Removal',
    metaDesc:
      'Rent dumpsters for landscaping projects and yard waste removal. Perfect for tree removal, brush clearing, and garden renovations. Get a free estimate today!',
  },
];

interface StateData {
  name: string;
  abbreviation: string;
  population: number;
  slug: string;
}

interface CityData {
  name: string;
  population: number;
  zipCodes: string[];
  latitude: number;
  longitude: number;
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
}

async function seedStates(statesData: StateData[]) {
  console.log('🏛️  Seeding states...');

  for (const state of statesData) {
    await prisma.state.upsert({
      where: { slug: state.slug },
      update: {
        name: state.name,
        abbreviation: state.abbreviation,
        population: state.population,
      },
      create: {
        name: state.name,
        slug: state.slug,
        abbreviation: state.abbreviation,
        population: state.population,
        metaTitle: `Dumpster Rental in ${state.name} | Affordable Rates`,
        metaDesc: `Find affordable dumpster rental services throughout ${state.name}. Residential and commercial dumpsters available in all major cities. Get a free quote today!`,
      },
    });
  }

  const count = await prisma.state.count();
  console.log(`✅ Seeded ${count} states`);
}

async function seedCities(citiesData: CityData[]) {
  console.log('🏙️  Seeding cities...');

  let processedCount = 0;
  const batchSize = 50;

  for (let i = 0; i < citiesData.length; i += batchSize) {
    const batch = citiesData.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (city) => {
        // Find the state by abbreviation
        const state = await prisma.state.findUnique({
          where: { abbreviation: city.stateAbbr },
        });

        if (!state) {
          console.warn(`⚠️  State not found for city ${city.name} (${city.stateAbbr})`);
          return;
        }

        await prisma.city.upsert({
          where: {
            stateId_slug: {
              stateId: state.id,
              slug: city.slug,
            },
          },
          update: {
            name: city.name,
            population: city.population,
            zipCodes: city.zipCodes,
            latitude: city.latitude,
            longitude: city.longitude,
          },
          create: {
            name: city.name,
            slug: city.slug,
            stateId: state.id,
            population: city.population,
            zipCodes: city.zipCodes,
            latitude: city.latitude,
            longitude: city.longitude,
            metaTitle: `Dumpster Rental ${city.name}, ${city.stateAbbr} | Same-Day Service`,
            metaDesc: `Professional dumpster rental in ${city.name}, ${state.name}. Residential & commercial services available. Multiple sizes, competitive rates. Call now for same-day delivery!`,
          },
        });

        processedCount++;
      })
    );

    // Progress update every batch
    console.log(`   Processed ${processedCount} / ${citiesData.length} cities...`);
  }

  const count = await prisma.city.count();
  console.log(`✅ Seeded ${count} cities`);
}

async function seedDumpsterSizes() {
  console.log('🗑️  Seeding dumpster sizes...');

  for (const size of dumpsterSizes) {
    await prisma.dumpsterSize.upsert({
      where: { slug: size.slug },
      update: {
        size: size.size,
        name: size.name,
        dimensions: size.dimensions,
        capacity: size.capacity,
        basePrice: size.basePrice,
        description: size.description,
        idealFor: size.idealFor,
        weight: size.weight,
      },
      create: {
        size: size.size,
        name: size.name,
        slug: size.slug,
        dimensions: size.dimensions,
        capacity: size.capacity,
        basePrice: size.basePrice,
        description: size.description,
        idealFor: size.idealFor,
        weight: size.weight,
      },
    });
  }

  const count = await prisma.dumpsterSize.count();
  console.log(`✅ Seeded ${count} dumpster sizes`);
}

async function seedServiceTypes() {
  console.log('🔧 Seeding service types...');

  for (const service of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        metaTitle: service.metaTitle,
        metaDesc: service.metaDesc,
      },
      create: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        metaTitle: service.metaTitle,
        metaDesc: service.metaDesc,
      },
    });
  }

  const count = await prisma.serviceType.count();
  console.log(`✅ Seeded ${count} service types`);
}

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Load JSON data
    const dataDir = path.join(__dirname, '..', 'data');
    const statesPath = path.join(dataDir, 'states.json');
    const citiesPath = path.join(dataDir, 'cities.json');

    console.log('📁 Loading data files...');

    if (!fs.existsSync(statesPath)) {
      throw new Error(`States data file not found at: ${statesPath}`);
    }

    if (!fs.existsSync(citiesPath)) {
      throw new Error(`Cities data file not found at: ${citiesPath}`);
    }

    const statesData: StateData[] = JSON.parse(fs.readFileSync(statesPath, 'utf-8'));
    const citiesData: CityData[] = JSON.parse(fs.readFileSync(citiesPath, 'utf-8'));

    console.log(`   Loaded ${statesData.length} states`);
    console.log(`   Loaded ${citiesData.length} cities\n`);

    // Seed data in transactions for data integrity
    console.log('💾 Seeding database...\n');

    // Seed states first (cities depend on states)
    await seedStates(statesData);

    // Seed cities
    await seedCities(citiesData);

    // Seed dumpster sizes
    await seedDumpsterSizes();

    // Seed service types
    await seedServiceTypes();

    console.log('\n✨ Database seeding completed successfully!');

    // Print summary
    const stats = {
      states: await prisma.state.count(),
      cities: await prisma.city.count(),
      dumpsterSizes: await prisma.dumpsterSize.count(),
      serviceTypes: await prisma.serviceType.count(),
    };

    console.log('\n📊 Database Summary:');
    console.log(`   States: ${stats.states}`);
    console.log(`   Cities: ${stats.cities}`);
    console.log(`   Dumpster Sizes: ${stats.dumpsterSizes}`);
    console.log(`   Service Types: ${stats.serviceTypes}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
