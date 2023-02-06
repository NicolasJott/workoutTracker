const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://njott:nicobox1980@cluster0.y2jwbrt.mongodb.net/?retryWrites=true&w=majority"
        , { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDatabase;