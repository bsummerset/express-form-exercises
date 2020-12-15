const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const Sequelize = require('sequelize');
const {Pets} = require('./models');

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = '0.0.0.0';

const logger = morgan('tiny');


const db = [];

app.use(logger);

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`<h1>Hello!</h1><br><a href="/new">Go to the form</a>`)
});

app.get('/new', (req, res) => {
    res.send(`
<h1>Little Wins</h1>
<form method="POST">
    <label>
      Name:
      <input name="title" type="text" autofocus />
    </label>
    <br>
    <label>
      Type of Win:
      <select name="category">
        <option value="dev">Software/Development</option>
        <option value="family">Family Christmas Dinner</option>
        <option value="life">Stay fit and Healthy</option>
      </select>
    </label>
    <br>
    <input type="submit" value="submit" />
</form>
    `);
});

app.post('/new', async (req,res) => {
    const {title, category} = req.body;
    const 
})
