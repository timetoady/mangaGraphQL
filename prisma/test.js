const theManga = require('./mangaSeed.json')

function getNested(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  
async function gimmePublished() {
    console.log(theManga.manga.map(eachManga => {
        let year = getNested(() => eachManga.published["prop"].from["year"])
        let month = getNested(() => eachManga.published["prop"].from["month"])
        let day = getNested(() => eachManga.published["prop"].from["day"])
        return new Date(year, month, day)
        

        //return getNested(() => eachManga.published["prop"].from["day"])
    }))

    // publishedFrom: manga.published.prop.from.filter(date => {
    //     return new Date(date.year, date.month, date.day)
    // }),
}

// gimmePublished()

async function getAuthors() {
  console.log(theManga.manga.map(eachManga =>{
    authorArray = getNested(() => eachManga.authors)
    const theAuthors = []
    authorArray.forEach(author =>{
      theAuthors.push(author.name)
    })
    return theAuthors
  }))
}

function getGenres(eachManga) {
  genreArray = getNested(() => eachManga.genres)
  const theGenres = []
  genreArray.forEach(genres =>{
    theGenres.push(genres.name)
  })
  return theGenres
}

function getGenresHere() {
  console.log(theManga.manga.map(eachManga =>{
    return getGenres(eachManga)

  }))
}



getGenresHere()