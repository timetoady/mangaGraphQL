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

  function returnDateTo(object) {
    let year = getNested(() => object["prop"].to["year"])
    let month =  getNested(() => object["prop"].to["month"])
    let day =  getNested(() => object["prop"].to["day"])
    let theDate = new Date(year, month, day)
    if (year === null) {
        return null
    } else{
        return theDate
    }
  }
  
   function returnDateFrom(object) {
    let year =  getNested(() => object["prop"].from["year"])
    let month =  getNested(() => object["prop"].from["month"])
    let day =  getNested(() => object["prop"].from["day"])
    let theDate = new Date(year, month, day)
    console.log("New datetime from FROM HERE!", theDate)
    return theDate
  }

function getGenres(genreArray) {
    const theGenres = []
    genreArray.forEach(genre =>{
      theGenres.push(genre.name)
    })
    return theGenres
  }


function getAuthors(authorArray) {
    const theAuthors = []
    authorArray.forEach(author =>{
      theAuthors.push(author.name)
    })
    if(theAuthors.length === 1){
        return theAuthors[0]
    } else{
        return theAuthors.join(' & ')
    }
    
}

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
        genres: getGenres(manga.genres),
        volumes: manga.volumes,
        chapters: manga.chapters,
        ongoing: manga.publishing,
        publishedFrom: returnDateFrom(manga.published),
        publishedTo: returnDateTo(manga.published),
        author: getAuthors(manga.authors)
      },
    }
  })
}

async function loadAuthors() {
    const allManga = theManga.manga
    return allManga.map(manga => {
        return {
            data: {
                name: getAuthors(manga.authors),
                manga: {
                  create: [
                    {
                      title: manga.title,
                      title_english: manga.title_english,
                      title_japanese: manga.title_japanese,
                      synopsis: manga.synopsis,
                      image_url: manga.image_url,
                      genres: getGenres(manga.genres),
                      volumes: manga.volumes,
                      chapters: manga.chapters,
                      ongoing: manga.publishing,
                      publishedFrom: returnDateFrom(manga.published),
                      publishedTo: returnDateTo(manga.published),
                    },
                  ],

                },
            }
        }
    })
}

async function main() {
  const allManga = await loadManga()
  //const allAuthors = await loadAuthors()
  // for (const manga of allManga) {
  //   try {
  //     await prisma.manga.create(manga)
  //   } catch (err) {
  //     console.log(`Manga seeding has error: ${err}`)
  //   }
  // }
  for (const manga of allManga) {
    try {
      await prisma.manga.create(manga)
    } catch (err) {
      console.log(`Author seeding has error: ${err}`)
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
