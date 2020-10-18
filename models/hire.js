//to create a schema we require mongoose
const mongoose = require('mongoose');


const hireSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        
    },
     company: {
        type: String,
        required: true
    },
     core: {
        type: String,
        required: true,
     }, 
     soft: {
        type: String,
        required: true,
     }, 
     address: {
        type: String,
        required: true,
     }, 
     zip: {
        type: Number,
        required: true,
     }, 
     
        
     
});
    hireSchema.set('timestamps', true); 


    

// telling mongoose this is a model
const Hire = mongoose.model('Hire', hireSchema);


module.exports = Hire;