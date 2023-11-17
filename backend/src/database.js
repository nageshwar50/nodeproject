const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'nageshwar',
    password: 'DtnPkAlpxWTC9CkE:',
    database: 'NAGESHWAR',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// To get a connection from the pool:
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection from pool:', err);
        return;
    }
    // Use the connection for database operations
    connection.query('SELECT 1 + 1 AS solution', (error, results) => {
        // Handle the result
        console.log('Result:', results[0].solution);
        // Release the connection back to the pool
        connection.release();
    });
});
module.exports = {connection : pool}