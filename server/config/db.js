const mongoose = require("mongoose");

const connectDB = async () => {
  // Connecting to database
  mongoose.connect(
    "mongodb://localhost:27017/",
    {
      dbName: "security",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log("Connected to yourDB-name database")
  );
};

module.exports = connectDB;
