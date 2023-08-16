const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://mailsanjogregmi:f0SvkIdBCjQkSr0l@cluster0.qshwrqi.mongodb.net/?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
 });

const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function () {
    console.log('Connected to database');
}
);

module.exports = dbConnection;
