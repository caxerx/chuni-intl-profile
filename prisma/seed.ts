import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Create SongMode - International');
  try {
    await prisma.songMode.create({
      data: {
        id: 'cl2xv4wu00000cn2rhu7v3jx4',
        name: 'International',
      },
    });
    console.log('SongMode - International created');
  } catch {
    console.log('SongMode - International create failed');
  }

  console.log('Create SongMode - Chunirec');
  try {
    await prisma.songMode.create({
      data: {
        id: 'cl2y13vrz0000uf2rf2zycg5y',
        name: 'Chunirec',
      },
    });
    console.log('SongMode - Chunirec created');
  } catch {
    console.log('SongMode - Chunirec create failed');
  }

  console.log('Create Setting - defaultSongList');
  try {
    await prisma.setting.create({
      data: {
        key: 'defaultSongList',
        value: 'cl2xv4wu00000cn2rhu7v3jx4',
      },
    });
    console.log('Setting - defaultSongList created');
  } catch {
    console.log('Setting - defaultSongList create failed');
  }

  console.log('Create Setting - chunirecSongList');
  try {
    await prisma.setting.create({
      data: {
        key: 'chunirecSongList',
        value: 'cl2y13vrz0000uf2rf2zycg5y',
      },
    });
    console.log('Setting - chunirecSongList created');
  } catch {
    console.log('Setting - chunirecSongList create failed');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
