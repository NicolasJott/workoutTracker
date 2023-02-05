const express = require("express")
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");
const connectDatabase = require('./database')
require("dotenv").config({ path: ".env" });


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

connectDatabase();

app.use(cors({
        origin:["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
const user = require('./Routes/userRoute');
app.use("/", user);