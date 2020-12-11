const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = '0.0.0.0';

const logger = morgan('tiny');


const db = [];

app.use(logger);
// Disabling for local development
// app.use(helmet());

// Parse any form data from POST requests
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`<h1>Hello!</h1><br><a href="/new">Go to the form</a>`)
});

app.get('/new', (req, res) => {
    res.send(`
<h1>Say something!</h1>
<form method="POST">
  <label>
   Street
   </label>
    <input name="street" type="text" autofocus />
  <br>
  <label>
  City
   </label>
  <input name="city" type="text" />
  <br />
  <input type="submit" value="do it!" />
</form>
    `);
});

//Recieve the POST request that con
app.post('/new', (req, res) => {
    console.log(req.body);
    //req.body contains the data sent in the form
    const {street, city} = req.body // destructuring
    // const street = req.body.street;
    // const city = req.body.city;
    //const thought = req.body.thought
    db.push({street,city}); // saving it to the "database"
    res.redirect('/list'); //redirect!
    //We tell the browser to send us another GET request
    //for '/list'
});

app.get('/list', (req, res) => {
    res.send(`
<a href="/new">Go to the form</a>
<ul>
  ${
    db.map(o => `<li>${o.street} ${o.city}</li>`).join('')
  }
</ul>
    `);
});

server.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});
