# 1702-express-review
Quick review session for 1702 FSA/GH students in advance of express self-checkpoint

## Videos
Playlist for the video review of this repo being built can be found here:
https://www.youtube.com/playlist?list=PLkkKgQIx1wZYNoeJXVMAiUJn7BlYYKQwI

**NB: This was a live review, there may be some small inaccuracies in how things are described but I tried to repeat most of the questions for viewers**

## Starting up
To start up this repo:
`npm install` to install node modules
`npm start` runs nodemon on the app.js file

## Routes to try:
The server will start listening on `localhost:3000` by default
Fire up an easy http client like <a href="https://www.getpostman.com/">Postman</a> and try some routes like:
`GET: /puppies`
`POST: /puppies`
`GET: /puppies/:id`
Check out the routes for more options!

## Review questions

Dealing with queries and how to route them?

Dealing with multiple :params in the URI? How to make sure the right route?

What is static middleware???

## Express routing:
Express is basically a big nested queue. Express goes through middleware and attempts to match the request path to middleware. If it matches an `app.use` sub-router on the way, it enters that sub-router and attemps to match against its
```js
try {
// JS array notation is just shown here as a demo of the queue structure - express iterates through this and tries to match
[
  //matches this route
  app.use,
  //matches this route
  app.use,
  //if the path matches this /path, ener the router within which is another queue
  app.use('/path' [app.get, app.post]),
  // if the path matches this /path, enter
  app.use('/path2'),
  // match all paths and handle errors callback with 4 arguments
  app.use('*', function(4 arguments),
  // defaults to sending a 404 if no routes match
  app.use('*', function(req, res, next){ res.sendStatus(404)})
]
// if errors are caught, express helps handle
} catch(error) {
  res.status(500).send(error) // internal server error
}
```

## Netflix and Express:
Cool article on Netflix using express servers and running into erro
http://techblog.netflix.com/2014/11/nodejs-in-flames.html

## Sequelize


Questions:
Remind us which aspects are coming from Sequelize vs Express - where's the logic living?
Where do I look in the docs - express or sequelize?

General answer: anything dealing with `req` or `res` is in express docs. Anything in a Sequelize promise chain that's not touching either `req` or `res` - look to the <a href="http://docs.sequelizejs.com/en/v3/">Sequelize Docs</a>


Sequelize methods - ???

### Important Methods:

* `Model.findAll()` finds all instances
* `Model.findAll({where: {.......}}) finds all instances that match the where condition
* `Model.findOne({where: {....}}) finds first match for the where condition
* `Model.findById(id)` finds by an id number. Sequelize will coerce strings into ints, so you can simply use the `req.params.id` and not worry about casting to a `Number` before sending to Sequelize
* Model.findOrCreate({where: {.....}}) will find an entry OR create it if necessary. returns `Instance` as first argument, and `created` boolean as the second. Good for making sure you don't make a bunch of duplicates
* if the above queries return nothing, return value will be `null`

### Association Methods:

* For `belongsTo` 1:1 relationships
* `Puppy.belongsTo(Park)` will put a foreign key `parkId` in the `Puppy` relation
* with aliases: `Puppy.belongsTo(Park, {as: 'favPark'})` will put the `favParkId` on the `Puppy` relation
* continuing: it will also give a `.setFavPark(<Park instance or id>)` and `.getFavPark(<Park instance or id>)` on the `Puppy` instance

There are many more - hit up the Sequelize docs for more info
