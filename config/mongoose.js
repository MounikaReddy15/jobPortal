const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/project_mridang');
mongoose.connect('mongodb://localhost:27017/tech_hire_db', {poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to Mongodb'));

// when connection is open
db.once('open', function() {
    console.log('Connected to db :: mongodb');

});

module.exports = db;

