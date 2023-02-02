const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes")
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: ".env" });

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => {
        console.log("DB Connection Successful")
    })
    .catch((err) => {
        console.log(err.message);
    })

app.use(cors({
        origin:["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);