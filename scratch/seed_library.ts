import { PrismaClient } from '@prisma/client';
import { LIBRARY_ARTICLES } from '../src/lib/libraryData';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding library articles...");
  for (const item of LIBRARY_ARTICLES) {
    try {
      const existing = await prisma.libraryArticle.findUnique({
        where: { id: item.id }
      });
      
      if (!existing) {
        await prisma.libraryArticle.create({
          data: {
            id: item.id,
            titleBn: item.titleBn,
            titleEn: item.titleEn,
            subtitleBn: item.subtitleBn,
            subtitleEn: item.subtitleEn,
            authorBn: item.authorBn,
            authorEn: item.authorEn,
            category: item.category,
            categoryBn: item.categoryBn,
            categoryEn: item.categoryEn,
            readTimeBn: item.readTimeBn,
            readTimeEn: item.readTimeEn,
            image: item.image,
            featured: item.featured || false,
            highlightQuoteBn: item.highlightQuoteBn,
            highlightQuoteEn: item.highlightQuoteEn,
            wikiSource: item.wikiSource || null,
            sections: {
              create: item.sections.map(sec => ({
                headingBn: sec.headingBn,
                headingEn: sec.headingEn,
                textBn: sec.textBn,
                textEn: sec.textEn
              }))
            }
          }
        });
        console.log(`Added: ${item.titleEn}`);
      } else {
        console.log(`Skipped (already exists): ${item.titleEn}`);
      }
    } catch (err) {
      console.error(`Error adding ${item.id}:`, err);
    }
  }
  console.log("Done seeding library.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
