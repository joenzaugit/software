const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const hostname = 'localhost';
const port = 3001;

//const  mysql=require("mysql");
const  mysql=require("mysql2");
const db = mysql.createConnection({
  user: "root",
  host: hostname,
  password: "mysql123",
  database: "employeesystem",
});

app.get("/", (req, res) => {
  console.log("client request received");
  res.send('<h1 style="color:blue"> <center>server ready </center></h1>')
  });
/*
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("sucessful data:",result);
      //res.send(result);
    }
  });
*/
/*
  app.get("/employees", (req, res) => {
    res.send('<p>employees data ready</p>')
  });
*/

  app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


/*
const http = require('http');

const server = http.createServer((req, res) => {
  console.log("client request received");
  console.log("url:",req.url);
  console.log("method",req.method);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello from server');
  res.end();
});
*/

//let dbdata=[];

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
 
app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port,hostname,() => {
  console.log(`your server is running on port ${port}`);
});
