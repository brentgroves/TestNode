const mariadb = require("mariadb");

const MYSQL_HOSTNAME= 'localhost';
const MYSQL_PORT='3305';
const MYSQL_USERNAME= 'brent';
const MYSQL_PASSWORD= 'JesusLives1!';
const MYSQL_DATABASE= 'mach2';

const connectionString = {
  connectionLimit: 1,
  connectTimeout: 20000,
  acquireTimeout: 20000,
  multipleStatements: true,
  host: MYSQL_HOSTNAME,
  port: MYSQL_PORT,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
}

console.log(`user: ${MYSQL_USERNAME},password: ${MYSQL_PASSWORD}, database: ${MYSQL_DATABASE}, MYSQL_HOSTNAME: ${MYSQL_HOSTNAME}, MYSQL_PORT: ${MYSQL_PORT}`);
const pool = mariadb.createPool( connectionString);

function Test()
{
  console.log(`Start of test`);
  mariadb.createConnection({host: 'localhost', port: '3305', user: 'brent', password: 'JesusLives1!',database:'mach2'})
  .then(conn => {
    conn.query("select * from CNC", [2])
      .then(rows => {
        console.log(rows); // [{ "1": 1 }]
        conn.end();
       // IncrementBy();
      })
      .catch(err => { 
        console.log(err);
        //handle query error
      });
  })
  .catch(err => {
    console.log(err);
    //handle connection error
  });
}

//const pool = mariadb.createPool( connectionString);
// console.log(`connectionString=${JSON.stringify(connectionString)}`);
async function IncrementBy()
{
    console.log(`In IncrementBy()`);
    console.log(`connectionString=${JSON.stringify(connectionString)}`);
    let conn;
    let nCNCPartOperationKey = 1;
    let nSet_No = 1;
    let nBlock_No = 1;
    try {
    conn = await pool.getConnection();      
    const resultSets = await conn.query('call GetIncrementBy(?,?,?,@IncrementBy,@ReturnValue); select @IncrementBy as pIncrementBy,@ReturnValue as pReturnValue',[nCNCPartOperationKey,nSet_No,nBlock_No]);
    let incrementBy = resultSets[1][0].pIncrementBy;
    let returnValue = resultSets[1][0].pReturnValue;
    console.log(`GetIncrementBy.incrementBy=${incrementBy},returnValue=${returnValue}`);
    //Current_Value[nCNCPartOperationKey].IncrementBy = incrementBy;
    } catch (err) {
    // handle the error
    console.log(`Error =>${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

function main()
{
//  Test();
  IncrementBy();
}

main();