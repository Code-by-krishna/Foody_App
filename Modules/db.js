const mongoose = require('mongoose');

const uri = 'mongodb+srv://ak8607861632:ak8607861632@cluster0.wvvslyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri)
.then(res => console.log("Database connect successfully"))
.catch(err => console.log(err));