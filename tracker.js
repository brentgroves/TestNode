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

async function UpdateCNCPartOperationAssemblyCurrentValue(CNC_Part_Operation_Key,Set_No,Block_No,Current_Value,Last_Update) {
  let conn;
  try {
    conn = await pool.getConnection();      
    console.log(`In UpdateCNCPartOperationAssemblyCurrentValue with params CNC_Part_Operation_Key=${CNC_Part_Operation_Key},Set_No=${Set_No},Block_No=${Block_No},Current_Value=${Current_Value},Last_Update=${Last_Update}`)
    // const someRows = await conn.query('call UpdateCNCPartOperationAssemblyCurrentValue(1,1,1,6,"2020-08-25 10:17:55",@ReturnValue); select @ReturnValue as pReturnValue');
    const someRows = await conn.query('call UpdateCNCPartOperationAssemblyCurrentValue(?,?,?,?,?,@ReturnValue); select @ReturnValue as pReturnValue',[CNC_Part_Operation_Key,Set_No,Block_No,Current_Value,Last_Update]);
    let returnValue = someRows[1][0].pReturnValue
    console.log(`UpdateCNCPartOperationAssemblyCurrentValue.returnValue=${returnValue}`);
  } catch (err) {
    // handle the error
    console.log(`Error =>${err}`);
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

async function Test2(CNC_Part_Operation_Key,Set_No,Block_No,Current_Value,Last_Update) {
  let conn;
  try {
    conn = await pool.getConnection();      
    console.log(`In Test with params CNC_Part_Operation_Key=${CNC_Part_Operation_Key},Set_No=${Set_No},Block_No=${Block_No},Current_Value=${Current_Value},Last_Update=${Last_Update}`)
    const someRows = await conn.query('call Test(1,1,1,7,"2020-04-25 10:17:55",@ReturnValue); select @ReturnValue as pReturnValue');
//    const someRows = await conn.query('call UpdateCNCPartOperationAssemblyCurrentValue(?,?,?,?,?,@ReturnValue); select @ReturnValue as pReturnValue',[CNC_Part_Operation_Key,Set_No,Block_No,Current_Value,Last_Update]);
    let returnValue = someRows[1][0].pReturnValue
    console.log(`Test.returnValue=${returnValue}`);
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
//  IncrementBy();
// -- "CNC_Part_Operation_Key":1,"Set_No":1,"Block_No":7,"Current_Value":29392,"Trans_Date":"2020-08-25 10:17:55"
//  Test2(1,1,1,3,"2020-08-26 10:17:55");

  UpdateCNCPartOperationAssemblyCurrentValue(1,1,2,9,"2020-06-26 10:17:55");
}

main();