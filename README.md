# GraphQL API Node Server: Manga

Originally, this server ran natively with the front end (https://objective-lumiere-fb0645.netlify.app/) accessing the this back end server via Heroku.

But things change fast.

After an automatic server maintenance, any attempt to access this server via heroku (https://manga-graphql3.herokuapp.com/) via Postman causes it to immediately crash, and is blocked by CORS errors everywhere else. I've narrowed down the cause to be something to do with a depreciated http_parser, but I've spent too many hours on it now.

Docker is used to create migration data, but since this server is decoupled from the client side that's written in Svelte, it didn't seem feasible to negotiate deployment of the entire site using docker composer in the current time frame constraints.

### To get this running: 

1. Clone this repo  
2. Use npm start to serve to http://localhost:4000/.
3. Access the Netlify-hosted front end (https://objective-lumiere-fb0645.netlify.app/).  

This is of course not ideal, but should work for testing until I resolve the issue or move to another hosting service (see a section of log of the issue [here](put link to errorLog here).) I am very interested in feedback there.

## Queries

#### allManga

Gets all current manga on the server. Client uses this to populate the page, and update upon addition/deletion.

#### Ongoing

Returns a list of mange that are still ongoing. Plans to for how to implement this are still fermenting.

#### Finished

Returns a list of completed manga. Still seeking right implimentation.

#### mangaById

Returns a manga with its details by ID. Used in the edit/delete functions to verify mutation.

## Mutations

#### addManga

Adds a new manga to the list. Used in the search function to confirm adding to your list.

#### updateManga

Working, but implementation pushed back back by deployment issues. Working on it.

#### deleteManga

Deletes a manga by ID. Used in listed manga card delete confirm function.