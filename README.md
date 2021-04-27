# GraphQL API Node Server: Manga

~~Originally, this server ran natively with the front end (https://objective-lumiere-fb0645.netlify.app/) accessing the this back end server via Heroku.~~

~~But things change fast.~~

~~After an automatic server maintenance, any attempt to access this server via heroku (https://manga-graphql3.herokuapp.com/) via Postman causes it to immediately crash, and is blocked by CORS errors everywhere else. I've narrowed down the cause to be something to do with a depreciated http_parser, but I've spent too many hours on it now.~~

Edit 4/26/2021: Resolved the issue. It was due to a recent update in Prisma that [caused an error](https://github.com/prisma/prisma/issues/6682) from one of their dependancies (undici), because the `engines` setting in package.json for heroku was set to `>=10.00` for the node version as the default, heroku was using the latest version of node 16.00 where this crash happens. Changed `engines` to `14.x`. Boy, that took a while to figure out. :satisfied: :weary:

Now I can finish adding the front end functionality to needed. :stuck_out_tongue_closed_eyes:

End edit

Docker is used to create migration data, but since this server is decoupled from the client side that's written in Svelte, it didn't seem feasible to negotiate deployment of the entire site using docker composer in the current time frame constraints.

### To get this running: 

~~1. Clone this repo  ~~
~~2. Use npm start to serve to http://localhost:4000/.~~
3. Access the Netlify-hosted front end (https://objective-lumiere-fb0645.netlify.app/).  


## Queries

#### allManga

Gets all current manga on the server. Client uses this to populate the page, and update upon addition/deletion.

#### Ongoing

Returns a list of mange that are still ongoing. Plans to for how to implement this are still fermenting.

#### mangaById

Returns a manga with its details by ID. Used in the edit/delete functions to verify mutation.

## Mutations

#### addManga

Adds a new manga to the list. Used in the search function to confirm adding to your list.

#### updateManga

Update manga implemented in the client. Every manga entry sports an "Edit" button, the uses this mutation dynamically update the title, image URL, chapters, volumes, synopsis, and the favorite and ongoing status states.

#### deleteManga

Deletes a manga by ID. Used in listed manga card delete confirm function.