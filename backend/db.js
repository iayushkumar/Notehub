const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/notesonthecloud";

const connectToMongoose = () => {
   mongoose.connect(mongoURI).then
   {
    console.log("connected to moongoose");
   }
};

module.exports = connectToMongoose;

