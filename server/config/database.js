const mongoose = require('mongoose');


const connectDatabase = async () => {
   try {
       await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       });
       console.log("DB Connection Successful")
   } catch (err) {
       console.error(err.message)

       process.exit(1)
   }
}

module.exports = connectDatabase;