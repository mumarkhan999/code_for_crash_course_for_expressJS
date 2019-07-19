const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');
const exphbs = require('express-handlebars');
const app = express();



// initialize middleware
app.use(logger);

// Handlebars Middleware (syntax given in express handlebars github documentation)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Boady Parser Middleware (Available in new version of express)
app.use(express.json());
// To handle url encoded data
app.use(express.urlencoded({ extended: false }));

// Hompage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members // this is same as members: members
}));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// Listening on Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>  console.log(`Server started on port ${PORT}`));
