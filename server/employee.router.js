const express = require('express');
const getDb = require('./bootstrap.database');

const employeesRouter = express.Router();

employeesRouter.get('/get', (req, res) => {
    const db = getDb();
    db.get_employees( )
        .then( user => res.status(200).send(user))
        .catch( err => res.status(500).send(err))
});

employeesRouter.get('/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    db.get_single_employee([id])
        .then( user => res.status(200).send(user))
        .catch( err => res.status(500).send(err))
});

employeesRouter.post('/create', (req, res) => {
    const db = getDb();
    const { first_name, last_name, email, phone, salary } = req.body;
    db.create_employee([first_name, last_name, email, phone, salary])
        .then( () => res.status(200).send())
        .catch( err => res.send(err))
});

employeesRouter.put('/update/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const { first_name, last_name, email, phone, salary } = req.body;
    db.update_user([id, first_name, last_name, email, phone, salary])
        .then( promise => res.status(200).send(promise))
        .catch( err => res.send(err) )
});

employeesRouter.delete('/delete/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    db.delete_user([id])
        .then( () => res.status(200).send() )
        .catch( err => res.send(err) )
});

module.exports = employeesRouter;