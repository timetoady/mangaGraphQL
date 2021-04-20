const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const authorData = [
  {
    name: 'Akamatsu, Ken',
    manga: {
      create: [
        {
          title_english: 'Love Hina',
          title_japanese: 'ラブひな',
          title: 'Love Hina',
          synopsis: 'It is said that if a couple gets into the University of Tokyo together, they will live happily ever after. However, for Keitarou Urashima, UTokyo is a distant dream. After failing the entrance exams twice already, he decides to stay at his grandmothers inn in Tokyo in order to prepare for his third attempt. He is, therefore, surprised when he finds out that not only has his grandmother gone on a long vacation, but the inn has also become the Hinata House, an all-girls dormitory! Unfortunately for Keitarou, a series of misunderstandings during his first visit leave him with five untrusting tenants. But when Haruka Urashima, his aunt who works at the dorm, brings up that he is supposedly a UTokyo student, the girls impressions of him quickly change, and they reluctantly allow him to stay. Feeling guilty about the lie, he slowly gets to know his new neighbors: the cute yet violent Naru Narusegawa, the cheeky and opportunistic Mitsune Konno, the soft-spoken Shinobu Maehara, the straight-laced Motoko Aoyama, and the mischievous Kaolla Su. Thus continues the unpopular Keitarous difficult journey to get into UTokyo, all for the chance to fulfill his childhood promise to the only girl who has ever shown any interest in him and maybe, just maybe, meet her again...',
          image_url: 'https://cdn.myanimelist.net/images/manga/2/52139.jpg',
          volumes: 14,
          chapters: 120,
          ongoing: false,
          publishedFrom: '1998-10-21T00:00:00.000Z',
          publishedTo: '2001-10-31T00:00:00.000Z',
        },
      ],
    },
  },
  {
    name: 'Obata, Takeshi',
    manga: {
      create: [
        {
          title_english: 'Death Note',
          title_japanese: 'DEATH NOTE',
          title: 'Death Note',
          synopsis: 'Ryuk, a god of death, drops his Death Note into the human world for personal pleasure. In Japan, prodigious high school student Light Yagami stumbles upon it. Inside the notebook, he finds a chilling message: those whose names are written in it shall die. Its nonsensical nature amuses Light; but when he tests its power by writing the name of a criminal in it, they suddenly meet their demise. Realizing the Death Notes vast potential, Light commences a series of nefarious murders under the pseudonym \"Kira,\" vowing to cleanse the world of corrupt individuals and create a perfect society where crime ceases to exist. However, the police quickly catch on, and they enlist the help of L—a mastermind detective—to uncover the culprit. Death Note tells the thrilling tale of Light and L as they clash in a great battle-of-minds, one that will determine the future of the world.',
          image_url: 'https://cdn.myanimelist.net/images/manga/2/54453.jpg',
          volumes: 12,
          chapters: 108,
          ongoing: false,
          publishedFrom: '2003-12-01T00:00:00.000Z',
          publishedTo: '2006-05-15T00:00:00.000Z',
        },
      ],
    },
  },
  {
    name: 'Yoshida, Satoru',
    manga: {
      create: [
        { 
          title_english: null,
          title_japanese: '働かないふたり',
          title: 'Hatarakanai Futari',
          synopsis: 'Haruko is a teenage girl who shares with her brother a love of laying around the house in sweats, watching television and playing video games. Her brother has a few friends, but Haruko has a lot of problems with social anxiety. The two of them pass their days happily playing together, though their mother worries about how shes going to get Haruko to shape up enough to find a husband.',
          image_url: 'https://cdn.myanimelist.net/images/manga/1/188796.jpg',
          volumes: null,
          chapters: null,
          ongoing: true,
          publishedFrom: '2013-12-20T00:00:00.000Z',
          publishedTo: null,
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const a of authorData) {
    const author = await prisma.author.create({
      data: a,
    })
    console.log(`Created user with id: ${author.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
