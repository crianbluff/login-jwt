const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routesUsers = require('./routes/Users');
const CONFIG = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

// Rutas
app.use('/api/auth', routesUsers);

// Server
app.listen(CONFIG.PORT, function() {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});