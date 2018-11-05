const massive = require('massive');
const connectionString = 'postgres://jpmgharyoxthkc:7ae4898491dcd164c984fc0ca276125885c5dd7cc00850436b3a5b583a3ea55e@ec2-54-83-27-162.compute-1.amazonaws.com:5432/d9pif6vhnstsmq?ssl=true';

let db;
let messageString;

massive(connectionString)
.then( dbInstance => {
    db = dbInstance;
    messageString = 'Connection to the database was successful.'
    // return db.init();
})
.catch ( err => {
    throw err
});

function getDb(){
    if(!db) {
        messageString = 'We have not connected to the database yet.';
        console.error(messageString);
        return messageString;
    }
    else {
        return db;
    }
}

module.exports = getDb;