import axios from 'axios';
import { basename } from 'path';

const baseURL = '/api/employees';

function findEmployees() {
    return axios
        .get(`${baseURL}/get`)
        .then( res => res )
        .catch( err => {throw err});
}

function findSingleEmployee(id) {
    return axios
        .get(`${baseURL}/${id}`)
        .then( res => res)
        .catch( err => {throw err} );
}

function createEmployee(body) {
    return axios
        .post(`${baseURL}/create`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function updateEmployee( id, body ) {
    return axios
        .put(`${baseURL}/update/${id}`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function deleteEmployee(id) {
    return axios
    .delete(`${baseURL}/delete/${id}`)
    .then( res => res )
    .catch( err => {throw err});
}

export {
    findEmployees,
    findSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};