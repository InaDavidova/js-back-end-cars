const express = require('express');
const hbs = require('express-handlebars');
const { about } = require('./controllers/about');
const { create } = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.get('/', home);
app.get('/create', create);
app.get('/about', about);
app.get('/details/:id', details);
app.all('*', notFound);

app.listen(3000, ()=>console.log('Server started at port 3000'));