# 1702-express-review

## Review questions

Dealing with queries and how to route them?

Dealing with multiple :params in the URI? How to make sure the right route?

What is static middleware???

## Express routing:
Express is basically a big nested queue
```js
try {
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
  app.use('*', function(4 arguments)
]
// if errors are caught, express helps handle
} catch(error) {
  res.status(500).send(error) // internal server error
}
```

## Netflix and Express:
Cool article on Netflix using express servers and running into erro
http://techblog.netflix.com/2014/11/nodejs-in-flames.html
