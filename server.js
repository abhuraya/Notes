//variable to require express and other modules
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog')
const api = require('./routes/index.js');

const app = express();
//port set
const PORT = process.env.PORT || 3001;
//middleware
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//"/api set to const api"
app.use('/api', api);

app.use(express.static('public'));
//routing
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//console.log to inform port
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
