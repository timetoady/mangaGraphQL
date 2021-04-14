const { PrismaClient } = require('@prisma/client')
const theManga = require('./mangaSeed.json')
const prisma = new PrismaClient()

function getNested(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }

function returnDate(object) {
    let year = getNested(() => object["prop"].to["year"])
    let month = getNested(() => object["prop"].to["month"])
    let day = getNested(() => object["prop"].to["day"])
    let theDate = new Date(year, month, day)
    if (year === null) {
        return null
    } else{
        return theDate
    }
}

// function getAuthors(authorArray) {
//     let authors = authorArray.map(author => {
//         return author.name
//     }).join(', ')
//     return authors
// }

async function loadManga() {
  const allManga = theManga.manga
  return allManga.map((manga) => {
    return {
      data: {
        title: manga.title,
        title_english: manga.title_english,
        title_japanese: manga.title_japanese,
        synopsis: manga.synopsis,
        image_url: manga.image_url,
        volumes: manga.volumes,
        chapters: manga.chapters,
        ongoing: manga.publishing,
        publishedFrom: returnDate(manga.published),
        publishedTo: returnDate(manga.published),
        //author: getAuthors(manga.authors)
      },
    }
  })
}

async function loadAuthors() {
    const allManga = theManga.manga
    return allManga.map(manga => {
        return {
            data: {
                author: manga.authors.map(author => {author.name}).join(', ')
            }
        }
    })
}

async function main() {
  const allManga = await loadManga()
  //const allAuthors = await loadAuthors()
  for (const manga of allManga) {
    try {
      await prisma.manga.create(manga)
    } catch (err) {
      console.log(`Manga seeding has error: ${err}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
