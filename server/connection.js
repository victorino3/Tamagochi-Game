import mysql from 'mysql2'
const dbase = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'game',
    //this line is for MAMP only
   // socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
    });
dbase.connect();
export {dbase};

