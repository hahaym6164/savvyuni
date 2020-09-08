const mongoose = require("mongoose")

const joSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('job',joSchema)