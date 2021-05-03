# GraphQL API Node Server: Manga

This GraphQL server utilizes Prisma and Nexus for schema definitions, and a PostgreSQL database. It contains a built in seed.js that populates new items using the search function. New items are pulled from an outside API, https://jikan.docs.apiary.io/.

My client GitHub for this server: https://github.com/timetoady/restful_crud_frontend

~~Originally, this server ran natively with the front end (https://objective-lumiere-fb0645.netlify.app/) accessing the this back end server via Heroku.~~

~~But things change fast.~~

~~After an automatic server maintenance, any attempt to access this server via heroku (https://manga-graphql3.herokuapp.com/) via Postman causes it to immediately crash, and is blocked by CORS errors everywhere else. I've narrowed down the cause to be something to do with a depreciated http_parser, but I've spent too many hours on it now.~~

Edit 4/26/2021: Resolved the issue. It was due to a recent update in Prisma that [caused an error](https://github.com/prisma/prisma/issues/6682) from one of their dependancies (undici), because the `engines` setting in package.json for heroku was set to `>=10.00` for the node version as the default, heroku was using the latest version of node 16.00 where this crash happens. Changed `engines` to `14.x`. Boy, that took a while to figure out. :satisfied: :weary:

Now I can finish adding the front end functionality to needed. :stuck_out_tongue_closed_eyes:

*End edit*

Docker is used to create migration data, but since this server is decoupled from the client side that's written in Svelte, it didn't seem feasible to negotiate deployment of the entire site using docker composer in the current time frame constraints.

### To get this running: 

1. ~~Clone this repo~~
2. ~~Use npm start to serve to http://localhost:4000/.~~


3. Access the Netlify-hosted front end (https://objective-lumiere-fb0645.netlify.app/) and navigate to "manga" in the upper right.  


## Queries
(All queries and mutation are built using a pure try-catch blocked `POST` fetch call instead of ApolloClient. The data examples need to be given as the body of the `POST`.)


#### allManga

Gets all current manga on the server. Client uses this to populate the page, and update upon addition/deletion.

Example:

```javascript
export const ALL_MANGA = `
query allManga{
  allManga{
    title
    title_english
    title_japanese
    ongoing
    publishedFrom
    publishedTo
    image_url
    id
    synopsis
    volumes
    author
    genres
    favorite
  }
}
`;

```

#### Ongoing/Finished/Favorite

Returns a list of manga that filters based on selection chosen. Uses 3 different queries: ongoing, finished, and favorite, called dynamically through one function. 

#### mangaById

Returns a manga with its details by ID. Used in the edit/delete functions to verify mutation.

## Mutations

#### addManga

Adds a new manga to the list. Used in the search function to confirm adding to your list. The source for adding new manga (https://jikan.docs.apiary.io/) requires some reformatting to be accepted by my scheme, and shows in the example below.

Example: 

```javascript
const NEW_MANGA = `
    mutation addAManga{
      addManga(
        data: {
          title: "${data.title}",
          author: "${data.author}",
          image_url: "${data.image_url}",
          title_japanese: "${data.title_japanese}",
          title_english: "${data.title_english}",
          ongoing: ${data.ongoing},
          synopsis: "${data.synopsis.replace(/"/g, "'")}",
          publishedFrom: "${data.publishedFrom}",
          publishedTo: ${data.publishedTo === null ? null : `"${data.publishedTo.toISOString()}"`},
          volumes: ${data.volumes},
          chapters: ${data.chapters},
          genres: "${data.genres}"
      }, 
        )
     {
      title
      author
      id
    }
    }`;
```

#### updateManga

Update manga implemented in the client. Every manga entry sports an "Edit" button, the uses this mutation dynamically update the title, image URL, chapters, volumes, synopsis, and the favorite and ongoing status states.

#### deleteManga

Deletes a manga by ID. Used in listed manga card delete confirm function.