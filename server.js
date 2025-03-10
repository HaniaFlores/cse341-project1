const express = require('express');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3001;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});

app.listen(port, () => {console.log(`Runnnig on port ${port}`)});
