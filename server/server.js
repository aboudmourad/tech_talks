const express =require('./../node_modules/express');
const app = express();


const bodyParser = require('./../node_modules/body-parser');
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
    secret: 'Super duper secret',
    resave: false,
    saveUninitialized: false
  }))


require('./config/mongoose');
require('./config/routes.js')(app);

app.listen(8000,() => console.log('Server up and running on port 8000'));
