const express = require('express');
const bodyParser = require('body-parser');
const port = 5050;
const employeesRouter = require('./employee.router');

const app = express();

app.use(bodyParser.json());

app.use('/api/employees', employeesRouter);

app.listen(port, () =>
    console.log(`===================================\n Server is listening on port ${port}.\n===================================`
));