const express = require("express")
const connectDatabase = require('./config/database')
require("dotenv").config()

const app = express();

//Database
connectDatabase();

// Init middleware
app.use(express.json({ strict: false }))

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/workout', require('./routes/api/workout'));

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));