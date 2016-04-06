var gulp = require('gulp');
var express = require('express');
var bodyParser = require('body-parser');
var orderRouter = require('../mocks/order').router;
const PORT = 3002;

gulp.task('serve-mocks', () => {

    var app = express();
    app.use(bodyParser.json());
    app.use((request, response, next) => {
        console.log('Time: ', Date.now());
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use('/order', orderRouter);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
