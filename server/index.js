const express = require('express');
const bodyParser = require('body-parser');
const port = 5050;
const employeesRouter = require('./employee.router');

const app = express();

app.use( express.static(`${__dirname}/../build`));

app.use(bodyParser.json());

app.use('/api/employees', employeesRouter);

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../build')});
});

app.listen(port, () =>
    console.log(`===================================\n Server is listening on port ${port}.\n===================================`
));