const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const postsRoute = require('./routes/posts')
const usersRoute = require('./routes/users')

app.use(bodyParser.json())

//run anything as middleware for incoming requests
app.use("/posts", postsRoute)
app.use("/users", usersRoute)

module.exports = app

/*
what is use of app.use - app.use() used to Mounts the middleware function or mount to a specified path,the middleware function is executed when the base path matches.
app.use is a way to register middleware or chain of middlewares (or multiple middlewares) before executing any end route logic or intermediary route logic depending 
upon order of middleware registration sequence.

what is the middleware - Middleware literally means anything you put in the middle of one layer of the software and another. Express middleware are functions that execute during the lifecycle of a 
request to the Express server. Each middleware has access to the HTTP request and response for each route (or path) it’s attached to.

Middlewares are functions used in connecting a bunch of isolated systems to interact and perform certain tasks. For example, think of a switch as a component and bulb as another independent component 
where a wire acts as a middleware
 to connect these both and give us the required output (In this case, electricity to light the bulb).

 
*/