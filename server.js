const express = require('express')
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const cookieParser = require('cookie-parser')
// const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const app = express()

const connectDB = require('./config/db')
require('dotenv').config();

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// database connection call
connectDB()


const port = process.env.PORT || 3000

// routes
// app.get('*', checkUser)
// app.get('/', requireAuth, (req, res) => res.render('home') );
// app.get('/char', requireAuth, (req, res) => res.render('products'))

app.use( authRoutes);

// app.use('/api/users/',  require('./routes/authRoutes'))


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})