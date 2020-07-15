const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MysqlStore = require('express-mysql-session');

const { database } = require('./keys');
//inicializamos express
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouds'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'appGo',
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore(database)
}));
    //Flash es un modulo que sirve para enviar mensajes en todas las ventanas
    //flash requiere una session
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//global variables

app.use((req, res, next) => {
    next();
    app.locals.success = req.flash('success');
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links' ,require('./routes/links'));

//Public files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})