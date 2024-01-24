const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const path = require('path')
const MongoStore = require('connect-mongo')

// Load .env file
require('dotenv').config()

// Middleware
const { authenticate } = require('./routes/helpers/authentication')
const { mongoConnectionCheck } = require('./routes/helpers/errorHandling')

// Routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes.js')
const courseRoutes = require('./routes/courseRoutes')
const courseProgressRoutes = require('./routes/courseProgressRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const studyRecordRoutes = require('./routes/studyRecordRoutes')
const devToolRoutes = require('./routes/devToolRoutes')

//Environments
const PROD = process.env.ENV === 'PROD'
const apiPort = process.env.PORT || 8000

// Configure parsing
app.use(express.json({ limit: '32mb' }))
app.use(express.urlencoded({ limit: '32mb', extended: true }))

// Allow CORS if not prod
if (!PROD) {
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:8000']
    }))
}

// Configure session middleware
const COOKIE_LIFETIME_MILLIS = parseInt(process.env.COOKIE_LIFETIME_MILLIS) || 10 * 60 * 1000
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev secret',
    cookie: {
        expires: COOKIE_LIFETIME_MILLIS,
        httpOnly: true,
    },
    // Session saving options
    saveUninitialized: false,
    resave: false,
    // Store options
    store: PROD ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) : null
}));

// API routes
app.use('/api/', mongoConnectionCheck, authRoutes)
app.use('/api/', mongoConnectionCheck, userRoutes)   // some routes need to be unprotected, such as creating a user 
if (!PROD) app.use('/api/', mongoConnectionCheck, devToolRoutes)    // Unprotected
app.use('/api/', mongoConnectionCheck, courseRoutes)
app.use('/api/', mongoConnectionCheck, authenticate, courseProgressRoutes)
app.use('/api/', mongoConnectionCheck, authenticate, transactionRoutes)
app.use('/api/', mongoConnectionCheck, authenticate, studyRecordRoutes)

// Static routes of webpages
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get("*", (req, res) => {
    // Route error handling (such as 404s) is built in to the front-end, so serve the React app for any page requested
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})

//listen
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))