const express = require("express")
const connectDatabase = require('./config/database')
require("dotenv").config()
const path = require('path');


const app = express();

//Database
connectDatabase();

// Init middleware
app.use(express.json({ strict: false }))

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/workout', require('./routes/api/workout'));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){
    console.log("catch all route triggered")
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );

})


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));