const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./routes');

dotenv.config();
const app = express();

const PORT = process.env.PORT_APP || 5001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/', router);


app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
});