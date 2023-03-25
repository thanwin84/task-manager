const express = require('express');
const tasksRoute = require(__dirname + '/routes/tasks')
const connect = require(__dirname + '/db/connect')
const notFound = require('./middleware/not_found')
const errorHandler = require('./middleware/error_handler')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

//----set up express app----------
const app = express()


app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
  }))
app.use(methodOverride('_method'))

// ----------- set up session -----------
const sessionStore = MongoStore.create({
     mongoUrl: process.env.MONGO_URL,
     collectionName: "sessions"
});

app.use(session({
    secret: process.env.SECRETS,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


//-----------set up routes--------------
app.use('/api/v1/tasks', tasksRoute);

app.use(notFound)




const port = process.env.PORT || 3000;
const start = async()=>{
    try {
        await connect(process.env.MONGO_URL);
        console.log('connected successfully to dabase')
        app.listen(port, ()=> console.log(`server is runnin on port ${port}`) )
    } catch (error) {
        console.log(error)
    }
}
app.use(errorHandler)
start()
// api/v1/tasks  ->get all tasks - get
// api/v1/tasks -> create an task - post
// api/v1/tasks/:id -> get single task - get
// api/v2/tasks/:id -> update task - patch
// api/v2/tasks/:id ->delete a task - delete