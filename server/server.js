const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const cors = require('cors')


// connect mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "example",
  database: "myDB",
  port: '3306'
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});



app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/createUser', async (req, res) => {
  let f_name = req.body.f_name
  let l_name = req.body.l_name
  let age = req.body.age


  //Insert a record in the "customers" table:
  var sql = `INSERT INTO member (f_name, l_name, age) VALUES 
          (
            '${f_name}', 
            '${l_name}', 
            '${age}'
          )`;



  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
  // res.send({ 'message': 'record inserted'});


  let ref_id = await savetodb(sql);
  res.send({ 'message': 'record inserted', 'ref_id': ref_id.insertId })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



async function savetodb(sql) {
  return new Promise((resolve, reject) => {
    try {

      con.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    }
    catch (ex) {
      reject(ex);
    }
  });
}