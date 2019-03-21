//dotenv dependancy:
require('dotenv').config()

//backend dependancies:
const express = require('express'),
      sessions = require('express-session'),
      massive = require('massive'),
      { json } = require('body-parser'),
      pg = require('pg'),
      pgSession = require('connect-pg-simple')(sessions),
      { MASSIVE_CONNECTION, SESSION_SECRET, SERVER_PORT } = process.env,
      pgPool = new pg.Pool({
        connectionString: MASSIVE_CONNECTION
    })

//controllers:
    const authCtrl = require('./AuthController'),
          ctrl = require('./Controller')
      
const app = express()

//middleware:
app.use(json())

//sessions:
app.use(sessions({
    store:new
    pgSession({
        pool: pgPool
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*60
    }
}))

//links to db:
massive(MASSIVE_CONNECTION)
.then(db => {
    app.set('db', db)

//Sever connection:
    app.listen(SERVER_PORT, () => console.log(`Live on port: ${SERVER_PORT}`))
})

app.use(express.static(__dirname + './../build'))

//EndPoints Auth:
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/current', authCtrl.current)

//EndPoints App:
app.put('/api/wizard', ctrl.updateWizard)
app.post('/api/indicators', ctrl.updateIndicators)
app.post('/api/entry', ctrl.postEntry)
app.get('/api/entries', ctrl.getEntries)
app.get('/api/indicators', ctrl.getIndicators)
app.get('/api/entry/:entryid', ctrl.getEntry)
app.get('/api/tags/:entryid', ctrl.getTags)
app.delete('/api/entry/:entryid', ctrl.deleteEntry)
app.put('/api/entry/:entryid', ctrl.updateEntry)