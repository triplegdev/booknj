const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';
const { ValidationError } = require('sequelize');

const app = express();

//logging for development helping with debugging
app.use(morgan('dev'));
//parses cookies accessed via req.cookies
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

//allows resources to be fetched cross-origin but restricts access to same-origin
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
//csurf creates a token to be applied to every request
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));

const routes = require('./routes');
app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: err.message};
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (const error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});




module.exports = app;
