---
title: "Creating a rest crud api with node, express & mongoose"
date: "2021-10-04"
description: "Simple example of how to create a rest crud api using node, express and mongoose. I show to create an api for movies and have code exmaples so it's easy to follow along."
published: true
tags: ["javascript", "node", "express", "mongoose", "mongodb"]
---

In this post, I'm going to go over a simple Rest CRUD Api using node, express and mongoose. Rest api's are great for integrating a backend into any application. Today, it is crucial to learning how to use and build api's for any developer.

We will create a movies api that will allow us to create, read, update and delete movies by making http requests to the api.

## Set up

1. Create a new directory. I will call mine `restApi` and then cd into the directory.
2. In the command line, type

   ```zsh
   npm init -y
   ```

   This will generate a `package.json` file.

   - In the `package.json` file add `"type": "module"` to the file. This will allows us to use import statements.
   - Create a new script by adding `"dev": "nodemon server.js",` in the script object.

Now let's add our dependencies.

3. In the command line run
   ```zsh
   npm install express mongoose
   ```
   Express helps us create web applications and services. Mongoose is an Object Data Modeling library that sits on top of mongodb. It manages lots of stuff for mongodb and makes it easier to work with 👍.
4. Now, we need to install dev dependencies. Enter

   ```zsh
   npm install --save-dev nodemon dotenv
   ```

   in the command line. Nodemon is like a watcher for our server that restarts the server whenever we make a change to it. Dotenv allows us to us a `.env` file to store our secure information.  
    Our `.env` file it should look like this:

   ```
    DATABASE_URL = mongodb://localhost/movies
    PORT = 3000
   ```

   Make sure `package.json` looks like this:

   ```js
     {
     "name": "productsApi",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "type": "module",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "dev": "nodemon server.js"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "dependencies": {
       "express": "^4.17.1",
       "mongoose": "^6.0.9"
     },
     "devDependencies": {
       "dotenv": "^10.0.0",
       "nodemon": "^2.0.13"
     }
   }
   ```

5. Now in the project root, create the file `server.js`. This the root file for our server. Copy the code below into `server.js`:

```js
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}...`)
)
```

- `app.get()` is handling any get requests at the base of our url and returning a response of `"Hello world"`
- `app.listen()` is where we tell our server to listen to the traffic at our url on the port defined in our `.env`.

Now that our setup is complete, you can run `npm run dev` in the command line to start the server.

```zsh
> nodemon server.js

 [nodemon] 2.0.13
 [nodemon] to restart at any time, enter `rs`
 [nodemon] watching path(s): _._
 [nodemon] watching extensions: js,mjs,json
 [nodemon] starting `node server.js`
 listening on port 3000...
```

## Connecting our db with mongoose

[Mongoose](https://mongoosejs.com/docs/guides.html) let's use a schema based approach to modeling our applicaiton data. It is easy to use and takes little code as well! We'll connect our db with `mongoose.connect()`.  
Modify `server.js`:

```js
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

import moviesRouter from "./routes/movies.route.js"

const app = express()

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection
db.on("error", error => console.error(`Error: ${error}`))
db.once("open", () => console.log(`DB connected!`))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.use("/movies", moviesRouter)

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}...`)
)
```

We use `mongoose.connect()` to make a connection with the database. We define the connection as `db` and we call two functions `on` and `once`. `on` runs whenever we get an error with our database. `once` runs when we first open our database and tell us that we have made a successful connection.

Now if your server is running (start the server if it's not already running: `npm run dev`), and you should see it reload and print out `"DB connected!"` 😁

## Implement Mongoose

### Create Schema

Everything in mongoose starts with a schema and each schema maps to a collection in mongodb and defines the document. We will create a schema and define our movie with the our fields: `title`, `year` and `rating`.

### Model

After we create the schema, we can convert the schema into a Model. A model instance is a document from a collection. Models are used to create and read documents from our mongodb database. They also come with a bunch of helper functions that we can use like `find()`, `findById()`, etc.

Create a new file `/models/Movies.js`:

```js
import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  rating: String,
})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie
```

Here we import mongoose so we can use `Schema` and `Model`. We define the schema for our movie. Then we create a model with the schema to use.

## Creating routes

We need to create a routes file that maps the http requests to crud functions that make the calls from the database.  
Create a new file `routes/movies.route.js`:

```js
import express from "express"
import Movie from "../models/Movie.js"

const router = express.Router()

// getMovie middleware
const getMovie = async (req, res, next) => {
  let movie
  try {
    movie = await Movie.findById(req.params.id)
    if (movie === null) {
      return res
        .status(404)
        .json({ message: `Cannot find movie with id: ${req.params.id}` })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.movie = movie
  next()
}

// list
router.get("/", async (req, res) => {
  try {
    const users = await Movie.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// get one
router.get("/:id", getMovie, (req, res) => {
  return res.json(res.movie)
})

// create
router.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  })
  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// update
router.put("/:id", getMovie, async (req, res) => {
  try {
    const updatedMovie = await res.movie.set(req.body)
    res.json(updatedMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// delete
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.deleteOne()
    res.json({ message: `Deleted movie: ${req.params.id}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
```

- `getMovie()` is a middleware that we will use to find the movie by id for the methods that need it.
- `express.Router()` [gives us http method routes like `GET`, `PUT`, `POST`, etc.](https://expressjs.com/en/4x/api.html#router)
- `router.get('/')` lists all of the movies
- `router.get('/:id')` gets a single movie by id
- `router.post('/')` creates a new movie
- `router.put('/:id')` updates a movie by id
- `router.delete('/:id')` deletes a movies by id

More info on [mongoose querys](https://mongoosejs.com/docs/queries.html) and [express routing](https://expressjs.com/en/guide/routing.html)

Now if you use a http test client you will be able to use the rest api.

In VSCode you can use [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), to check your api. Download and install Rest client, then create a `route.rest` file and put this code in:

```
POST http://localhost:3000/movies
Content-Type: application/json

{
  "title": "Fantastic Mr. Fox",
  "year": "2009",
  "rating": 7.9
}
```

This lets us create movies. Create a few more!
Then you can use

```
GET http://localhost:3000/movies
```

This will list all of the movies.
You can test out the endpoints as well.

## Summary

In this article, I covered how to create a rest api using node, express and mongoose. We set up our dependencies using npm and then create the our `server.js` file. We defined our `Schema` and turned it into a `Model` so that we could use it to interact with our db. Then we set up our CRUD routes and were able to test it using a http test client.

Refer to my code on [github](https://github.com/brad0s/productsAPI_example).
